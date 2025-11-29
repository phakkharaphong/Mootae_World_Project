"use client";

import React, { useCallback, useEffect, useRef } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import api from '@/utils/axios-instance';

const uploadImage = async (file: File): Promise<string> => {
  const fd = new FormData();
  fd.append('file', file);
  try {
    const res = await api.post('/Attachments/UploadFile', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const id: string | undefined =
      res?.data?.data?.id ?? res?.data?.data?.fullPath?.split('/')?.pop();
    if (!id) throw new Error('Invalid upload response');
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/Attachments/DownloadFile/${id}`;
  } catch (err) {
    console.error('Image upload error:', err);
    throw err;
  }
};

const modules = {
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
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
          const file = input.files?.[0];
          if (file) {
            const range = this?.quill?.getSelection?.();
            const imageUrl = await uploadImage(file);
            if (imageUrl && range) {
              this.quill.insertEmbed(range.index, 'image', imageUrl);
            }
          }
        };
      },
    },
  },
};

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

const convertClassToClassName = (html: string) => {
  html = html.replace(
    /<iframe class="ql-video ql-align-center"/g,
    '<div class="center"><iframe class="ql-video ql-align-center" ',
  );
  html = html.replace(
    /<iframe class="ql-video ql-align-right"/g,
    '<div class="end"><iframe class="ql-video ql-align-right" ',
  );
  html = html.replace(/<\/iframe>/g, '</iframe></div>');
  return html;
};

// ✅ ใช้ DOMParser เพื่อป้องกันการซ้อนแท็กซ้ำ
const autoLinkify = (html: string): string => {
  const urlRegex = /\b((?:https?:\/\/|www\.)[^\s<]+)/gi;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const walker = document.createTreeWalker(
    doc.body,
    NodeFilter.SHOW_TEXT,
    null,
  );

  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    // ✅ ข้าม text node ที่อยู่ภายใน <a>
    if (node.parentElement && node.parentElement.tagName !== 'A') {
      textNodes.push(node as Text);
    }
  }

  textNodes.forEach((textNode) => {
    const text = textNode.textContent ?? '';
    if (urlRegex.test(text)) {
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;

      text.replace(urlRegex, (match, _url, _offset, str, offset) => {
        // เพิ่มข้อความก่อนหน้า URL
        if (offset > lastIndex) {
          fragment.appendChild(
            document.createTextNode(str.slice(lastIndex, offset)),
          );
        }

        const href = match.startsWith('http') ? match : `https://${match}`;
        const a = document.createElement('a');
        a.href = href;
        a.textContent = match;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        fragment.appendChild(a);

        lastIndex = offset + match.length;
        return match;
      });

      // เพิ่มข้อความหลังสุดท้าย
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
      }

      textNode.parentNode?.replaceChild(fragment, textNode);
    }
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillRef = useRef<any>(null);
  const timerRef = useRef<number | null>(null);

  const handleBeforeChange = useCallback(
    (content: string) => {
      const apply = () => {
        let transformed = convertClassToClassName(content);
        transformed = autoLinkify(transformed);
        onChange(transformed);
      };
      if (!debounceMs) return apply();
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(apply, debounceMs);
    },
    [onChange, debounceMs],
  );

  // Paste-to-upload images
  useEffect(() => {
    const editor = quillRef.current?.getEditor?.();
    if (!editor) return;
    const root: HTMLElement | undefined = editor.root;
    if (!root) return;
    const onPaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file && file.type.startsWith('image/')) {
            e.preventDefault();
            const url = await uploadImage(file);
            const range = editor.getSelection(true);
            const index = range ? range.index : editor.getLength();
            editor.insertEmbed(index, 'image', url, 'user');
            editor.setSelection(index + 1, 0, 'user');
            break;
          }
        }
      }
    };
    root.addEventListener('paste', onPaste as unknown as EventListener);
    return () =>
      root.removeEventListener('paste', onPaste as unknown as EventListener);
  }, [quillRef]);

  return (
    <div className={className ?? 'editorContainer'}>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={handleBeforeChange}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextEditor;
