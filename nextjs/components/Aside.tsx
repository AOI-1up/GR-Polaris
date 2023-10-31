import { useAtomValue } from "jotai";
import { CanvasElement } from "./atom/CanvasElement";
import { useState } from "react";
import { ConfigEC2 } from "./ui/resources/ConfigEC2";

export const Aside = () => {
  const canvasElementArray = useAtomValue(CanvasElement);
  const [showEC2, setShowEC2] = useState(false);
  const [changeEC2, setChangeEC2] = useState(Object);

  canvasElementArray.forEach((object) => {
    if (object.show === true && object.service === "EC2") {
      setChangeEC2(object.id);
      setShowEC2(true);
      object.show = false;
    }
  });

  return (
    <>
      <div className="w-[270px] h-full flex flex-col select-none bg-gray-50 border-l-2 border-gray-300">
        {/* <ul className="w-full h-[200px] flex flex-col items-center font-sans font-bold text-sm">
          {display.slice(1).map((object, index) => (
            <li key={index}>
              {`id:${object.id}, x: ${object.x}, y: ${object.y}, width: ${object.width}, height: ${object.height}, props: ${object.resources.show}`}
            </li>
          ))}
        </ul> */}
        {/* ec2, vpc, subnet で分ける */}
        {/* アイコンクリック
        クリックされた id を表示する
         */}
        {showEC2 && <ConfigEC2 id={changeEC2} />}
      </div>
    </>
  );
};
