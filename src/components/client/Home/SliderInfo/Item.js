"use client";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";
import { useTranslation } from "@/app/i18n/client";
export default function SliderInfoItem({
  lng,
  id,
  title,
  image,
  alt,
  link,
  sliderInfoActive,
  handleOnHover,
}) {
  const { t } = useTranslation(lng, "home");
  return (
    <div
      className={cx("slider-info__item", {
        active: sliderInfoActive === id,
      })}
      onMouseEnter={() => handleOnHover(id)}
    >
      <Image
        className="slider-info__bg"
        src={image}
        fill
        cover="true"
        center="true"
        alt={alt}
      />
      <div className="slider-info__content">
        <div
          dangerouslySetInnerHTML={{
            __html: title,
          }}
          className="slider-info__desc ex-bold"
        ></div>
        <Link
          href={link}
          className="btn btn-accent btn-link btn-ligth sm-bold slider-info__link"
        >
          {t("learnMore")}
        </Link>
      </div>
    </div>
  );
}
