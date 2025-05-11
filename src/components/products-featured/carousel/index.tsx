'use client';

import { Swiper, SwiperSlide } from "swiper/react";

import type { ProductTypeList } from "@/types";

import ProductItem from "@/components/product-item";

const swiperBreakpoints = {
  320: {
    slidesPerView: 1.3,
    spaceBetween: 30,
    centeredSlides: true,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 35,
    centeredSlides: false,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 65,
    centeredSlides: false,
  },
};


type ProductsCarouselType = {
  products: ProductTypeList[];
};

const ProductsCarousel = ({ products }: ProductsCarouselType) => {
  if (!products) return <div>Loading</div>;

  return (
    <div className="products-carousel">
      <Swiper
        breakpoints={swiperBreakpoints}
        loop
        watchOverflow
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