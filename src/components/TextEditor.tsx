'use client';

import { useCallback, useEffect, useRef } from 'react';

import { Editor } from '@tinymce/tinymce-react';

import { withBasePath } from '@/lib/base-path-manager';
import { uploadFile } from '@/lib/upload-file';

type TinyMceBlobInfo = {
  blob: () => Blob;
  filename: () => string;
};

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

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

const TextEditor = ({
  value,
  onChange,
  placeholder,
  className,
  debounceMs = 0,
}: TextEditorProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  const timerRef = useRef<number | null>(null);

  const handleContentChange = useCallback(
    (content: string) => {
      const applyTransform = () => {
        const linkified = autoLinkify(content);
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

  // Keep placeholder updated if it changes.
  useEffect(() => {
    const ed = editorRef.current;
    if (!ed) return;
    try {
      ed.settings.placeholder = placeholder ?? '';
    } catch {
      // ignore
    }
  }, [placeholder]);

  return (
    <div className={className ?? 'editorContainer'}>
      <Editor
        licenseKey="gpl"
        tinymceScriptSrc={withBasePath('/tinymce/tinymce.min.js')}
        value={value ?? ''}
        onInit={(_evt, editor) => {
          editorRef.current = editor;
        }}
        onEditorChange={(content) => {
          handleContentChange(content);
        }}
        init={{
          menubar: false,
          branding: false,
          statusbar: false,
          placeholder: placeholder ?? '',

          plugins: ['autolink', 'link', 'lists', 'image', 'media', 'code'],

          toolbar:
            'undo redo | blocks | bold italic underline strikethrough blockquote | bullist numlist | alignleft aligncenter alignright | link image media | removeformat | code',

          automatic_uploads: true,
          images_reuse_filename: true,

          images_upload_handler: async (blobInfo: TinyMceBlobInfo) => {
            const blob = blobInfo.blob();
            const file = new File([blob], blobInfo.filename(), {
              type: blob.type,
            });
            return uploadImage(file);
          },

          file_picker_types: 'image',
          file_picker_callback: (
            cb: (url: string, meta?: Record<string, unknown>) => void,
            _value: string,
            meta: Record<string, unknown>
          ) => {
            const filetype = (meta as { filetype?: string }).filetype;
            if (filetype !== 'image') return;

            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.click();

            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) return;
              const url = await uploadImage(file);
              cb(url, { title: file.name });
            };
          },
        }}
      />
    </div>
  );
};

export default TextEditor;
