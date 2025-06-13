'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function CustomRangeSlider({ min, max }: { min: number; max: number }) {
  const [value, setValue] = useState(min);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;

    // Clamp between 0 and track width
    offsetX = Math.max(0, Math.min(offsetX, rect.width));

    // Convert position to value
    const percent = offsetX / rect.width;
    const newValue = Math.round(min + percent * (max - min));
    setValue(newValue);
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleDrag);
    }, { once: true });
  };

  const getThumbPosition = () => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div className="w-full max-w-md mx-auto px-2 my-3">
      <div
        ref={trackRef}
        className="relative h-2 bg-[#111827] rounded-full"
        onMouseDown={handleMouseDown}
      >
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#111827] rounded-full cursor-pointer transition"
          style={{ left: `calc(${getThumbPosition()}% - 0.5rem)` }}
        />
      </div>
      <div className='flex items-center justify-between my-2'>
        <div className='text-[14px] text-[#030712] flex gap-1 items-center '>
            <span>Price:</span>
            <span className=''>${min} -</span>
            <span className=''>${max}</span>
        </div>
        <Link 
            className='rounded-lg bg-[#E5E7EB] px-4 py-2 font-bold text-[14px] '
            href={'/'}
        >
            Filter
        </Link>
      </div>
    </div>
  );
}
