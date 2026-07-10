import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const Slide = ({ children, slidesToShow = 5 }) => {
  return (
    <div className="flex justify-center py-24">
      <div className="max-w-[1400px] w-full px-4">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={slidesToShow}
        >
          {React.Children.map(children, (child, index) => (
            <SwiperSlide key={index}>
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slide;