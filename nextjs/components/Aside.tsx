import { useAtomValue } from "jotai";
import { CanvasElement } from "./atom/CanvasElement";

export const Aside = () => {
  const display = useAtomValue(CanvasElement);

  return (
    <>
      <div className="w-[200px] h-full flex flex-col select-none bg-gray-50 border-l-2 border-gray-300">
        <ul className="w-full h-[200px] flex flex-col items-center font-sans font-bold text-sm">
          {display.slice(1).map((object, index) => (
            <li key={index}>
              {`id:${object.id}, x: ${object.x}, y: ${object.y}, width: ${object.width}, height: ${object.height}`}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
