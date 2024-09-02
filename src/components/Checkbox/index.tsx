import { cn } from '@/lib/utils';
import { FC, HTMLAttributes, ReactNode } from 'react';
import CheckedIcon from '../Icons/CheckedIcon';

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  labelClass?: string;
  checked?: boolean;
  required?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ label, labelClass, checked, required, ...props }) => (
  <div className="w-full flex items-center gap-2.5">
    <input
      className="
        peer relative appearance-none shrink-0 w-4 h-4 border border-gray-75 bg-white
        checked:bg-black-75 checked:border-0
        disabled:border-steel-400 disabled:bg-steel-400
        cursor-pointer
      "
      type="checkbox"
      {...props}
      checked={checked}
      required={required}
      readOnly
    />
    <CheckedIcon className="absolute w-3 h-3 ml-[2px] pointer-events-none hidden peer-checked:block" />
    {label && (
      <label
        htmlFor={props.id}
        className={cn(
          'text-sm font-extralight text-black-100 leading-[26.04px] cursor-pointer',
          labelClass
        )}
      >
        {label}
      </label>
    )}
  </div>
);

export default Checkbox;
