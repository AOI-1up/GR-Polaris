import { Compute } from "./ui/Compute";

interface Props {
  func: (object: object) => void;
}

export const Nav = (props: Props) => {
  return (
    <>
      <div className="w-[270px] h-full flex flex-col select-none bg-gray-50 border-r-2 border-gray-300">
        <Compute func={props.func} />
      </div>
    </>
  );
};
