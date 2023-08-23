"use client";
import { Computing } from "./ui/Computing";
interface Props {
  place: any;
}

export const Nav = (props: Props) => {
  return (
    <>
      <div className="w-[200px] h-full flex flex-col select-none bg-gray-50 border-r-2 border-gray-300">
        <Computing place={props.place} />
      </div>
    </>
  );
};
