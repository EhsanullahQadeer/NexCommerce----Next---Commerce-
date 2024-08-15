import Button from "@/components/Button"
import LinkButton from "./LinkButton"
import { FC } from "react";
import { cn } from "@/lib/utils";

interface ActionsProps {
  isModal?: boolean;
}

const Actions: FC<ActionsProps> = ({ isModal }) => {
  return (
    <div className={cn(!isModal && "flex justify-between items-center mt-5 mb-5")}>
      <div className={cn("flex items-center", isModal && 'mt-[50px] mb-10')}>
        <LinkButton url="#" label="Add to Wwhishlist" icon="lar la-heart" />
        <LinkButton url="#" label="Add to Compare" icon="las la-random" />
      </div>
     
      <div className={cn(isModal && 'mb-10')}>
        <Button
          className={cn("!justify-center uppercase !tracking-[1.4px]", isModal && 'h-[44px] !w-full')}
          variant="outlined"
        >
          <i className="las la-cart-plus mr-1 text-lg"></i>Add to cart
        </Button>
      </div>
    </div>
  )
}

export default Actions;
