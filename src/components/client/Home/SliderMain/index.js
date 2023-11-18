"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Parallax } from "swiper/modules";
import { useTranslation } from "@/app/i18n/client";
import HomeService from "@/services/HomeServices";
import { LINK_URLS } from "@/utils/constants";
import Social from "@/components/layout/Social";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCreative } from "swiper/modules";

const SliderMain = ({ lng }) => {
  const { t } = useTranslation(lng, "home");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["sliderMainList"],
    queryFn: async () => {
      const { data } = await HomeService.getSliderMain(lng, 5);
      return data;
    },
  });

  const socilalList = useQuery({
    queryKey: ["socialListHeader"],
    queryFn: async () => {
      const { data } = await HomeService.getSocial(null);
      return data;
    },
  });

  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        speed={600}
        parallax={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, Parallax]}
        className="mySwiper main-slider"
      >
        {!isLoading && isSuccess && data && data?.length ? (
          data.map(({ id, events, image, text, title_slider }) => {
            return (
              <SwiperSlide key={id} className="main-slider__item">
                <div className="main-slider__content container">
                  <h2 className="main-slider__title">{title_slider}</h2>
                  <div className="main-slider__desc">{text}</div>
                  <div className="main-slider__btns">
                    <Link
                      href={`/${lng}/${LINK_URLS.events}/${events?.id}`}
                      className="btn btn-link btn-ligth bold main-slider__link"
                    >
                      {t("learnMore")}
                    </Link>
                  </div>
                  <Social data={socilalList} />
                  <Link
                    href={`/${lng}/${LINK_URLS.events}`}
                    className="main-slider__link-anons"
                  >
                    {t("allEvents")}
                  </Link>
                </div>
                <div className="main-slider__img-wrap">
                  <div className="main-slider__img-opacity"></div>
                  {isClient && (
                    <Image
                      src={image}
                      fill
                      alt={title_slider}
                      className="main-slider__img"
                    />
                  )}
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <SwiperSlide className="main-slider__item">
            <div className="main-slider__content container">
              <Skeleton
                paragraph={{
                  rows: 4,
                }}
              />
              <div className="main-slider__btns"></div>
            </div>
            <div className="main-slider__img-wrap">
              <div className="main-slider__img-opacity"></div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

export default SliderMain;
