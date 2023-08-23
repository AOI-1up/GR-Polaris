"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ArchitectureIcon } from "./ArchitectureIcon";

interface Props {
  place: any;
}

const Icon = ({ id, open }: { id: number; open: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
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

export const Computing = (props: Props) => {
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
          className="h-[40px] border-b-2 border-gray-300 px-4 py-2 font-sans font-bold text-sm"
        >
          Computing
        </AccordionHeader>
        <AccordionBody className="w-full flex flex-wrap items-center px-2 py-1">
          <ArchitectureIcon src="./AWS/computing/ec2.svg" place={props.place} />
        </AccordionBody>
      </Accordion>
    </>
  );
};
