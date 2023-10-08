"use client";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { Header } from "../../components/Header";
import { Nav } from "../../components/Nav";
import { Aside } from "../../components/Aside";
import { CanvasElement } from "../../components/atom/CanvasElement";

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [CanvasElementArray, setCanvasElementArray] = useAtom(CanvasElement);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasContainer = canvasContainerRef.current;
    if (!canvasContainer) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    /* Canvas を定義 */
    canvas.width = 10000;
    canvas.height = 5000;
    canvas.style.backgroundColor = "#fff";

    /* Canvas 要素のドラッグ&ドロップ */
    canvas.addEventListener("mousedown", (event) => {
      const canvasX =
        event.clientX - canvas.offsetLeft + canvasContainer.scrollLeft;
      const canvasY =
        event.clientY - canvas.offsetTop + canvasContainer.scrollTop;

      setCoordinates({ x: canvasX, y: canvasY });
    });
  }, []);

  const placeIcon = (x: number, y: number, icon: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasContainer = canvasContainerRef.current;
    if (!canvasContainer) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const elementX = x + canvasContainer.scrollLeft;
    const elementY = y + canvasContainer.scrollTop;

    /* Icon を配置 */
    const img = new Image();
    img.src = icon;
    img.onload = () => {
      context.drawImage(img, elementX, elementY);
    };

    /* Icon の Jotai を追加 */
    const newCanvasElement = {
      id: CanvasElementArray[CanvasElementArray.length - 1].id + 1,
      x: elementX,
      y: elementY,
      width: 80,
      height: 80,
      src: icon,
    };
    setCanvasElementArray((prevArray) => [...prevArray, newCanvasElement]);
  };

  const moveIcon = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasContainer = canvasContainerRef.current;
    if (!canvasContainer) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    for (const canvasElement of CanvasElementArray) {
      if (
        x >= canvasElement.x &&
        x <= canvasElement.x + canvasElement.width &&
        y >= canvasElement.y &&
        y <= canvasElement.y + canvasElement.height
      ) {
        console.log("ヨシッ！");
        context.clearRect(
          canvasElement.x,
          canvasElement.y,
          canvasElement.width,
          canvasElement.height
        );
        break;
      }
    }
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
            <canvas
              ref={canvasRef}
              onMouseDown={() => moveIcon(coordinates.x, coordinates.y)}
            />
          </div>
          <Aside />
        </div>
      </div>
    </>
  );
};

export default Home;
