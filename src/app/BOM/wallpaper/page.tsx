'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { NavigationMenu } from '@/components/Navmenu';
import { Images } from 'lucide-react';

export default function DraggableLayerBox() {
  const [image, setImage] = useState<File[]>([]);
  const [imageURL, setImageURL] = useState<string[]>([]);
  const [textColor, setTextColor] = useState('#ffffff');
  const [text, setText] = useState('');
  const [x, setX] = useState<number>(50);
  const [y, setY] = useState<number>(50);
  const [fontSize, setFontSize] = useState(40);
  const [isBold, setIsBold] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [widthImg, setWidthImg] = useState(600);
  const [heightImg, setHeight] = useState(600);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (image.length === 0) return;
    const urls = image.map((file) => URL.createObjectURL(file));
    setImageURL(urls);

    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [image]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImage(files);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);

    // หาตำแหน่ง offset ระหว่างจุดคลิกกับตำแหน่งของข้อความ
    setOffset({
      x: e.clientX - x,
      y: e.clientY - y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    // อัปเดตตำแหน่งตามเมาส์
    setX(e.clientX - offset.x);
    setY(e.clientY - offset.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDownload = async () => {
    if (!imageURL[0]) return toast.error('Image not found');

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = imageURL[0];

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = textColor;
      ctx.textBaseline = 'top';
      ctx.shadowColor = 'rgba(0,0,0,0.7)';
      ctx.shadowBlur = 4;
      ctx.fillText(text, x, y);

      const link = document.createElement('a');
      link.download = 'image-with-text.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-64 bg-gray-900 text-white">
          <NavigationMenu />
        </div>
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border bg-white p-6 shadow-xl">
          <h1 className="mb-6 text-center text-2xl font-bold">
            <Images /> สร้างรูปพร้อมข้อความ
          </h1>

          <div className="space-y-4">
            <div>
              <Label className="font-semibold">อัพโหลดรูปภาพ</Label>
              <Input type="file" onChange={handleFileChange} />
            </div>

            <div>
              <Label className="font-semibold">ข้อความ</Label>
              <Input
                id="text"
                type="text"
                placeholder="ใส่ข้อความลงรูป..."
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-semibold">ตำแหน่ง X</Label>
                <Input
                  type="number"
                  value={x}
                  onChange={(e) => setX(parseFloat(e.target.value))}
                />
              </div>

              <div>
                <Label className="font-semibold">ตำแหน่ง Y</Label>
                <Input
                  type="number"
                  value={y}
                  onChange={(e) => setY(parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label className="font-semibold">สีข้อความ</Label>
              <Input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="h-12 w-20 cursor-pointer"
              />
            </div>
            {/* style controls */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <Label className="font-semibold">ขนาดตัวอักษร</Label>
                <Input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                />
              </div>

              <div>
                <Label className="font-semibold">ตัวหนา</Label>
                <Button
                  variant={isBold ? 'default' : 'secondary'}
                  className="w-full"
                  onClick={() => setIsBold(!isBold)}
                >
                  {isBold ? 'เปิดอยู่' : 'ปิด'}
                </Button>
              </div>

              <div className="mt-4">
                <Label className="font-semibold">ฟอนต์</Label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="mt-1 w-full rounded border px-2 py-1"
                >
                  <option value="Arial">Arial</option>
                  <option value="Kanit">Kanit</option>
                  <option value="Mitr">Mitr</option>
                  <option value="Prompt">Prompt</option>
                  <option value="Tahoma">Tahoma</option>
                </select>
              </div>
            </div>

            <Button
              className="mt-4 w-full rounded-lg bg-green-600 p-3 text-lg text-white hover:bg-green-700"
              onClick={handleDownload}
            >
              📥 ดาวน์โหลดรูปพร้อมข้อความ
            </Button>
          </div>

          <canvas ref={canvasRef} className="hidden" />

          {imageURL.length > 0 && (
            <div className="mt-8">
              <p className="mb-2 font-semibold text-gray-700">
                🔍 ตัวอย่างก่อนดาวน์โหลด
              </p>

              {imageURL.map((url, index) => (
                <div
                  key={index}
                  ref={previewRef}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className="relative mt-2 overflow-hidden rounded-xl border shadow-lg select-none"
                >
                  <Image
                    src={url}
                    alt="preview"
                    width={600}
                    height={400}
                    className="w-full"
                  />

                  <div
                    onMouseDown={handleMouseDown}
                    className="absolute cursor-move text-2xl font-bold"
                    style={{
                      top: y,
                      left: x,
                      color: textColor,
                      textShadow: '0px 0px 6px rgba(0,0,0,0.85)',
                      fontSize: fontSize,
                      fontFamily: fontFamily,
                    }}
                  >
                    {text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
