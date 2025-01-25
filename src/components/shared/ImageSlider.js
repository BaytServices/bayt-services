"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function ImageSlider({ images }) {
    // Show a single image without a slider if only one image is provided
    if (images.length === 1) {
        return (
            <div className="single-image">
                <img src={images[0]} alt="Service Image" className="single-image-element" />
            </div>
        );
    }

    // Use Swiper slider if multiple images exist
    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation={true}
            loop={true}
            modules={[Navigation]}
            className="image-slider"
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <img src={image} alt={`Slide ${index + 1}`} className="slider-image" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
