import AboutCountryPageSubClient from "@/components/client/Information/AboutCountrySubPage.client";

export default async function AboutCountrySubPage({ params: { lng } }) {
  return (
    <section className="section section--publish about-country-page__container">
      <div className="container">
        <div className="about-country-page">
          <AboutCountryPageSubClient lng={lng} />
        </div>
      </div>
    </section>
  );
};
