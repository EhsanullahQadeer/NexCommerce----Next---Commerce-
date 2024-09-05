'use client';

import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import GalleryModal from "@/features/elements/GalleryModal";
import PreviewModal from "@/features/elements/PreviewModal";
import ProductDetails from "@/features/product-details";
import StickyBarBottom from "@/features/product-details/StickyBarBottom";
import { addQuickViewProduct, selectProducts } from "@/store/slices/products/productsSlice";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailPage = () => {
  const dispatch = useDispatch()
  const { slug } = useParams<{ slug: string }>();
  const { products } = useSelector(selectProducts)

  const productData = products.find(el => el.slug == slug)




  useEffect(() => {
    if(productData){
      dispatch(addQuickViewProduct(productData))
    }

  }, [productData])


  const links = [
    {
      url: '/',
      name: 'Home',
    },
    {
      url: '/products',
      name: 'products',
    },
    {
      url: '/default',
      name: 'Product Details',
    }
  ]



  return (
    <div>
      {
        productData ? <>
          <Container>
            <Breadcrumb links={links} border="top" />
          </Container>

          <ProductDetails  productData={productData} />
          <StickyBarBottom />

          <PreviewModal />
          <GalleryModal />
        </>
        : <h1>Loading...</h1>
      }

    </div>
  )
}

export default ProductDetailPage;
