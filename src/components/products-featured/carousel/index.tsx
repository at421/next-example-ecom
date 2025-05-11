'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import type { ProductTypeList } from "@/types";

import ProductItem from "@/components/product-item";

const initialSlidesPerView = 1.3;
const initialCenteredSlides = true;
const initialSpaceBetween = 30;

type ProductsCarouselType = {
  products: ProductTypeList[];
};

const ProductsCarousel = ({ products }: ProductsCarouselType) => {
  const [swiperConfig, setSwiperConfig] = useState({
    slidesPerView: initialSlidesPerView,
    centeredSlides: initialCenteredSlides,
    spaceBetween: initialSpaceBetween,
  });

  useEffect(() => {
    let slidesPerView = initialSlidesPerView;
    let centeredSlides = initialCenteredSlides;
    let spaceBetween = initialSpaceBetween;

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
    setSwiperConfig({ slidesPerView, centeredSlides, spaceBetween });

  }, []);

  if (!products) return <div>Loading</div>;

  return (
    <div className="products-carousel">
      <Swiper
        spaceBetween={swiperConfig.spaceBetween}
        loop
        centeredSlides={swiperConfig.centeredSlides}
        watchOverflow
        slidesPerView={swiperConfig.slidesPerView}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsCarousel;