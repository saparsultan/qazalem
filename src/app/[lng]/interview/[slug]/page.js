import { useTranslation } from "@/app/i18n";
import { LINK_URLS } from "@/utils/constants";
import NewsService from "@/services/NewsService";
import BlogContentPageClient from "@/components/client/Blogs/BlogContentPage.client";
import NewsInterviewQuery from "@/components/client/LatestBlogs/NewsInterview";

export default async function InterviewPage({ params: { lng, slug } }) {
  const link = LINK_URLS.interview;
  const params = {
    lang: lng,
    published_date_start: "",
    published_date_end: "",
    search: "",
    page: 1,
    page_size: 5,
  };
  const { t } = await useTranslation(lng, "default");
  const data = await NewsService.getOneInterview(slug, lng);

  return (
    <>
      <section className="section publdet__container">
        <div className="container">
          <div className="publdet">
            <h2 className="title title-left title-h2 text-low bold publdet__title">
              {data?.data?.title}
            </h2>
            <div className="publdet-wrap">
              <BlogContentPageClient data={data?.data} lng={lng} />
              <aside className="publdet-aside">
                <div className="publdet-aside-wrapper">
                  <h3 className="title title-h3 sm-bold publdet-aside__title">
                    {t("latestInterview")}
                  </h3>
                  <NewsInterviewQuery
                    queryParams={params}
                    queryKey="blogInterviewLatest"
                    link={link}
                    lng={lng}
                  />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
