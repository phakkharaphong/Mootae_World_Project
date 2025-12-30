'use client';

import { QRCodeCanvas } from 'qrcode.react';

export default function PromptPayQRCode({ payload }: { payload: string }) {
  return (
    <div className="flex items-center justify-center p-2">
      <QRCodeCanvas value={payload} />
    </div>
  );
}
