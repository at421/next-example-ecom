'use client';

import { useState, useEffect } from "react";
// import Swiper core and required components
import { Swiper, SwiperSlide } from "swiper/react";

import type { ProductTypeList } from "@/types";

import ProductItem from "@/components/product-item";

type ProductsCarouselType = {
  products: ProductTypeList[];
};

const ProductsCarousel = ({ products }: ProductsCarouselType) => {
  const [slidesPerView, setSlidesPerView] = useState(1.3);
  const [centeredSlides, setCenteredSlides] = useState(true);
  const [spaceBetween, setSpaceBetween] = useState(30);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 768) {
        setSlidesPerView(3);
        setSpaceBetween(35);
        setCenteredSlides(false);
      }
      if (window.innerWidth > 1024) {
        setSlidesPerView(4);
        setSpaceBetween(65);
        setCenteredSlides(false);
      }
    }
  }, []);


  if (!products) return <div>Loading</div>; // Consider a skeleton loader here

  return (
    <div className="products-carousel">
      <Swiper
        spaceBetween={spaceBetween}
        loop
        centeredSlides={centeredSlides}
        watchOverflow
        slidesPerView={slidesPerView}
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
              key={item.id} // Key should be on the SwiperSlide, not ProductItem
              images={item.images}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsCarousel;