import { FC, useEffect, useMemo, useState } from "react";
import { arrayNumberGenerator, cn } from "@/lib/utils";
import Stars from "../Stars";
import { selectProducts } from "@/store/slices/products/productsSlice";
import { useSelector } from "react-redux";
import useCurrency from "@/hooks/useCurrency";
import { useGetProductReviewListMutation } from "@/store/api/ordersApi";
import { IReview } from "@/types/order";
import { Rating } from "@mui/material";
import { calculateAverageRating } from "@/utility/calculateAverageRating";
import Skeleton from "react-loading-skeleton";

interface DescriptionProps {
  className?: string;
}

const Description: FC<DescriptionProps> = ({ className }) => {
  const { quickViewProduct, currentVarient } = useSelector(selectProducts);
  const { formatPrice } = useCurrency();
  const { name, price, description, currency_id, id, reviews } =
    quickViewProduct || {};
  const averageRating = useMemo(
    () => calculateAverageRating(reviews as unknown as IReview[]),
    [reviews]
  );
  return (
    <div className={cn("mb-10", className)}>
      <h2 className="text-2xl text-black-75 font-light mb-2.5 tracking-[-0.6px] leading-[30px]">
        {name}
      </h2>

      <div className={cn("flex items-center gap-2 mb-2.5", className)}>
        <Rating
          name="product-rating"
          value={averageRating}
          size="small"
          precision={0.1}
          readOnly
        />
        <span className="text-black-600 text-[13px] font-extralight">
          ( {reviews?.length} Reviews )
        </span>
      </div>
      <h3 className="text-2xl text-primary font-light mb-2.5 tracking-[-0.6px] leading-[30px]">
        {price && formatPrice(Number(price), currency_id)}
      </h3>
      <p className="mt-[17px] font-extralight text-sm text-black-100 leading-[26.04px]">
        {description}
      </p>
    </div>
  );
};

export default Description;
