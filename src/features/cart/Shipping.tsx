'use client';

import Radio from '@/components/Radio';
import { useState } from 'react';

const Shipping = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  return (
    <form>
      <div className="flex justify-between items-center py-[5px]">
        <Radio
          label="Free Shipping"
          className="text-black-75 font-light text-sm"
          name="shipping"
          value="shipping"
          checked={selectedItem === 'shipping'}
          onChange={(e: any) => setSelectedItem(e.target.value)}
        />
        <span className="text-black-75 font-light text-sm">$0.00</span>
      </div>
      <div className="flex justify-between items-center py-[5px]">
        <Radio
          label="Standard:"
          className="text-black-75 font-light text-sm"
          name="shipping"
          value="standard"
          checked={selectedItem === 'standard'}
          onChange={(e: any) => setSelectedItem(e.target.value)}
        />
        <span className="text-black-75 font-light text-sm">$10.00</span>
      </div>
      <div className="flex justify-between items-center py-[5px]">
        <Radio
          label="Express:"
          className="text-black-75 font-light text-sm"
          name="shipping"
          value="express"
          checked={selectedItem === 'express'}
          onChange={(e: any) => setSelectedItem(e.target.value)}
        />
        <span className="text-black-75 font-light text-sm">$20.00</span>
      </div>
    </form>
  );
};

export default Shipping;
