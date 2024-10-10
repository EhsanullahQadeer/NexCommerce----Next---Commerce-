import { FC } from "react";
import Stars from "@/components/Stars";
import Link from "next/link";
import { selectProducts } from "@/store/slices/products/productsSlice";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import useDate from "@/hooks/useDate";

const ReviewsTab: FC = () => {
  const { quickViewProduct } = useSelector(selectProducts);
  const { reviews } = quickViewProduct || {};
  const { formateDate } = useDate();
  return (
    <div>
      <h3 className="text-black-75 text-base font-medium leading-[17.6px] tracking-[-0.16px] mb-[23px]">
        Reviews ({reviews?.length})
      </h3>
      {reviews?.map((review, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row sm:gap-5 pb-[13px] mb-5 border-b border-black-300"
        >
          <div className="min-w-[100px]">
            {/* <Link
              href="#"
              className="text-black-75 font-normal tracking-[-0.16px] leading-[20px] mb-2"
            >
              {review.name}
            </Link> */}
            <Rating
              name="product-rating"
              value={review.rating}
              size="small"
              precision={0.1}
              readOnly
            />
            <p className="text-sm font-extralight text-black-500 leading-[26.04px] mb-2">
              {review.review}
            </p>
            <div className="text-black-600 text-sm font-light leading-[26.04px] mt-[5px]">
              {formateDate(review.created_at)}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href=""
                className="text-xs font-extralight text-black-500 leading-[22.32px] hover:text-primary hover:shadow-[0_1px_0_#cc9966]"
              >
                <i className="lar la-thumbs-down"></i> Helpful (2)
              </Link>
              <Link
                href=""
                className="text-sm font-extralight text-black-500 leading-[22.32px] hover:text-primary hover:shadow-[0_1px_0_#cc9966]"
              >
                <i className="lar xs-thumbs-up"></i> Unhelpful (0)
              </Link>
            </div>
          </div>
          <div>
            {/* <h4 className="text-base text-black-75 font-normal leading-[-0.16px] mb-2">
              {review.heading}
            </h4> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsTab;
