'use client';

import { useState, useEffect } from "react";
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
      setSwiperParams({ slidesPerView, centeredSlides, spaceBetween });
    };

    // Set initial parameters
    handleResize();

    // Add event listener for future resizes (optional, Swiper often handles this internally with breakpoints)
    // window.addEventListener('resize', handleResize);
    // return () => {
    //   window.removeEventListener('resize', handleResize);
    // };

  }, []); // Empty dependency array means this effect runs only once after the initial render

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
        // Consider using Swiper's built-in breakpoints for better responsiveness
        // breakpoints={{
        //   768: {
        //     slidesPerView: 3,
        //     spaceBetween: 35,
        //     centeredSlides: false,
        //   },
        //   1024: {
        //     slidesPerView: 4,
        //     spaceBetween: 65,
        //     centeredSlides: false,
        //   },
        // }}
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
          </SwperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsCarousel;