import "./CarroselFotos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function CarroselFotos({ total, onChange }) {

    return (

        <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            navigation
            pagination={{clickable: true}}
            onSlideChange={(swiper) => onChange(swiper.activeIndex)}
            className="swiper-controle">

            {Array.from({ length: total }).map((_, index) => (
                <SwiperSlide key={index}>
                    <div style={{ height: "1px" }} />
                </SwiperSlide>
            ))}
            </Swiper>
    );
}

export default CarroselFotos;

