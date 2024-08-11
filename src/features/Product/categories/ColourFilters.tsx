import { useState } from 'react';
import { cn } from '@/lib/utils';
import CheckedIcon from '@/components/Icons/CheckedIcon';

const colours = [
  { label: 'Brown', colour: '#b87145' },
  { label: 'Yellow', colour: '#f0c04a' },
  { label: 'black', colour: '#333333' },
  { label: 'red', colour: '#cc3333' },
  { label: 'white', colour: '#ebebeb' },
];

const colorCircleStyles =
  'relative flex items-center h-5 w-5 rounded-full cursor-pointer border-[2px] border-white';

const ColourFilters = () => {
  const [selectedColour, setSelectedColour] = useState<string>('');

  const isActive = (colour: string) => selectedColour === colour;
  return (
    <div>
      {colours.map((item) => (
        <div className="flex items-center gap-2.5 mb-1" key={item.colour}>
          <div
            className={cn(
              colorCircleStyles,
              isActive(item.colour) && 'shadow-[0_0_0_1px_#cccccc]'
            )}
            style={{ background: item.colour }}
            onClick={() => setSelectedColour(item.colour)}
          >
            <CheckedIcon
              className={cn(
                'hidden absolute w-3 h-3 pointer-events-none top-[2px] left-[2px] mx-auto',
                isActive(item.colour) && 'block'
              )}
            />
          </div>
          <span
            className="text-sm font-extralight text-black-100 leading-[26.04px] cursor-pointer hover:text-primary"
            onClick={() => setSelectedColour(item.colour)}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ColourFilters;
