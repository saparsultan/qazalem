"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import embassy1 from "@/assets/img/embassy1.jpeg";
import { useQuery } from "@tanstack/react-query";
import InformationService from "@/services/InformationService";
import { LINK_URLS } from "@/utils/constants";

// Import Swiper styles

// import required modules

const HelpfulInformation = ({ slidesPerView, lng }) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["sosCountry"],
    queryFn: async () => {
      const { data } = await InformationService.getHelpfulInformationCategory(
        lng,
        5,
      );
      return data;
    },
    staleTime: Infinity,
  });

  return (
    <Swiper
      breakpoints={{
        396: {
          slidesPerView: 2,
          spaceBetween: 14,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
        },
        1236: {
          slidesPerView: 6,
        },
      }}
      slidesPerView={slidesPerView}
      spaceBetween={14}
      navigation={true}
      modules={[Navigation]}
      className="grid-slider  custom-swiper"
    >
      {!isLoading &&
        isSuccess &&
        data.map(({ id, name, image }) => {
          return (
            <SwiperSlide key={id} className="grid-slider__slide">
              <Link
                href={`/${lng}/${LINK_URLS.usefulInformation}/${id}`}
                className="grid-slider__item"
              >
                <Image
                  quality={50}
                  className="grid-slider__bg"
                  src={image}
                  alt={name}
                  fill
                  cover="true"
                  center="true"
                />
                <div className="grid-slider__content">
                  <h4 className="title-h4 grid-slider__title">{name}</h4>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default HelpfulInformation;
