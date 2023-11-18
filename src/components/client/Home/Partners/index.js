"use client";
import { useQuery } from "@tanstack/react-query";
import HomeService from "@/services/HomeServices";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

const Partners = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["partnersList"],
    queryFn: async () => {
      const { data } = await HomeService.getPartners();
      return data;
    },
  });

  return (
    <Swiper
      slidesPerView="6"
      spaceBetween={20}
      navigation={true}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Navigation, Pagination]}
      className="grid-slider partners-slider"
    >
      {data?.length &&
        !isLoading &&
        isSuccess &&
        data?.map(({ id, image, url, name }) => {
          return (
            <SwiperSlide
              className="grid-slider__slide partners__slide"
              key={id}
            >
              <Link
                href={url}
                target="_blank"
                className="partners__item"
                title={name}
              >
                <Image
                  className="grid-slider__bg partners__img"
                  src={image}
                  alt={name}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  fill
                  center="true"
                />
              </Link>
            </SwiperSlide>
          );
        })}
      <div className="partners-slider__gradient partners-slider__prev"></div>
      <div className="partners-slider__gradient partners-slider__next"></div>
    </Swiper>
  );
};
export default Partners;
