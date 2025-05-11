'use client';

import { useEffect, useState } from 'react';
// import Swiper core and required components
import { Swiper, SwiperSlide } from "swiper/react";

import type { ProductTypeList } from "@/types";

import ProductItem from "@/components/product-item";

type ProductsCarouselType = {
  products: ProductTypeList[];
};

const ProductsCarousel = ({ products }: ProductsCarouselType) => {
  const [swiperParams, setSwiperParams] = useState({
    slidesPerView: 1.3,
    centeredSlides: true,
    spaceBetween: 30,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let slidesPerView = 1.3;
      let centeredSlides = true;
      let spaceBetween = 30;

      if (window.innerWidth > 768) {
        slidesPerView = 3;
        spaceBetween = 35;
        centeredSlides = false;
      }
      if (window.innerWidth > 1024) {
        slidesPerView = 4;
        spaceBetween = 65;
        centeredSlides = false;
      }
      setSwiperParams({ slidesPerView, spaceBetween, centeredSlides });
    }
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (!products) return <div>Loading</div>;

  return (
    <div className="products-carousel">
      <Swiper
        spaceBetween={swiperParams.spaceBetween}
        loop
        centeredSlides={swiperParams.centeredSlides}
        watchOverflow
        slidesPerView={swiperParams.slidesPerView}
        className="swiper-wrapper"
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductItem
              id={item.id}
              name={item.name}
              price={item.price}
              color={item.color}
              discount={item.discount}
              currentPrice={item.currentPrice}
              key={item.id} // Redundant key here, already on SwiperSlide
              images={item.images}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsCarousel;