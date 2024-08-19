import CardComponent from './CardComponent';
import { categories } from './data';

const ProductCategoriesComponent = () => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 lg:gap-5 mt-10 mb-[50px]">
      {categories.map((item, index) => (
        <CardComponent key={index} {...item} />
      ))}
    </div>
  );
};

export default ProductCategoriesComponent;
