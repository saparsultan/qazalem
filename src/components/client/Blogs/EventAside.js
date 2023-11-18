"use client";
import { RedableFormat } from "@/utils/dayjs";
import { useTranslation } from "@/app/i18n/client";

const EventAside = ({ lng, startDate, endDate }) => {
  const { t } = useTranslation(lng, "default");
  return (
    <aside className="publdet-aside">
      <ul className="list-reset event-date-list">
        <li className="event-date-list__item">
          <small>{t("startDate")}</small>
          <div className="event-date-list__text">
            <RedableFormat date={startDate} lng={lng} format="D MMMM YYYY" />
          </div>
        </li>
        <li className="event-date-list__item">
          <small>{t("endDate")}</small>
          <div className="event-date-list__text">
            <RedableFormat date={endDate} lng={lng} format="D MMMM YYYY" />
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default EventAside;
