"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import DropdownList from "./DropdownList";
import useOutsideClick from "@/hooks/useOutSideClick";

interface DropdownItem {
  id: string;
  name: string;
  value: string;
}

interface DropdownProps {
  id: string;
  title?: string;
  items?: DropdownItem[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  hasImage?: boolean;
  style?: string;
  selected?: DropdownItem | null;
  onSelect?: (id: string, item?: any) => void;
}

const Dropdown = ({
  id,
  title = "Select",
  items,
  position = "bottom-left",
  style,
  selected = null,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const handleChange = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect && onSelect(item.id, item);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selected?.id !== selectedItem?.id) {
      setSelectedItem(selected);
    }
  }, [selected]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  const dropdownClass = cn(
    "absolute bg-white w-max max-h-52 overflow-y-auto py-[0.6px] rounded shadow-md z-10",
    {
      "top-full right-0 mt-1": position === "bottom-right",
      "top-full left-0 mt-1": position === "bottom-left",
      "bottom-full right-0": position === "top-right",
      "bottom-full left-0": position === "top-left",
    }
  );

  return (
    <div ref={dropdownRef} className="relative">
      <button
        id={id}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex text-[13px] font-light justify-between items-center gap-2 rounded w-full py-2 px-4 bg-white text-black-500 uppercase",
          style
        )}
      >
        <span>{selectedItem?.name || title}</span>
        <i className="las la-angle-down -mt-[2px]"></i>
      </button>
      {/* Open */}
      {isOpen && (
        <div aria-label="Dropdown menu" className={dropdownClass}>
          <ul role="menu" aria-labelledby={id} aria-orientation="vertical">
            {items?.map((item, index) => (
              <DropdownList
                key={item.id + index}
                onClick={() => handleChange(item)}
                isActive={selectedItem?.id === item.id}
              >
                {item.name}
              </DropdownList>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
