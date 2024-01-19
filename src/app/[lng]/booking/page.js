import BookingClient from "@/components/client/Information/Booking.client";
import BackLink from "@/components/client/BackLink";
import { useTranslation } from "@/app/i18n";

export default async function Booking({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <div>
      <section className="section section--publish booking__container">
        <div className="container container-content">
          <div className="services-page__head">
            <BackLink lng={lng} small />
            <h2 className="title text-low title-left title-h2 booking__title publish__title">
              {t("titleBooking")}
            </h2>
          </div>
          <BookingClient lng={lng} />
        </div>
      </section>
    </div>
  );
}
