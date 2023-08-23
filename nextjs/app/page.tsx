"use client";
import { NextPage } from "next";
import { useEffect, useRef } from "react";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { Aside } from "../components/Aside";

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* Canvas 要素を定義 */
    canvas.width = 10000;
    canvas.height = 5000;
    canvas.style.backgroundColor = "#fff";
  }, []);

  const placeIcon = (x: number, y: number, icon:string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasContainer = canvasContainerRef.current;
    if (!canvasContainer) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const img = new Image();
    img.src = icon;
    img.onload = () => {
      context.drawImage(
        img,
        x + canvasContainer.scrollLeft,
        y + canvasContainer.scrollTop
      );
    };
  };

  return (
    <>
      <div className="flex flex-col text-gray-700">
        <Header />
        <div
          className="flex justify-between"
          style={{ height: "calc(100vh - 50px)" }}
        >
          <Nav place={placeIcon} />
          <div
            className="overflow-scroll"
            style={{ width: "calc(100vw - 405px)" }}
            ref={canvasContainerRef}
          >
            <canvas ref={canvasRef} />
          </div>
          <Aside />
        </div>
      </div>
    </>
  );
};

export default Home;
