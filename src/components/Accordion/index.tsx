import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AccordionProps {
  label: string;
  content: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Accordion: FC<AccordionProps> = ({
  label,
  content,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className="w-full flex flex-col border border-gray-200">
      <button
        className={`flex items-center justify-between p-4 text-left ${
          isOpen ? "bg-white text-primary" : "bg-[#fafafa]"
        } hover:text-primary transition-all duration-500`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}{" "}
        {isOpen ? (
          <i className="las la-chevron-up text-primary" />
        ) : (
          <i className="las la-chevron-down text-black" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-max-height duration-700 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <p className="text-sm font-extralight py-4 px-3">{content}</p>
      </div>
    </div>
  );
};

export default Accordion;
