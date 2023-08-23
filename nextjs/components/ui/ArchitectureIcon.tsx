import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  place: any;
}

export const ArchitectureIcon = (props: Props) => {
  const [showDraggedElement, setShowDraggedElement] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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

    // Canvas に要素を貼り付け
    const newPosition = { x: event.clientX - 200, y: event.clientY - 50 };
    props.place(newPosition.x, newPosition.y, props.src);

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
            src={props.src}
            className="pointer-events-none"
            width={35}
            height={35}
            alt=""
            priority
          />
        </div>
        {showDraggedElement && (
          <Image
            src={props.src}
            className="pointer-events-none opacity-50"
            width={80}
            height={80}
            style={{
              position: "absolute",
              left: position.x + "px",
              top: position.y - 50 + "px",
            }}
            alt=""
            priority
          />
        )}
      </div>
    </>
  );
};
