"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import embassy1 from "@/assets/img/embassy1.jpeg";

// Import Swiper styles

// import required modules

const SliderEmbassy = ({ slidesPerView }) => {
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={20}
      navigation={true}
      modules={[Navigation]}
      className="grid-slider"
    >
      <SwiperSlide className="grid-slider__slide">
        <Link href="/" className="grid-slider__item">
          <Image
            className="grid-slider__bg"
            src={embassy1}
            alt="embassy 1"
            fill
            cover="true"
            center="true"
          />
          <div className="grid-slider__content">
            <h4 className="title-h4 grid-slider__title">НЬЮ-ЙОРК</h4>
            <div className="grid-slider__desc">США</div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide className="grid-slider__slide">
        {" "}
        <Link href="/" className="grid-slider__item">
          <Image
            className="grid-slider__bg"
            src={embassy1}
            alt="embassy 2"
            fill
            cover="true"
            center="true"
          />
          <div className="grid-slider__content">
            <h4 className="title-h4 grid-slider__title">НЬЮ-ЙОРК</h4>
            <div className="grid-slider__desc">США</div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide className="grid-slider__slide">
        {" "}
        <Link href="/" className="grid-slider__item">
          <Image
            className="grid-slider__bg"
            src={embassy1}
            alt="embassy 3"
            fill
            cover="true"
            center="true"
          />
          <div className="grid-slider__content">
            <h4 className="title-h4 grid-slider__title">НЬЮ-ЙОРК</h4>
            <div className="grid-slider__desc">США</div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide className="grid-slider__slide">
        {" "}
        <Link href="/" className="grid-slider__item">
          <Image
            className="grid-slider__bg"
            src={embassy1}
            alt="embassy 4"
            fill
            cover="true"
            center="true"
          />
          <div className="grid-slider__content">
            <h4 className="title-h4 grid-slider__title">НЬЮ-ЙОРК</h4>
            <div className="grid-slider__desc">США</div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide className="grid-slider__slide">
        {" "}
        <Link href="/" className="grid-slider__item">
          <Image
            className="grid-slider__bg"
            src={embassy1}
            alt="embassy 5"
            fill
            cover="true"
            center="true"
          />
          <div className="grid-slider__content">
            <h4 className="title-h4 grid-slider__title">НЬЮ-ЙОРК</h4>
            <div className="grid-slider__desc">США</div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide className="grid-slider__slide">
        {" "}
        <Link href="/" className="grid-slider__item">
          <Image
            className="grid-slider__bg"
            src={embassy1}
            alt="embassy 6"
            fill
            cover="true"
            center="true"
          />
          <div className="grid-slider__content">
            <h4 className="title-h4 grid-slider__title">НЬЮ-ЙОРК</h4>
            <div className="grid-slider__desc">США</div>
          </div>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};

export default SliderEmbassy;
