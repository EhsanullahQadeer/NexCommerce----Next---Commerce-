import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

const OrderTab = () => {
  const router = useRouter();
  return (
    <div className="mt-1.5">
      <p className="text-black-500 font-extralight text-sm mb-2.5 leading-[30.1px]">
        No order has been made yet.
      </p>
      <Button className="uppercase" onClick={() => router.push('/products')}>
        Go shop <i className="las la-long-arrow-alt-right ml-2.5"></i>
      </Button>
    </div>
  );
};

export default OrderTab;
