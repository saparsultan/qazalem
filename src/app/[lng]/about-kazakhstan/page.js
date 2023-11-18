import AboutCountryClient from "@/components/client/Information/AboutCountry.client";

const AboutKazakhstan = ({ params: { lng } }) => {
  return (
    <section className="section section--publish about-country__container">
      <div className="container">
        <div className="about-country">
          <h2 className="title title-h2">О Казахстане</h2>
          <AboutCountryClient lng={lng} />
        </div>
      </div>
    </section>
  );
};

export default AboutKazakhstan;
