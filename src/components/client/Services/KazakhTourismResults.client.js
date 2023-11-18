"use client";
import { Fragment } from "react";
import { Progress, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import { ServicesService } from "@/services/InformationService";

const KazakhTourismResultsClient = ({ lng }) => {
  const { t: tForm } = useTranslation(lng, "form");
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["kazakhTourismAnalytics"],
    queryFn: async () => {
      return await ServicesService.getKazakhTourismAnalytics(lng);
    },
  });

  return isLoading ? (
    <Skeleton paragraph={{ rows: 8 }} />
  ) : (
    <div className="analytic-list">
      <div className="analytic-item">
        <div className="analytic-item__title">{tForm("haveVisited")}</div>
        <div className="analytic-answer__list">
          <div className="analytic-answer__item">
            {!isLoading &&
              isSuccess &&
              data?.data?.visiting_kazakhstan.map(
                ({ value, percentage }, id) => {
                  return (
                    <Fragment key={id}>
                      <div className="analytic-answer__item-title">{value}</div>
                      <Progress percent={percentage} size={[300, 20]} />
                    </Fragment>
                  );
                },
              )}
          </div>
        </div>
      </div>
      <div className="analytic-item">
        <div className="analytic-item__title">{tForm("whatAttracts")}</div>
        <div className="analytic-answer__list">
          <div className="analytic-answer__item">
            {!isLoading &&
              isSuccess &&
              data?.data?.attracts.map(({ value, percentage }, id) => {
                return (
                  <Fragment key={id}>
                    <div className="analytic-answer__item-title">{value}</div>
                    <Progress percent={percentage} size={[300, 20]} />
                  </Fragment>
                );
              })}
          </div>
        </div>
      </div>
      <div className="analytic-item">
        <div className="analytic-item__title">{tForm("howCulture")}</div>
        <div className="analytic-answer__list">
          <div className="analytic-answer__item">
            {!isLoading &&
              isSuccess &&
              data?.data?.culture.map(({ value, percentage }, id) => {
                return (
                  <Fragment key={id}>
                    <div className="analytic-answer__item-title">{value}</div>
                    <Progress percent={percentage} size={[300, 20]} />
                  </Fragment>
                );
              })}
          </div>
        </div>
      </div>
      <div className="analytic-item">
        <div className="analytic-item__title">{tForm("youHeardBrands")}</div>
        <div className="analytic-answer__list">
          <div className="analytic-answer__item">
            {!isLoading &&
              isSuccess &&
              data?.data?.brands.map(({ value, percentage }, id) => {
                return (
                  <Fragment key={id}>
                    <div className="analytic-answer__item-title">{value}</div>
                    <Progress percent={percentage} size={[300, 20]} />
                  </Fragment>
                );
              })}
          </div>
        </div>
      </div>
      <div className="analytic-item">
        <div className="analytic-item__title">{tForm("notExperience")}</div>
        <div className="analytic-answer__list">
          <div className="analytic-answer__item">
            {!isLoading &&
              isSuccess &&
              data?.data?.visiting_in_the_future.map(
                ({ value, percentage }, id) => {
                  return (
                    <Fragment key={id}>
                      <div className="analytic-answer__item-title">{value}</div>
                      <Progress percent={percentage} size={[300, 20]} />
                    </Fragment>
                  );
                },
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KazakhTourismResultsClient;
