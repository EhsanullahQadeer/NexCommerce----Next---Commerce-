import { useState } from 'react';
import Container from '../Container';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="bg-[url('/notification-bg.jpg')] bg-cover bg-center z-[91]">
      <Container className="relative py-[13px]">
        <h3 className="text-[13px] font-normal tracking-[0.65px] leading-[14.3px] text-white md:text-center">
          FREE SHIPPING FOR ALL ORDERS OVER $50
        </h3>
        <div className="absolute flex items-center right-2.5 top-0 bottom-0 my-auto">
          <i
            className="text-base text-white las la-times cursor-pointer"
            onClick={() => setIsOpen(false)}
          ></i>
        </div>
      </Container>
    </div>
  );
};

export default Notification;
