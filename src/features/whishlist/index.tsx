'use client';
import Table from '@/components/Table';
import { tableHeader } from './data';
import SocialMobileIcons from '@/components/Navbar/elements/SocialMobileIcons';

const WhistlistComponent = () => {
  return (
    <div className="pt-10 pb-[50px] gap-5">
      <div>
        <Table headers={tableHeader} />
      </div>
      <div className='flex items-center mt-[30px] mb-5'>
        <span className="mr-2 text-sm font-light text-black-500 tracking-[0.14px] leading-[16.8px]">
          Share on:{' '}
        </span>
        <SocialMobileIcons variant="dark" className="!mt-0 !gap-[5px]" />
      </div>
    </div>
  );
};

export default WhistlistComponent;
