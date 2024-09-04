import { FC } from 'react';
import NumberInput from '@/components/NumberInput/NumberInput';
import Description from '@/components/ProductDetails/Description';
import { Label } from './Items';
import CategoryWithIcons from './CategoryWithIcons';
import Actions from './Actions';
import { ColorVariant, ProductVariant, SizeVariant } from '@/types/product';
import ColorVariants from '@/components/ColorVariants';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentVarient, selectProducts } from '@/store/slices/products/productsSlice';
import SizeVariants from '@/components/SizeVariants';
import { CartItem, selectCart } from '@/store/slices/cart/cartSlice';
import { RootState } from '@/store';
import { useAddToCartMutation, useCartDetailsGetMutation, useDeletefromCartMutation } from '@/store/api/cartApi';

interface ProductDetailsColumnProps {
  isModal?: boolean;
}

const ProductDetailsColumn: FC<ProductDetailsColumnProps> = ({ isModal }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth);
  const { quickViewProduct, currentVarient } = useSelector(selectProducts);
  const { cartDetails } = useSelector(selectCart);
  const { product_variants } = quickViewProduct || {}
  const [addToCart] = useAddToCartMutation()
  const [cartDetailsGet] = useCartDetailsGetMutation()
  const [deletefromCart] = useDeletefromCartMutation()
  const handleFetchCart = async () => {
    try {
      if (user?.id) {

        await cartDetailsGet({ user_id: user?.id }).unwrap();
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const colorVarientFilter = (varients: ProductVariant[]) => {
    let colorsvarients: ColorVariant[] = []

    varients.map((el) => {
      el?.attribute_values?.map((item) => {
        if (item?.variant_attribute?.attribute_name == "Color" || item?.variant_attribute?.attribute_name == "Colour") {
          const checkColor = colorsvarients.find(el => el.color == item.value.toLowerCase())
          !checkColor && colorsvarients.push({ id: item.id, color: item.value.toLowerCase() })
        }
      })
    })

    return colorsvarients
  }

  const sizeVarientFilter = (varients: ProductVariant[]) => {
    let sizeVarients: SizeVariant[] = []

    varients.map((el) => {
      el?.attribute_values?.map((item) => {
        if (item?.variant_attribute?.attribute_name == "Size") {
          const checkSize = sizeVarients.find(el => el.label == item.value.toLowerCase())
          !checkSize && sizeVarients.push({ id: item.id, label: item.value.toLowerCase(), value: item.value.toLowerCase() })
        }
      })
    })

    return sizeVarients
  }

  const checkCurrentColor = () => {
    let checkColor = ""
    currentVarient?.attribute_values?.forEach((el) => {
      if (el.variant_attribute?.attribute_name == "Color") {
        checkColor = el.value
      }
    })
    return checkColor
  }

  const checkCurrentSize = () => {
    let checkSize = ""
    currentVarient?.attribute_values?.forEach((el) => {
      if (el.variant_attribute?.attribute_name == "Size") {
        checkSize = el.value
      }
    })
    return checkSize
  }

  const onChangeColorVarient = (color: string) => {
    let filterBothStyle = product_variants?.find(item => {
      let checkItemColor = false
      let checkItemSize = false
      item.attribute_values?.forEach((el) => {
        if (el.variant_attribute?.attribute_name == "Color" && color == el.value.toLocaleLowerCase()) {
          checkItemColor = true
        }
      })
      item.attribute_values?.forEach((el) => {
        if (el.variant_attribute?.attribute_name == "Size" && checkCurrentSize() == el.value) {
          checkItemSize = true
        }
      })
      return checkItemColor && checkItemSize
    })

    if (filterBothStyle) {
      dispatch(changeCurrentVarient(filterBothStyle))
    } else {
      let filterColorOnly = product_variants?.find(item => {
        let checkItemColor = false
        item.attribute_values?.forEach((el) => {
          if (el.variant_attribute?.attribute_name == "Color" && color == el.value.toLocaleLowerCase()) {
            checkItemColor = true
          }
        })
        return checkItemColor
      })
      if (filterColorOnly) {
        dispatch(changeCurrentVarient(filterColorOnly))
      }
    }
  }

  const onChangeSizeVarient = (size: string) => {
    let filterBothStyle = product_variants?.find(item => {
      let checkItemColor = false
      let checkItemSize = false
      item.attribute_values?.forEach((el) => {
        if (el.variant_attribute?.attribute_name == "Color" && checkCurrentColor() == el.value.toLocaleLowerCase()) {
          checkItemColor = true
        }
      })
      item.attribute_values?.forEach((el) => {
        if (el.variant_attribute?.attribute_name == "Size" && size == el.value) {
          checkItemSize = true
        }
      })
      return checkItemColor && checkItemSize
    })

    if (filterBothStyle) {
      dispatch(changeCurrentVarient(filterBothStyle))
    } else {
      let filterSizeOnly = product_variants?.find(item => {
        let checkItemSize = false
        item.attribute_values?.forEach((el) => {
          if (el.variant_attribute?.attribute_name == "Size" && size == el.value.toLocaleLowerCase()) {
            checkItemSize = true
          }
        })
        return checkItemSize
      })
      if (filterSizeOnly) {
        dispatch(changeCurrentVarient(filterSizeOnly))
      }
    }
  }

  const checkVarientInCart = (): CartItem | null => {
    if (cartDetails.length) {
      let hasInCart = cartDetails.find(el => {
        return el.product_id === currentVarient?.product_id && el.variant_id === currentVarient?.id
      })
      return hasInCart || null
    }
    return null
  }

  const inCartVarient = checkVarientInCart()

  console.log("varientFromCart", inCartVarient);

  const handleCartItemChanges = async (type: string) => {
    try {
      let newQuantity = 0
      if (type == "decrement" && inCartVarient?.quantity == 0) {
        return 
      }
      if (type == "decrement") {
        newQuantity = inCartVarient?.quantity == 1 ? 0 : -1
      }
      if (type == "increment") {
        newQuantity = 1
      }
      

      if (newQuantity == 0) {
        await deletefromCart({ user_id: user.id, product_id: quickViewProduct?.id, variant_id: currentVarient?.id }).unwrap();
      } else {
        const addToCartDetails = { "user_id": user.id, products: [{ "product_id": quickViewProduct?.id, "variant_id": currentVarient?.id, "price": currentVarient?.price, "quantity": newQuantity }] }

        await addToCart(addToCartDetails).unwrap();
      }



      handleFetchCart()

    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }



  return (
    <div>
      <Description className='!mb-2.5' />
      {
        product_variants &&
        <>
          {
            !!colorVarientFilter(product_variants)?.length &&
            <div className="flex items-center mb-5">
              <Label text="Color" />
              <ColorVariants variants={colorVarientFilter(product_variants)} currenValue={checkCurrentColor()?.toLowerCase()} onChangeColorVarient={onChangeColorVarient} />
            </div>
          }
          {
            !!sizeVarientFilter(product_variants)?.length &&
            <div className="flex items-center mb-5">
              <Label text="Size" />
              <SizeVariants options={sizeVarientFilter(product_variants)} label="Select a size" currenValue={checkCurrentSize()?.toLowerCase()} onChangeSizeVarient={onChangeSizeVarient} />
            </div>
          }
        </>
      }

      <div className="flex items-center">
        <Label text="Qty" />
        <NumberInput value={inCartVarient?.quantity || 0} onChange={handleCartItemChanges} />
      </div>
      <Actions isModal={isModal} />
      <CategoryWithIcons isModal={isModal} />
    </div>
  );
};

export default ProductDetailsColumn;
