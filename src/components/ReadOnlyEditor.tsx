'use client';

import { Editor } from '@tinymce/tinymce-react';

import { withBasePath } from '@/lib/base-path-manager';

interface ReadOnlyEditorProps {
  value: string;
  className?: string;
}

export default function ReadOnlyEditor({ value, className }: ReadOnlyEditorProps) {
  return (
    <div id='postbox' className={`${className ?? ''}`}>
      <Editor
        licenseKey="gpl"
        tinymceScriptSrc={withBasePath('/tinymce/tinymce.min.js')}
        value={value ?? ''}
        disabled
        readonly
        init={{
          menubar: false,
          toolbar: false,
          branding: false,
          statusbar: false,
          plugins: ['autoresize'],
          autoresize_bottom_margin: 0,
          content_css: withBasePath(
            '/tinymce/skins/content/default/content.min.css'
          ),
        }}
      />
    </div>
  );
}
