import * as dayjs from "dayjs";
import kk from "dayjs/locale/kk";
import ru from "dayjs/locale/ru";
import en from "dayjs/locale/en";
import zh from "dayjs/locale/zh";
import { useTranslation } from "@/app/i18n/client";

export const RedableFormat = ({ date, lng, format }) => {
  const lngDateFunc = () => {
    switch (lng) {
      case "ru":
        return ru;
      case "kk":
        return kk;
      case "en":
        return en;
      case "cn":
        return zh;
      default:
        return kk;
    }
  };
  const lngDate = lngDateFunc();
  return date ? dayjs(new Date(date)).locale(lngDate).format(format) : null;
};
export const RedableFormatExactly = ({ date, lng }) => {
  const { t } = useTranslation(lng, "layout");
  const lngDateFunc = () => {
    switch (lng) {
      case "ru":
        return ru;
      case "kk":
        return kk;
      case "en":
        return en;
      case "cn":
        return zh;
      default:
        return kk;
    }
  };
  const lngDate = lngDateFunc();

  function formatDate(dateString) {
    const date = dayjs(new Date(dateString)).locale(lngDate);
    const now = dayjs();

    if (date.isSame(now, "day")) {
      return `${t("today")}, ${date.format("HH:mm")}`;
    } else if (date.isSame(now.subtract(1, "day"), "day")) {
      return `${t("yesterday")}, ${date.format("HH:mm")}`;
    } else if (date.isBefore(now.subtract(1, "year"))) {
      return date.format("D MMMM YYYY, HH:mm");
    } else {
      return date.format("D MMMM, HH:mm");
    }
  }

  const formattedDate = formatDate(date);
  return date ? formattedDate : null;
};
