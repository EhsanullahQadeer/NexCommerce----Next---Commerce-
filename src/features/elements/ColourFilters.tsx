import { FC } from "react";
import { cn } from "@/lib/utils";
import CheckedIcon from "@/components/Icons/CheckedIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  handleOtherFilter,
  _handleOtherFilter,
  selectProducts,
  Torigin,
  selectProductsRootState,
} from "@/store/slices/products/productsSlice";

const colours = [
  { label: "Brown", colour: "#b87145" },
  { label: "Yellow", colour: "#f0c04a" },
  { label: "black", colour: "#333333" },
  { label: "red", colour: "#cc3333" },
  { label: "white", colour: "#ebebeb" },
];

const colorCircleStyles =
  "relative flex items-center h-6 w-6 rounded-full cursor-pointer border-[2px] border-white";
interface IProps {
  isHorizontal?: boolean;
  origin?: Torigin;
}
const ColourFilters = (props: IProps) => {
  const { isHorizontal, origin } = props;
  const dispatch = useDispatch();
  const { colorFilter } = useSelector(
    origin ? selectProductsRootState[origin] : selectProducts
  );

  const isActive = (colour: string) => colorFilter === colour;

  const handleColorSelect = (value: string) => {
    if (origin) {
      dispatch(
        _handleOtherFilter({ payload: { key: "colorFilter", value }, origin })
      );
    } else {
      dispatch(handleOtherFilter({ key: "colorFilter", value }));
    }
  };

  return (
    <div className={isHorizontal ? "flex items-center gap-[5px]" : ""}>
      {colours.map((item) => (
        <div className="flex items-center gap-2.5 mb-1" key={item.colour}>
          <div
            className={cn(
              colorCircleStyles,
              isActive(item.colour) && "shadow-[0_0_0_1px_#cccccc]"
            )}
            style={{ background: item.colour }}
            onClick={() => handleColorSelect(item.label)}
          >
            <CheckedIcon
              className={cn(
                "hidden absolute w-3 h-3 pointer-events-none top-0 left-0 right-0 bottom-0 m-auto",
                isActive(item.label) && "block"
              )}
            />
          </div>
          {!isHorizontal && (
            <span
              className="text-sm font-extralight text-black-100 leading-[26.04px] cursor-pointer hover:text-primary"
              onClick={() => handleColorSelect(item.label)}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ColourFilters;
