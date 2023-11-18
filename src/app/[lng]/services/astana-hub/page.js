import AstanaHubClient from "@/components/client/Services/AstanaHub.client";
import BackLink from "@/components/client/BackLink";
export default function AstanaHub({ params: { lng } }) {
  return (
    <section className="section section--publish services-page__container">
      <div className="container">
        <div className="services-page">
          <div className="services-page__head">
            <BackLink lng={lng} small />
            <h2 className="title text-low title-h2 services-page__title">
              Astana Hub
            </h2>
          </div>
          <AstanaHubClient lng={lng} />
        </div>
      </div>
    </section>
  );
}
