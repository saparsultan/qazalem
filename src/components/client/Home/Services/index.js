"use client";
import Link from "next/link";
import Image from "next/image";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Skeleton } from "antd";
import { useTranslation } from "@/app/i18n/client";
import { LINK_URLS } from "@/utils/constants";
import "react-tabs/style/react-tabs.scss";
import { useQuery } from "@tanstack/react-query";
import HomeService from "@/services/HomeServices";

const ServicesHome = ({ lng }) => {
  const dataTourism = useQuery({
    queryKey: ["kazakhTourismPreview"],
    queryFn: async () => {
      const { data } = await HomeService.getKazakhTourismPreview(lng);
      return data;
    },
  });

  const dataInvest = useQuery({
    queryKey: ["kazakhInvestPreview"],
    queryFn: async () => {
      const { data } = await HomeService.getKazakhInvestPreview(lng);
      return data;
    },
  });

  const dataAlemMeta = useQuery({
    queryKey: ["alemMetaPreview"],
    queryFn: async () => {
      const { data } = await HomeService.getAlemMetaPreview(lng);
      return data;
    },
  });

  const dataQazTrade = useQuery({
    queryKey: ["qazTradePreview"],
    queryFn: async () => {
      const { data } = await HomeService.getQazTradePreview(lng);
      return data;
    },
  });

  const dataAstanaHub = useQuery({
    queryKey: ["astanaHubPreview"],
    queryFn: async () => {
      const { data } = await HomeService.getAstanaHubPreview(lng);
      return data;
    },
  });

  const { t } = useTranslation(lng, "home");
  return (
    <div className="company-list__content">
      <Tabs className="company-list__tabs-wrap">
        <TabList className="tab-list__tabs">
          <Tab className="tab-list__tab">Kazakh Tourism</Tab>
          <Tab className="tab-list__tab">Kazakh Invest</Tab>
          <Tab className="tab-list__tab">Alem Metaverse</Tab>
          <Tab className="tab-list__tab">QazTrade</Tab>
          {/*<Tab className="tab-list__tab">KazakhExport</Tab>*/}
          {/*<Tab className="tab-list__tab">ВТП Атамекен</Tab>*/}
          <Tab className="tab-list__tab">Astana Hub</Tab>
        </TabList>
        <TabPanel>
          <div className="company-list-content">
            <div className="company-list-content__item">
              <h3 className="title title-h3 company-list-content__title">
                Kazakh Tourism
              </h3>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    !dataTourism.isLoading &&
                    dataTourism.isSuccess &&
                    dataTourism?.data[0]?.description,
                }}
                className="company-list-content__desc"
              ></div>
              <Link
                href={`/${lng}/${LINK_URLS.services}/kazakh-tourism`}
                className="btn btn-link btn-accent company-list-content__link"
              >
                {t("learnMore")}
              </Link>
            </div>
            <div className="company-list-content__item company-list-content__item--img">
              {!dataTourism?.isLoading &&
              dataTourism.isSuccess &&
              dataTourism?.data?.length > 0 ? (
                <Image
                  src={dataTourism?.data[0]?.image}
                  priority
                  width={100}
                  height={100}
                  className="company-list-content__img"
                  alt={`company-list-${dataTourism?.data[0]?.id}`}
                />
              ) : (
                <Skeleton.Image active />
              )}
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="company-list-content">
            <div className="company-list-content__item">
              <h3 className="title title-h3 company-list-content__title">
                Kazakh Invest
              </h3>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    !dataInvest.isLoading &&
                    dataInvest.isSuccess &&
                    dataInvest?.data[0]?.description,
                }}
                className="company-list-content__desc"
              ></div>
              <Link
                href={`/${lng}/${LINK_URLS.services}/kazakh-invest`}
                className="btn btn-link btn-accent company-list-content__link"
              >
                {t("learnMore")}
              </Link>
            </div>
            <div className="company-list-content__item company-list-content__item--img">
              {!dataInvest?.isLoading &&
              dataInvest.isSuccess &&
              dataInvest?.data?.length > 0 ? (
                <Image
                  src={dataInvest?.data[0]?.image}
                  priority
                  width={100}
                  height={100}
                  className="company-list-content__img"
                  alt={`company-list-${dataInvest?.data[0]?.id}`}
                />
              ) : (
                <Skeleton.Image active />
              )}
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="company-list-content">
            <div className="company-list-content__item">
              <h3 className="title title-h3 company-list-content__title">
                Alem Metaverse
              </h3>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    !dataAlemMeta.isLoading &&
                    dataAlemMeta.isSuccess &&
                    dataAlemMeta?.data[0]?.description,
                }}
                className="company-list-content__desc"
              ></div>
              <Link
                href={`/${lng}/${LINK_URLS.services}`}
                className="btn btn-link btn-accent company-list-content__link"
              >
                {t("learnMore")}
              </Link>
            </div>
            <div className="company-list-content__item company-list-content__item--img">
              {!dataAlemMeta?.isLoading &&
              dataAlemMeta.isSuccess &&
              dataAlemMeta?.data?.length > 0 ? (
                <Image
                  src={dataAlemMeta?.data[0]?.image}
                  priority
                  width={100}
                  height={100}
                  className="company-list-content__img"
                  alt={`company-list-${dataAlemMeta?.data[0]?.id}`}
                />
              ) : (
                <Skeleton.Image active />
              )}
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="company-list-content">
            <div className="company-list-content__item">
              <h3 className="title title-h3 company-list-content__title">
                QazTrade
              </h3>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    !dataQazTrade.isLoading &&
                    dataQazTrade.isSuccess &&
                    dataQazTrade?.data[0]?.description,
                }}
                className="company-list-content__desc"
              ></div>
              <Link
                href={`/${lng}/${LINK_URLS.services}`}
                className="btn btn-link btn-accent company-list-content__link"
              >
                {t("learnMore")}
              </Link>
            </div>
            <div className="company-list-content__item company-list-content__item--img">
              {!dataQazTrade?.isLoading &&
              dataQazTrade.isSuccess &&
              dataQazTrade?.data?.length > 0 ? (
                <Image
                  src={dataQazTrade?.data[0]?.image}
                  priority
                  width={100}
                  height={100}
                  className="company-list-content__img"
                  alt={`company-list-${dataQazTrade?.data[0]?.id}`}
                />
              ) : (
                <Skeleton.Image active />
              )}
            </div>
          </div>
        </TabPanel>
        {/*        <TabPanel>
          <div className="company-list-content">
            <div className="company-list-content__item">
              <h3 className="title title-h3 company-list-content__title">
                KazakhExport
              </h3>
              <p className="company-list-content__desc">
                АО «Экспортная страховая компания «KazakhExport» – является
                единственной специализированной страховой организацией –
                институтом развития Республики Казахстан, осуществляющей функции
                экспортно-кредитного агентства. Данные функции KazakhExport были
                закреплены в Государственной программе по форсированному
                индустриально-инновационному развитию РК на 2010-2014 годы, в
                целях создания эффективных финансовых механизмов по поддержке
                выхода казахстанской продукции обрабатывающего сектора на
                зарубежные рынки. KazakhExport в рамках своей основной
                деятельности предоставляет предприятиям экспортерам
                обрабатывающего сектора и БВУ страховую защиту от риска
                неплатежей при внешнеторговых
              </p>
              <Link
                href={`/${lng}/${LINK_URLS.services}`}
                className="btn btn-link btn-accent company-list-content__link"
              >
                {t("learnMore")}
              </Link>
            </div>
            <div className="company-list-content__item company-list-content__item--img">
              <Image
                src={tabImg1}
                className="company-list-content__img"
                alt="tab-img-1"
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="company-list-content">
            <div className="company-list-content__item">
              <h3 className="title title-h3 company-list-content__title">
                ВТП Атамекен
              </h3>
              <p className="company-list-content__desc">
                Внешнеторговая палата Казахстана (ВПК) была образована 29 июля
                2014 г. и является 100% дочерней компанией Национальной палаты
                предпринимателей Республики Казахстан «Атамекен». Основная
                задача, которая была поставлена перед Внешнеторговой палатой
                Казахстана - представление интересов казахстанского бизнеса во
                внешнеэкономической сфере.
              </p>
              <Link
                href={`/${lng}/${LINK_URLS.services}`}
                className="btn btn-link btn-accent company-list-content__link"
              >
                {t("learnMore")}
              </Link>
            </div>
            <div className="company-list-content__item company-list-content__item--img">
              <Image
                src={tabImg1}
                className="company-list-content__img"
                alt="tab-img-1"
              />
            </div>
          </div>
        </TabPanel>*/}
        <TabPanel>
          <div className="company-list-content">
            <div className="company-list-content__item">
              <h3 className="title title-h3 company-list-content__title">
                Astana Hub
              </h3>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    !dataAstanaHub.isLoading &&
                    dataAstanaHub.isSuccess &&
                    dataAstanaHub?.data[0]?.description,
                }}
                className="company-list-content__desc"
              ></div>
              <Link
                href={`/${lng}/${LINK_URLS.services}/astana-hub`}
                className="btn btn-link btn-accent company-list-content__link"
              >
                {t("learnMore")}
              </Link>
            </div>
            <div className="company-list-content__item company-list-content__item--img">
              {!dataAstanaHub?.isLoading &&
              dataAstanaHub.isSuccess &&
              dataAstanaHub?.data?.length > 0 ? (
                <Image
                  src={dataAstanaHub?.data[0]?.image}
                  priority
                  width={100}
                  height={100}
                  className="company-list-content__img"
                  alt={`company-list-${dataAstanaHub?.data[0]?.id}`}
                />
              ) : (
                <Skeleton.Image active />
              )}
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ServicesHome;
