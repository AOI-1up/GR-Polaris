"use client";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { Aside } from "../components/Aside";
import { CanvasElement } from "../components/atom/CanvasElement";

const Home: NextPage = () => {
  const [canvasElementArray, setCanvasElementArray] = useAtom(CanvasElement);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const useCanvasContext = () => {
    const canvas = canvasRef.current;
    const canvasContainer = canvasContainerRef.current;
    const context = canvas?.getContext("2d");

    return { canvas, canvasContainer, context };
  };

  /* Canvas を生成 */
  useEffect(() => {
    const { canvas, canvasContainer } = useCanvasContext();
    if (!canvas || !canvasContainer) return;

    canvas.width = 2000;
    canvas.height = 2000;
    canvasContainer.scrollLeft = 1000 - canvasContainer.offsetWidth / 2;
    canvasContainer.scrollTop = 1000 - canvasContainer.offsetHeight / 2;

    canvas.addEventListener("mousemove", (event) => {
      const canvasX =
        event.clientX - canvas.offsetLeft + canvasContainer.scrollLeft;
      const canvasY =
        event.clientY - canvas.offsetTop + canvasContainer.scrollTop;

      setPosition({ x: canvasX, y: canvasY });
    });
  }, []);

  /* Canvas 内の要素をレンダリング */
  useEffect(() => {
    const { canvas, context } = useCanvasContext();
    if (!canvas || !context) return;

    canvasElementArray.slice(1).forEach((element) => {
      const img = new Image();
      img.src = element.src;
      img.onload = () => {
        context.drawImage(img, element.x, element.y);
      };
    });
  }, [canvasElementArray]);

  /* Jotai に新しい要素を追加 */
  const addCanvasElement = (canvasElement: any) => {
    const { canvas, canvasContainer } = useCanvasContext();
    if (!canvas || !canvasContainer) return;

    const canvasLeft = canvas.offsetLeft;
    const canvasRight = canvas.offsetLeft + canvasContainer.clientWidth;
    const canvasTop = canvas.offsetTop;
    const canvasBottom = canvas.offsetTop + canvasContainer.clientHeight;

    const canvasX =
      canvasElement.x < canvasLeft || canvasElement.x > canvasRight;
    const canvasY =
      canvasElement.y < canvasTop || canvasElement.y > canvasBottom;

    if (canvasX || canvasY) return; // canvas の外には要素を配置しない
    const newCanvasElement = {
      ...canvasElement,
      x: canvasElement.x - canvas.offsetLeft + canvasContainer.scrollLeft,
      y: canvasElement.y - canvas.offsetTop + canvasContainer.scrollTop,
    };
    setCanvasElementArray((prevArray) => [...prevArray, newCanvasElement]);
  };

  /* Canvas 内の要素を動かす */
  const moveCanvasElement = (x: number, y: number) => {
    const { canvas, context } = useCanvasContext();
    if (!canvas || !context) return;

    for (let i = canvasElementArray.length - 1; i > 0; i--) {
      const canvasElement = canvasElementArray[i];
      const withinX =
        x >= canvasElement.x && x <= canvasElement.x + canvasElement.width;
      const withinY =
        y >= canvasElement.y && y <= canvasElement.y + canvasElement.height;

      if (withinX && withinY) {
        const { x, y, width, height, id } = canvasElement;
        context.clearRect(x, y, width, height);
        setCanvasElementArray((prevArray) =>
          prevArray.filter((element) => element.id !== id)
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
          <Nav func={addCanvasElement} />
          <div
            className="overflow-scroll"
            style={{ width: "calc(100vw - 405px)" }}
            ref={canvasContainerRef}
          >
            <canvas
              ref={canvasRef}
              onMouseDown={() => {
                moveCanvasElement(position.x, position.y);
              }}
            />
          </div>
          <Aside />
        </div>
      </div>
    </>
  );
};

export default Home;
