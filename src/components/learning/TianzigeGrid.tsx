"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Eraser, Eye, RefreshCw } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";

interface TianzigeGridProps {
  hanzi: string;
  pinyin?: string;
  size?: "md" | "lg";
  interactive?: boolean;
  className?: string;
  onClear?: () => void;
}

export function TianzigeGrid({
  hanzi,
  pinyin,
  size = "lg",
  interactive = true,
  className,
}: TianzigeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGhost, setShowGhost] = useState(true);
  const [hasDrawn, setHasDrawn] = useState(false);

  const dimension = size === "lg" ? 180 : 120;

  // Initialize canvas
  useEffect(() => {
    if (!interactive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#0f172a";
  }, [interactive]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !interactive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {pinyin && (
        <span className="text-base sm:text-lg font-semibold text-primary">
          {pinyin}
        </span>
      )}

      {/* The Tianzige Box */}
      <div
        className="relative rounded-2xl border-2 border-red-300 dark:border-red-900/60 bg-white/90 dark:bg-slate-900/90 shadow-md overflow-hidden select-none"
        style={{ width: dimension, height: dimension }}
      >
        {/* SVG Guides (Dashed horizontal, vertical, and diagonals) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none stroke-red-300/60 dark:stroke-red-800/40"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        >
          {/* Horizontal center */}
          <line x1="0" y1="50%" x2="100%" y2="50%" />
          {/* Vertical center */}
          <line x1="50%" y1="0" x2="50%" y2="100%" />
          {/* Diagonals */}
          <line x1="0" y1="0" x2="100%" y2="100%" strokeDasharray="2 4" opacity="0.6" />
          <line x1="100%" y1="0" x2="0" y2="100%" strokeDasharray="2 4" opacity="0.6" />
        </svg>

        {/* Ghost Hanzi Guide */}
        {showGhost && (
          <div
            className="absolute inset-0 flex items-center justify-center font-hanzi font-bold text-slate-300 dark:text-slate-700 pointer-events-none select-none transition-opacity"
            style={{ fontSize: dimension * 0.7 }}
          >
            {hanzi}
          </div>
        )}

        {/* Interactive Drawing Canvas */}
        {interactive ? (
          <canvas
            ref={canvasRef}
            width={dimension}
            height={dimension}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center font-hanzi font-bold text-content-main select-none"
            style={{ fontSize: dimension * 0.7 }}
          >
            {hanzi}
          </div>
        )}
      </div>

      {/* Control Buttons for Interactive Mode */}
      {interactive && (
        <div className="flex items-center gap-2 mt-1">
          <button
            type="button"
            onClick={() => setShowGhost(!showGhost)}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-content-muted hover:text-content-main transition-colors text-xs flex items-center gap-1"
            title="Bật/tắt chữ mẫu"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {showGhost ? "Ẩn mẫu" : "Hiện mẫu"}
            </span>
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-content-muted hover:text-rose-500 transition-colors text-xs flex items-center gap-1"
            title="Xóa viết lại"
          >
            <Eraser className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Xóa nét</span>
          </button>
        </div>
      )}
    </div>
  );
}
