'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import type { ProductTypeList } from "@/types";

import ProductItem from "@/components/product-item";

type ProductsCarouselType = {
  products: ProductTypeList[];
};

const ProductsCarousel = ({ products }: ProductsCarouselType) => {
  const [swiperSettings, setSwiperSettings] = useState({
    slidesPerView: 1.3,
    centeredSlides: true,
    spaceBetween: 30,
  });

  useEffect(() => {
    const handleResize = () => {
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

      setSwiperSettings({
        slidesPerView,
        centeredSlides,
        spaceBetween,
      });
    };

    handleResize(); // Set initial settings

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!products) return null; // Or render a loading state appropriate for client component

  return (
    <div className="products-carousel">
      <Swiper
        spaceBetween={swiperSettings.spaceBetween}
        loop
        centeredSlides={swiperSettings.centeredSlides}
        watchOverflow
        slidesPerView={swiperSettings.slidesPerView}
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
              images={item.images}
            />
          </SwperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsCarousel;