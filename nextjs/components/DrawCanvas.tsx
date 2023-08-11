"use client"
import { useEffect, useRef } from "react";
import { GetWindowSize } from "../hooks/GetWindowSize";

export const DrawCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = GetWindowSize();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    /* Canvas 要素を定義 */
    canvas.width = width - 20;
    canvas.height = height;
    canvas.style.backgroundColor = "#ffffff";
    console.log(width);
  
    /* 文字を配置 */
    const testText = context;
    if (testText) {
      testText.font = "40px serif";
      testText.fillText("test", 10, 50);
    }

  }, [width, height]);

  return (<canvas ref={canvasRef} />);
};