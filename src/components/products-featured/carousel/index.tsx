'use client';

import { Swiper, SwiperSlide } from "swiper/react";

import type { ProductTypeList } from "@/types";

import ProductItem from "../../product-item";

type ProductsCarouselType = {
  products: ProductTypeList[];
};

const ProductsCarousel = ({ products }: ProductsCarouselType) => {
  if (!products) return <div>Loading</div>;

  return (
    <div className="products-carousel">
      <Swiper
        spaceBetween={30} // Default mobile spaceBetween
        loop
        centeredSlides={true} // Default mobile centeredSlides
        watchOverflow
        slidesPerView={1.3} // Default mobile slidesPerView
        className="swiper-wrapper"
        breakpoints={{
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
          </SwperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsCarousel;