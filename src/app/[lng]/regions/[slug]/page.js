import RegionsPageClient from "@/components/client/Information/RegionsPage.client";

export default async function RegionsPage({ params: { lng } }) {
  return (
    <section className="section section--publish about-country-page__container">
      <div className="container">
        <div className="about-country-page">
          <RegionsPageClient lng={lng} />
        </div>
      </div>
    </section>
  );
}
