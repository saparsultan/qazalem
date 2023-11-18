import AboutCountryPageClient from "@/components/client/Information/AboutCountryPage.client";

export default async function AboutCountryPage({ params: { lng } }) {
  return (
    <section className="section section--publish about-country-page__container">
      <div className="container">
        <div className="about-country-page">
          <AboutCountryPageClient lng={lng} />
        </div>
      </div>
    </section>
  );
}
