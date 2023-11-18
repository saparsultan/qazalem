"use client";
import Link from "next/link";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Skeleton } from "antd";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import { LINK_URLS } from "@/utils/constants";
import BlogList from "@/components/layout/BlogList";
import NewsService from "@/services/NewsService";
import MoreLink from "@/components/layout/MoreLink";

const NewsWorldHome = ({ lng }) => {
  const { t } = useTranslation(lng, "home");
  const [category, setCategory] = useState("");

  const link = `/${lng}/${LINK_URLS.news}/${LINK_URLS.world}`;

  const newsWorldCategory = useQuery({
    queryKey: ["newsWorldCategory"],
    queryFn: async () => {
      const { data } = await NewsService.getNewsWorldCategory(lng);
      return data;
    },
    staleTime: Infinity,
  });

  const { data, isLoading, isSuccess } = useInfiniteQuery({
    queryKey: ["blogNewsWorld", category, lng],
    queryFn: async ({ page_size = 4 }) => {
      const getData = {
        lang: lng,
        subcategory: category,
        published_date: "",
        search: "",
        page: 1,
        page_size,
      };
      const { data } = await NewsService.getNewsWorld(getData);
      return data;
    },
  });

  return (
    <>
      <Tabs className="world-news-home__tabs-wrap">
        <div className="tab-list__tabs-wrap">
          <TabList className="tab-list__tabs">
            <Tab className="tab-list__tab" onClick={() => setCategory("")}>
              {t("all")}
            </Tab>
            {newsWorldCategory?.data?.length &&
              newsWorldCategory.data.map(({ id, name }) => {
                return (
                  <Tab
                    className="tab-list__tab"
                    key={id}
                    onClick={() => setCategory(id)}
                  >
                    {name}
                  </Tab>
                );
              })}
          </TabList>
          <Link href={link} className="tab-list__link">
            {t("allNews")}
          </Link>
        </div>
        <TabPanel key="default">
          {!isLoading && isSuccess && data?.pages[0]?.results.length > 0 ? (
            <BlogList
              data={data?.pages[0]}
              isLoading={isLoading}
              isSuccess={isSuccess}
              link={link}
            />
          ) : (
            <div className="blog-list">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="skeleton-blogCard">
                    <Skeleton.Image
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      active={true}
                      className="skeleton-blogCard__img"
                    />
                    <Skeleton className="skeleton-blogCard__text" active />
                  </div>
                ))}
            </div>
          )}
        </TabPanel>
        {newsWorldCategory?.data?.length &&
          newsWorldCategory.data.map(({ id }) => {
            return (
              <TabPanel key={id}>
                <BlogList
                  data={data?.pages[0]}
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                  link={link}
                />
              </TabPanel>
            );
          })}
      </Tabs>
      <MoreLink clasName="more-link__mobile" link={link} target>
        {t("allNews")}
      </MoreLink>
    </>
  );
};

export default NewsWorldHome;
