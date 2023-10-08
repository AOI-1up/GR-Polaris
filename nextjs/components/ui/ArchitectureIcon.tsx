import Image from "next/image";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { CanvasElement } from "../atom/CanvasElement";

interface Props {
  func: (object: object) => void;
  width: number;
  height: number;
  path: string;
}

export const ArchitectureIcon = (props: Props) => {
  const [showDraggedElement, setShowDraggedElement] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const CanvasElementArray = useAtomValue(CanvasElement);

  const handleMouseDown = () => {
    // イベントリスナーを追加
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    // ドラッグ要素を表示
    setShowDraggedElement(true);
    setPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = (event: MouseEvent) => {
    // ドラッグ要素を非表示
    setShowDraggedElement(false);

    // Jotai に Canvas 要素を追加
    const newCanvasElement = {
      id: CanvasElementArray[CanvasElementArray.length - 1].id + 1,
      x: event.clientX,
      y: event.clientY,
      width: props.width,
      height: props.height,
      src: props.path,
    };
    props.func(newCanvasElement);

    // イベントリスナーを削除
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <div className="w-1/4 flex justify-center">
        <div
          className="w-[45px] h-[45px] flex justify-center items-center hover:bg-gray-300 active:opacity-50 rounded"
          onMouseDown={handleMouseDown}
        >
          <Image
            src={props.path}
            className="pointer-events-none"
            width={35}
            height={35}
            alt=""
            priority
          />
        </div>
        {showDraggedElement && (
          <Image
            src={props.path}
            className="pointer-events-none opacity-50"
            width={props.width}
            height={props.height}
            style={{
              position: "fixed",
              left: position.x + "px",
              top: position.y + "px",
            }}
            alt=""
            priority
          />
        )}
      </div>
    </>
  );
};
