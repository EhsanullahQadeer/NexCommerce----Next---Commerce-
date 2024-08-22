import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Button from "../Button";
import {
  productVerticalActionStyles,
  previewBtnStyles,
} from "./elements/styles";
import IconWithText from "../Icons/IconWithTextOverlay";
import ColorVariants from "../ColorVariants";
import TagLabel from "./elements/TagLabel";
import CardPrice from "./elements/CardPrice";
import { Blog } from "@/types/blog";

export interface BlogCardProps extends Blog {
  className?: string;
}

const BlogCard: FC<BlogCardProps> = ({
  id,
  title,
  src,
  description,
  categories,
  publishedAt,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={cn("relative mb-2.5", className)}>
      <div className="relative overflow-hidden">
        <Link href={`/products/${id}`} className="relative">
          <Image
            fill
            src={src}
            alt="Blog image"
            className="!relative w-full height-auto min-h-[150px]"
          />
        </Link>
      </div>
      <div className="pt-4 pb-5 flex flex-col text-center">
        <span className="text-sm font-light text-black-200 mb-[3px]">
          {new Date(publishedAt).toDateString()}
        </span>
        <span className="text-lg font-semibold text-black mb-[3px]">
          <Link href="/products" className="hover:text-primary">
            {title}
          </Link>
        </span>
        {categories && categories?.length > 0 && (
          <span className="text-sm font-light text-black-200 mb-[3px] capitalize">
            in {categories.join(", ")}
          </span>
        )}
        <p className="text-sm font-light text-black-200 mb-[3px] my-2">
          {description}
        </p>
        {/* <div className="mt-3">
          <Link
            href="#"
            className="text-sm font-light text-primary hover:shadow-[0_0.1rem_0_0_#cc9966] leading-[18px]"
          >
            Continue Reading
          </Link>
        </div> */}
        {/* <div className="transition-all duration-[0.35s] ease">
          <Link
            href="#"
            className="text-sm font-ligth text-primary hover:shadow-[0_0.1rem_0_0_#cc9966] leading-[18px] inline-flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Continue Reading
            {isHovered && (
              <i className="las la-long-arrow-alt-right  transition-all duration-300 transform"></i>
            )}
          </Link>
        </div> */}
        {/* <div
          className="transition-all duration-[0.35s] ease"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link
            href="#"
            className="text-sm font-light text-primary hover:shadow-[0_0.07rem_0_0_#cc9966] leading-[28px] inline-flex items-center"
          >
            <span
              className={`transition-transform duration-300 ${
                isHovered ? "transform -translate-x-1" : ""
              }`}
            >
              Continue Reading
            </span>
            {isHovered && (
              <i
                className={`las la-long-arrow-alt-right transition-transform duration-300 ${
                  isHovered ? "transform translate-x-1" : ""
                }`}
              ></i>
            )}
          </Link>
        </div> */}
        <div
          className="transition-all duration-[0.35s] ease group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="group-hover:shadow-[0_0.07rem_0_0_#cc9966] px-1 py-1">
            <Link
              href="#"
              className="text-sm font-light text-primary inline-flex items-center"
            >
              <span
                className={`transition-transform duration-300 ${
                  isHovered ? "transform -translate-x-1" : ""
                }`}
              >
                Continue Reading
              </span>
              {isHovered && (
                <i
                  className={`las la-long-arrow-alt-right transition-transform duration-300 ${
                    isHovered ? "transform translate-x-1" : ""
                  }`}
                ></i>
              )}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
