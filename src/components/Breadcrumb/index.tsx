import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface IbreadcrumbLink {
  url: string;
  name: string;
  disabled?: boolean;
}
export interface BreadcrumbProps {
  links: IbreadcrumbLink[];
  border?: "top" | "bottom" | "both";
  children?: ReactNode;
}

const borderType = {
  top: "border-t",
  bottom: "border-b",
  both: "border-t border-b",
};

const Breadcrumb: FC<BreadcrumbProps> = ({
  links,
  border = "bottom",
  children,
}) => {
  return (
    <nav
      className={cn(
        "flex py-[14px] border-[rgba(235,235,235,.55)]",
        borderType[border]
      )}
    >
      <ol className="w-full max-w-container mx-auto px-2.5">
        {links.map((link, index) => {
          const isLastIndex = index === links.length - 1;
          return (
            <li className="inline-flex items-center leading-21px" key={index}>
              {isLastIndex ? (
                <span className="capitalize text-sm font-extralight text-gray-75">
                  {link.name}
                </span>
              ) : (
                <>
                  <Link
                    href={link.url}
                    className={cn(
                      link.disabled ? "pointer-events-none" : "",
                      "capitalize inline-flex items-center text-sm font-extralight text-black-500 hover:text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                  <i className="las la-angle-right text-[12px] mx-2.5 text-black-500"></i>
                </>
              )}
            </li>
          );
        })}
      </ol>
      {children}
    </nav>
  );
};

export default Breadcrumb;
