import Breadcrumb from '@/components/Breadcrumb';
import Container from '@/components/Container';
import Hero from '@/components/Hero';
import CartComponent from '@/features/cart';

const CartPage = () => {
  const links = [
    {
      url: '/',
      name: 'Home',
    },
    {
      url: '#',
      name: 'Shop',
    },
    {
      url: '/cart',
      name: 'Cart',
    },
  ];

  return (
    <div>
      <Hero title="Shopping Cart" subTitle="Shop" />
      <Breadcrumb links={links} />
      <Container>
        <CartComponent />
      </Container>
    </div>
  );
};

export default CartPage;
