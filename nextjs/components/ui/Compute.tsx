import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ArchitectureIcon } from "./ArchitectureIcon";

interface Props {
  func: (object: object) => void;
}

const Icon = ({ id, open }: { id: number; open: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

export const Compute = (props: Props) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion
        open={open === 1}
        icon={<Icon id={1} open={open} />}
        className="w-full flex flex-col"
      >
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="h-[40px] border-b-[1px] border-gray-300 px-4 py-2 font-sans font-bold text-sm"
        >
          Compute
        </AccordionHeader>
        <AccordionBody className="w-full flex flex-wrap items-center border-b-[1px] border-gray-300 px-2 py-1">
          <ArchitectureIcon
            func={props.func}
            path="/AWS/compute/ec2.svg"
            width={80}
            height={80}
          />
          <ArchitectureIcon
            func={props.func}
            path="/AWS/groups/region.png"
            width={80}
            height={80}
          />
        </AccordionBody>
      </Accordion>
    </>
  );
};
