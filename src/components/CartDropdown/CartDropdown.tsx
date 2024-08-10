import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import NotificationIcon from '../Navbar/elements/NotificationIcon';
import CartList from './CartList';
import CartDropdownActions from './CartActions';
import useOutsideClick from '@/hooks/useOutSideClick';

const dropdownBaseStyles =
  'absolute w-[300px] bg-white top-[60px] right-0 shadow-dropdown px-[30px] pt-[10px] pb-[25px] z-[9] opacity-0 invisible';
const dropdownHoverStyle = 'group-hover:visible group-hover:opacity-100';
const activeStyles = '!visible !opacity-100';

const CartDropdown = () => {
  const dropdownRef = useRef<HTMLInputElement>(null);
  const [isActive, setisActive] = useState(false);

  useOutsideClick(dropdownRef, () => {
    setisActive(false);
  });

  return (
    <div
      className="group relative flex min-h-[60px] items-center"
      ref={dropdownRef}
    >
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setisActive(true)}
      >
        <NotificationIcon
          icon="las la-shopping-cart group-hover:!text-primary transition"
          iconClass="!text-[32px]"
          count={2}
        />
        <span className="font-light text-[13px] text-[#222] ml-4 mb-1 hover:text-primary">
          $ 164,00
        </span>
      </div>

      <div
        className={cn(
          dropdownBaseStyles,
          dropdownHoverStyle,
          isActive && activeStyles
        )}
        style={{ transition: 'all .25s' }}
        onClick={() => setisActive(false)}
      >
        <CartList />
        <CartList />
        <CartDropdownActions />
      </div>
    </div>
  );
};

export default CartDropdown;
