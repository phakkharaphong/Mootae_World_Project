'use client';

import { useCallback, useEffect, useRef } from 'react';

import dynamic from 'next/dynamic';

import { uploadFile } from '@/lib/upload-file';

import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

// Upload image and return a URL Quill can embed.
const uploadImage = async (file: File): Promise<string> => {
  try {
    const res = await uploadFile(file);
    if (!res?.url) throw new Error('Invalid upload response');
    return res.url;
  } catch (err) {
    console.error('Image upload error:', err);
    throw err;
  }
};

// Build Quill toolbar config with an image handler that uploads and inserts.
const createToolbarModules = (uploadFn: (file: File) => Promise<string>) => ({
  toolbar: {
    container: [
      [{ size: [] }, { font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    handlers: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      image: function (this: any) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.click();

        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) return;
          const range = this?.quill?.getSelection?.();
          const imageUrl = await uploadFn(file);
          if (imageUrl && range) {
            this.quill.insertEmbed(range.index, 'image', imageUrl);
          }
        };
      },
    },
  },
});

const modules = createToolbarModules(uploadImage);

const formats = [
  'size',
  'font',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'align',
  'link',
  'image',
  'video',
];

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

// Wrap Quill video iframes with alignment divs for layout control.
const wrapVideoIframes = (html: string) => {
  let result = html.replace(
    /<iframe class="ql-video ql-align-center"/g,
    '<div class="center"><iframe class="ql-video ql-align-center" '
  );
  result = result.replace(
    /<iframe class="ql-video ql-align-right"/g,
    '<div class="end"><iframe class="ql-video ql-align-right" '
  );
  result = result.replace(/<\/iframe>/g, '<\/iframe><\/div>');
  return result;
};

// Linkify plain URLs in HTML while avoiding links already inside <a> tags.
const autoLinkify = (html: string): string => {
  const URL_REGEX = /\b((?:https?:\/\/|www\.)[^\s<]+)/gi;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const walker = document.createTreeWalker(
    doc.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.parentElement && node.parentElement.tagName !== 'A') {
      textNodes.push(node as Text);
    }
  }

  textNodes.forEach((textNode) => {
    const text = textNode.textContent ?? '';
    if (!URL_REGEX.test(text)) return;

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    URL_REGEX.lastIndex = 0; // reset for each node
    let match: RegExpExecArray | null;
    while ((match = URL_REGEX.exec(text)) !== null) {
      const [raw] = match;
      const start = match.index;

      if (start > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex, start))
        );
      }

      const href = raw.startsWith('http') ? raw : `https://${raw}`;
      const a = document.createElement('a');
      a.href = href;
      a.textContent = raw;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      fragment.appendChild(a);

      lastIndex = start + raw.length;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    textNode.parentNode?.replaceChild(fragment, textNode);
  });

  return doc.body.innerHTML;
};

const TextEditor = ({
  value,
  onChange,
  placeholder,
  className,
  debounceMs = 0,
}: TextEditorProps) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const timerRef = useRef<number | null>(null);

  const handleContentChange = useCallback(
    (content: string) => {
      const applyTransform = () => {
        const withVideoWrapped = wrapVideoIframes(content);
        const linkified = autoLinkify(withVideoWrapped);
        onChange(linkified);
      };

      if (!debounceMs) {
        applyTransform();
        return;
      }

      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(applyTransform, debounceMs);
    },
    [onChange, debounceMs]
  );

  // Paste-to-upload images.
  useEffect(() => {
    const editor = quillRef.current?.getEditor?.();
    if (!editor) return;
    const root: HTMLElement | undefined = editor.root;
    if (!root) return;

    const onPaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.kind !== 'file') continue;

        const file = item.getAsFile();
        if (!file || !file.type.startsWith('image/')) continue;

        e.preventDefault();
        const url = await uploadImage(file);
        const range = editor.getSelection(true);
        const index = range ? range.index : editor.getLength();
        editor.insertEmbed(index, 'image', url, 'user');
        editor.setSelection(index + 1, 0, 'user');
        break;
      }
    };

    root.addEventListener('paste', onPaste as unknown as EventListener);
    return () => {
      root.removeEventListener('paste', onPaste as unknown as EventListener);
    };
  }, [quillRef]);

  return (
    <div className={className ?? 'editorContainer'}>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextEditor;
