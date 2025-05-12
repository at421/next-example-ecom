'use client';

// import Swiper core and required components
import { Swiper, SwiperSlide } from "swiper/react";

import type { ProductTypeList } from "@/types";

import ProductItem from "../../product-item";

let slidesPerView = 1.3;
let centeredSlides = true;
let spaceBetween = 30;

// Note: process.browser is deprecated.
// In the app router, window is available in 'use client' components after hydration.
// This logic might cause hydration mismatches as it runs differently server/client.
// A more robust solution would use state and useEffect.
if (typeof window !== 'undefined' && window.innerWidth > 768) {
  slidesPerView = 3;
  spaceBetween = 35;
  centeredSlides = false;
}
if (typeof window !== 'undefined' && window.innerWidth > 1024) {
  slidesPerView = 4;
  spaceBetween = 65;
  centeredSlides = false;
}


type ProductsCarouselType = {
  products: ProductTypeList[];
};

const ProductsCarousel = ({ products }: ProductsCarouselType) => {
  if (!products) return <div>Loading</div>;

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