'use client';

import { Swiper, SwiperSlide } from "swiper/react";

import type { ProductTypeList } from "@/types";

import ProductItem from "../../product-item";

type ProductsCarouselType = {
  products: ProductTypeList[];
};

const ProductsCarousel = ({ products }: ProductsCarouselType) => {
  if (!products) return <div>Loading</div>;

  // Swiper breakpoints configuration to replace window.innerWidth logic
  const breakpoints = {
    // when window width is >= 0px
    0: {
      slidesPerView: 1.3,
      spaceBetween: 30,
      centeredSlides: true,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 3,
      spaceBetween: 35,
      centeredSlides: false,
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 4,
      spaceBetween: 65,
      centeredSlides: false,
    },
  };

  return (
    <div className="products-carousel">
      <Swiper
        loop
        watchOverflow
        breakpoints={breakpoints} // Use breakpoints here
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
              key={item.id}
              images={item.images}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsCarousel;