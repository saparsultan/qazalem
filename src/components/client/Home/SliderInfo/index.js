"use client";
import { useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import SliderInfoItem from "@/components/client/Home/SliderInfo/Item";
import { LINK_URLS } from "@/utils/constants";
import sliderInfo1 from "@/assets/img/about-country.jpeg";
import sliderInfo2 from "@/assets/img/regions.jpg";
import sliderInfo3 from "@/assets/img/candas.jpg";
import metaalem from "@/assets/img/metaalem.jpg";

const SliderInfo = ({ lng }) => {
  const { t } = useTranslation(lng, "home");
  const [sliderInfoActive, setSiderInfoActive] = useState(0);
  const handleOnHover = (id) => {
    setSiderInfoActive(id);
  };

  return (
    <section className="section slider-info__container">
      <div className="container">
        <div className="slider-info">
          <SliderInfoItem
            lng={lng}
            id={0}
            title={t("aboutKazakhstan")}
            image={sliderInfo1}
            alt={t("aboutKazakhstan")}
            link={`/${lng}/${LINK_URLS.aboutKazakhstan}`}
            sliderInfoActive={sliderInfoActive}
            handleOnHover={handleOnHover}
          />
          <SliderInfoItem
            lng={lng}
            id={1}
            title={t("regions")}
            image={sliderInfo2}
            alt={t("regions")}
            link={`/${lng}/${LINK_URLS.regions}`}
            sliderInfoActive={sliderInfoActive}
            handleOnHover={handleOnHover}
          />
          <SliderInfoItem
            lng={lng}
            id={2}
            title={t("infoCandasSupport")}
            image={sliderInfo3}
            alt={t("infoCandasSupport")}
            link={`/${lng}/${LINK_URLS.faq}`}
            sliderInfoActive={sliderInfoActive}
            handleOnHover={handleOnHover}
          />
          <SliderInfoItem
            lng={lng}
            id={3}
            title="Meta Alem"
            image={metaalem}
            alt="Meta Alem"
            link="https://alem.amadao.network/"
            sliderInfoActive={sliderInfoActive}
            handleOnHover={handleOnHover}
          />
        </div>
      </div>
    </section>
  );
};

export default SliderInfo;
