'use client';

import { useCallback } from 'react';
import { useState, useRef, useEffect } from 'react';

interface TextLayer {
  id: number;
  text: string;
  x: number;
  y: number;
}

export default function DraggableLayerBox() {
  const [image, setImage] = useState<File | null>(null);
  const [layers, setLayers] = useState<TextLayer[]>([]);

  return (
    <div className="mx-auto mt-10 max-w-md rounded border p-4 shadow">
      <h1 className="mb-4 text-xl font-bold">
        Drag Text Directly from Layer Box
      </h1>

      <div className="mb-4 flex flex-col gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="rounded border p-2"
        />
        {layers.map((layer) => (
          <input
            key={layer.id}
            type="text"
            value={layer.text}
            onChange={(e) => updateLayerText(layer.id, e.target.value)}
            className="rounded border p-2"
          />
        ))}
        <button
          type="button"
          onClick={addLayer}
          className="rounded bg-green-500 p-2 text-white hover:bg-green-600"
        >
          Add Text Layer
        </button>
      </div>
      <div className="h-4 w-25 bg-black"></div>
      <div className="h-4 w-50 bg-black"></div>
      <div className="h-4 w-100 bg-black"></div>

      {image && (
        <canvas
          ref={canvasRef}
          //   onMouseOver={handleMouseOver}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{
            cursor: 'move',
            display: 'block',
            maxWidth: '100%',
            border: '1px solid #ccc',
          }}
        />
      )}
    </div>
  );
}
