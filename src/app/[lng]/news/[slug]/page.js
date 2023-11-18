import { useTranslation } from "@/app/i18n";
import { LINK_URLS } from "@/utils/constants";
import NewsService from "@/services/NewsService";
import BlogContentPageClient from "@/components/client/Blogs/BlogContentPage.client";
import NewsOriginCountry from "@/components/client/LatestBlogs/NewsOriginCountry";

export default async function NewsPage({ params: { lng, slug } }) {
  const link = LINK_URLS.news;
  const params = {
    lang: lng,
    subcategory: "",
    published_date_start: "",
    published_date_end: "",
    search: "",
    page: 1,
    page_size: 5,
  };
  const { t } = await useTranslation(lng, "default");
  const data = await NewsService.getOneOriginCountry(slug, lng);

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
                  <h3 className="title title-h3 mdm publdet-aside__title">
                    {t("latestNews")}
                  </h3>
                  <NewsOriginCountry
                    queryParams={params}
                    queryKey="blogNewsOriginCountryLatest"
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
