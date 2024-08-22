"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import RelatedPosts from "@/features/blog-detail/RelatedPosts";
import GalleryModal from "@/features/elements/GalleryModal";
import PreviewModal from "@/features/elements/PreviewModal";
import ProductDetails from "@/features/product-details";
import ProductSlider from "@/features/product-details/ProductSlider";
import StickyBarBottom from "@/features/product-details/StickyBarBottom";
import Image from "next/image";
import Link from "next/link";

const ProductDetailPage = () => {
  const links = [
    {
      url: "/",
      name: "Home",
    },
    {
      url: "/products",
      name: "products",
    },
    {
      url: "/default",
      name: "Default",
    },
  ];
  return (
    <div>
      <Container>
        <Hero title="Blogs" subTitle="Single Post" />
        <Breadcrumb links={links} border="top" />
        <hr />
        <article className="mt-8">
          <Image
            fill
            src="/categories/post-1.jpg"
            alt="Blog image"
            className="!relative w-full height-auto"
          />
          <div className="flex items-center divide-x-2 mt-6 mb-3">
            <span className="text-sm font-extralight text-gray-400 pr-4">
              by{" "}
              <Link
                href="#"
                className="text-sm font-extralight text-black-50 hover:text-primary inline-flex hover:shadow-[0_0.07rem_0_0_#cc9966]"
              >
                John Doe
              </Link>
            </span>
            <Link
              href="#"
              className="text-sm font-extralight text-black-50 hover:text-primary inline-flex hover:shadow-[0_0.07rem_0_0_#cc9966] px-4"
            >
              Nov 22, 2018
            </Link>
          </div>
          <span className="text-2xl font-semibold">
            Cras ornare tristique elit.{" "}
          </span>
          <div className="flex items-center divide-x-2 my-2">
            <span className="text-sm font-extralight text-gray-400 pr-4">
              in{" "}
              <Link
                href="#"
                className="text-sm font-extralight text-black-50 hover:text-primary inline-flex hover:shadow-[0_0.07rem_0_0_#cc9966]"
              >
                Lifestyle
              </Link>
              ,{" "}
              <Link
                href="#"
                className="text-sm font-extralight text-black-50 hover:text-primary inline-flex hover:shadow-[0_0.07rem_0_0_#cc9966]"
              >
                Shopping
              </Link>
            </span>
          </div>
          <div className="flex flex-col gap-y-6">
            <p className="text-sm font-extralight">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
              neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium,
              ligula sollicitudin laoreet viverra, tortor libero sodales leo,
              eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo.
              Suspendisse potenti.
            </p>
            <p className="text-sm font-extralight">
              Sed egestas, ante et vulputate volutpat, eros pede semper est,
              vitae luctus metus libero eu augue. Morbi purus libero, faucibus
              adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent
              elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum
              volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu
              pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu,
              fermentum et, dapibus sed, urna.
            </p>
            <span className="flex gap-x-8">
              <Image
                fill
                src="/categories/post-2.jpg"
                alt="Blog image"
                className="!relative w-full height-auto"
              />
              <span className="flex flex-col gap-y-4">
                <span className="text-2xl">Quisque volutpat mattiseros.</span>
                <ul className="flex flex-col gap-y-6 list-disc ml-4">
                  <li className="text-sm font-extralight">
                    Sed pretium, ligula sollicitudin laoreet viverra, tortor
                    libero sodales leo, eget blandit nunc tortor eu nibh. Nullam
                    mollis. Ut justo. Suspendisse potenti.
                  </li>
                  <li className="text-sm font-extralight">
                    Sed egestas, ante et vulputate volutpat, eros pede semper
                    est, vitae luctus metus libero eu augue. Morbi purus libero,
                    faucibus adipiscing, commodo quis, gravida id, est.
                  </li>
                  <li className="text-sm font-extralight">
                    Sed lectus. Praesent elementum hendrerit tortor. Sed semper
                    lorem at felis. Vestibulum volutpat, lacus a ultrices
                    sagittis, mi neque euismod dui, eu pulvinar nunc sapien
                    ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et,
                    dapibus sed, urna.
                  </li>
                </ul>
              </span>
            </span>

            <p className="text-sm font-extralight">
              Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
              neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium,
              ligula sollicitudin laoreet viverra, tortor libero sodales leo,
              eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo.
              Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros
              pede semper est, vitae luctus metus libero eu augue. Morbi purus
              libero, faucibus adipiscing, commodo quis, gravida id, est. Sed
              lectus. Praesent elementum hendrerit tortor. Sed semper lorem at
              felis.
            </p>

            <blockquote className="bg-[#fafafa] border-l border-primary p-6">
              <i className="las la-quote-right text-gray-400 text-[2rem]"></i>
              <p className="text-sm font-extralight">
                “ Sed egestas, ante et vulputate volutpat, eros pede semper est,
                vitae luctus metus libero eu augue. ”
              </p>
            </blockquote>

            <p className="text-sm font-extralight">
              Morbi purus libero, faucibus adipiscing, commodo quis, gravida id,
              est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper
              lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi
              neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus
              pede arcu, dapibus eu, fermentum et, dapibus sed, urna. Morbi
              interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a
              ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis
              libero dolor a purus.
            </p>

            <div>
              <span className="text-2xl">Morbi interdum mollis sapien.</span>
              <Image
                fill
                src="/categories/post-3.jpg"
                alt="Blog image"
                className="!relative w-full height-auto mt-3"
              />
              <p className="text-sm font-extralight mt-3">
                Sed pretium, ligula sollicitudin laoreet viverra, tortor libero
                sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut
                justo. Suspendisse potenti. Sed egestas, ante et vulputate
                volutpat, eros pede semper est, vitae luctus metus libero eu
                augue. Morbi purus libero, faucibus adipiscing, commodo quis,
                gravida id, est. Sed lectus. Praesent elementum hendrerit
                tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a
                ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien
                ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et,
                dapibus sed, urna.
              </p>
            </div>

            <p className="text-sm font-extralight">
              Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia,
              magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae
              facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis,
              adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse
              ac urna. Etiam pellentesque mauris ut lectus. Nunc tellus ante,
              mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede,
              ornare a, lacinia eu, vulputate vel, nisl. Suspendisse mauris.
              Fusce accumsan mollis eros. Pellentesque a diam sit amet mi
              ullamcorper vehicula. Integer adipiscing risus a sem. Nullam quis
              massa sit amet nibh viverra malesuada. Nunc sem lacus, accumsan
              quis, faucibus non, congue vel, arcu.
            </p>

            <div className="flex  flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-x-2 py-2">
                <span className="text-sm font-extralight">Tags:</span>
                <div className="flex items-center gap-x-1">
                  <span className="text-sm font-light border rounded bg-gray-100 px-2.5 py-1">
                    photography
                  </span>
                  <span className="text-sm font-light border rounded bg-gray-100 px-2.5 py-1">
                    style
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-2 py-2">
                <span className="text-sm font-extralight">
                  Share this post:
                </span>
                <div className="flex items-center gap-x-2">
                  <i className="lab la-facebook-f text-[#8f79ed] text-lg"></i>
                  <i className="lab la-twitter text-[#79c8ed] text-lg"></i>
                  <i className="lab la-pinterest text-[#e66262] text-lg"></i>
                  <i className="lab la-linkedin text-[#3399cc] text-lg"></i>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-6 px-8 py-12 bg-gray-50 sm:flex-row sm:items-start sm:justify-center sm:gap-x-6">
              <div className="w-[3rem] h-[3rem] ">
                <Image
                  fill
                  src="/categories/post-1.jpg"
                  alt="Blog image"
                  className="!relative rounded-full"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm font-light">John Doe</span>
                  <div className="transition-all duration-[0.35s] ease">
                    <Link
                      href="#"
                      className="text-sm font-extralight hover:text-primary hover:shadow-[0_0.1rem_0_0_#cc9966] leading-[18px]"
                    >
                      View all posts by John Doe
                      <i className="las la-long-arrow-alt-right ml-2.5"></i>
                    </Link>
                  </div>
                </div>
                <p className="text-sm font-extralight">
                  Praesent dapibus, neque id cursus faucibus, tortor neque
                  egestas auguae, eu vulputate magna eros eu erat. Aliquam erat
                  volutpat.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between py-6 px-4">
              <div className="flex items-center justify-evenly gap-x-6 py-4 self-start">
                <i className="las la-long-arrow-alt-left"></i>
                <div className="flex flex-col">
                  <span className="text-sm text-primary leading-[32px]">
                    Previous Post
                  </span>
                  <Link
                    href="#"
                    className="text-base font-light hover:shadow-[0_0.06rem_0_0_#000000] leading-[18px]"
                  >
                    Cras iaculis ultricies nulla
                  </Link>
                </div>
              </div>
              <div className="w-[1px] h-[80px] bg-gray-300 hidden sm:block" />
              <div className="w-full h-[1px] bg-gray-300 sm:hidden" />
              <div className="flex items-center justify-evenly gap-x-6 py-4 self-end">
                <div className="flex flex-col">
                  <span className="text-sm text-primary leading-[32px]">
                    Next Post
                  </span>
                  <Link
                    href="#"
                    className="text-base font-light hover:shadow-[0_0.06rem_0_0_#000000] leading-[18px]"
                  >
                    Cras iaculis ultricies nulla
                  </Link>
                </div>
                <i className="las la-long-arrow-alt-right"></i>
              </div>
            </div>
            <RelatedPosts />
          </div>
        </article>
      </Container>
    </div>
  );
};

export default ProductDetailPage;
