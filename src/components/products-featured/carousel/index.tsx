'use client';

import { Swiper, SwiperSlide } from "swiper/react";

import type { ProductTypeList } from "@/types";

import ProductItem from "../../product-item";

type ProductsCarouselType = {
  products: ProductTypeList[] | null; // Allow null as per original check
};

const ProductsCarousel = ({ products }: ProductsCarouselType) => {
  if (!products) return <div>Loading</div>;

  return (
    <div className="products-carousel">
      <Swiper
        loop
        watchOverflow
        className="swiper-wrapper"
        breakpoints={{
          0: { // Default for smaller screens
            slidesPerView: 1.3,
            spaceBetween: 30,
            centeredSlides: true,
          },
          768: { // For screens >= 768px
            slidesPerView: 3,
            spaceBetween: 35,
            centeredSlides: false,
          },
          1024: { // For screens >= 1024px
            slidesPerView: 4,
            spaceBetween: 65,
            centeredSlides: false,
          },
        }}
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