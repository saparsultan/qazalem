import Image from "next/image";
import { useTranslation } from "@/app/i18n";
import SliderMain from "@/components/client/Home/SliderMain";
import SliderInfo from "@/components/client/Home/SliderInfo";
import Services from "@/components/client/Home/Services";
import Booking from "@/components/client/Home/Booking";
import BannerBlock from "@/components/server/BannerBlock";
import BannerLink from "@/components/server/BannerLink";
import WorldNews from "@/components/client/Home/WorldNews";
import Partners from "@/components/client/Home/Partners";
import OriginCountryNews from "@/components/client/Home/OriginCountryNews";
import InterviewHome from "@/components/client/Home/Interview";
import Youtube from "@/components/client/Home/Youtube";
import MapGeo from "@/components/client/Home/MapGeo";
import HelpfulInformation from "@/components/client/Home/HelpfulInformation";
import OurProjects from "@/components/client/Home/OurProjects";
import youtubeIcon from "@/assets/img/icons/youtube.svg";

export default async function Home({ params: { lng } }) {
  const { t } = await useTranslation(lng, "home");
  return (
    <div className="main">
      <SliderMain lng={lng} />
      <SliderInfo lng={lng} />
      <section id="services" className="section company-list__container">
        <div className="container">
          <div className="company-list">
            <h2 className="title title-h2 company-list__title">
              <div dangerouslySetInnerHTML={{ __html: t("servicesHome") }} />
            </h2>
            <Services lng={lng} />
          </div>
        </div>
      </section>
      <section className="section embassy__container">
        <div className="container">
          <div className="embassy">
            <h2 className="title title-h2">{t("bookingConsul")}</h2>
            <Booking slidesPerView={1} lng={lng} />
          </div>
        </div>
      </section>

      <section className="section our-projects__container">
        <div className="container">
          <div className="our-projects">
            <h2 className="title title-h2 our-projects__title">
              {t("ourProjects")}
            </h2>
            <OurProjects lng={lng} />
          </div>
        </div>
      </section>

      {/*<section className="section projects-home__container">*/}
      {/*  <div className="container">*/}
      {/*    <div className="projects-home">*/}
      {/*      <h2 className="title title-h2 projects-home__title">Проекты</h2>*/}
      {/*      <ProjectsHome />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      <section className="section interview__container">
        <div className="container">
          <div className="interview">
            <h2 className="title title-h2 interview__title">
              {t("interview")}
            </h2>
            <InterviewHome lng={lng} />
          </div>
        </div>
      </section>

      <section className="section map-geo__container">
        <div className="container">
          <div className="map-geo">
            <h2 className="title title-h2 map-geo__title">{t("compatriot")}</h2>
            <MapGeo lng={lng} />
          </div>
        </div>
      </section>

      <section className="section helpful-home__container">
        <div className="container">
          <div className="helpful-home">
            <h2 className="title title-h2 helpful-home__title">
              {t("helpfulInformation")}
            </h2>
            <HelpfulInformation slidesPerView={2} lng={lng} />
          </div>
        </div>
      </section>
      <BannerLink lng={lng} />
      <section className="section video__container">
        <div className="container">
          <div className="video">
            <h2 className="title title-h2 video__title">
              QAZALEM{" "}
              <Image
                src={youtubeIcon}
                alt="video-icon"
                className="video__title-icon"
              />{" "}
              CHANNEL
            </h2>
            <Youtube lng={lng} />
          </div>
        </div>
      </section>
      <section className="section world-news-home__container">
        <div className="container">
          <div className="world-news-home">
            <h2 className="title title-h2 world-news-home__title">
              {t("worldEvents")}
            </h2>
            <div className="world-news-home__content">
              <WorldNews lng={lng} />
            </div>
          </div>
        </div>
      </section>
      <section className="section news-home__container">
        <div className="container">
          <div className="news-home">
            <h2 className="title title-h2 news-home__title">
              {t("newsKazakhstan")}
            </h2>
            <div className="news-home__content">
              <OriginCountryNews lng={lng} />
            </div>
          </div>
        </div>
      </section>
      <section className="section partners__container">
        <div className="container container--banner">
          <div className="partners">
            <h2 className="title title-h2 partners__title">
              {t("ourPartners")}
            </h2>
            <Partners />
          </div>
        </div>
      </section>
      <BannerBlock lng={lng} />
    </div>
  );
}
