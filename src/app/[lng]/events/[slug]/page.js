import NewsService from "@/services/NewsService";
import BlogContentPageClient from "@/components/client/Blogs/BlogContentPage.client";
import EventAside from "@/components/client/Blogs/EventAside";

export default async function EventPage({ params: { lng, slug } }) {
  const data = await NewsService.getOneEvents(slug, lng);
  return (
    <>
      <section className="section publdet__container">
        <div className="container">
          <div className="publdet">
            <h2 className="title title-left title-h2 text-low bold publdet__title">
              {data?.data?.title}
            </h2>
            <div className="publdet-wrap">
              <BlogContentPageClient
                data={data?.data}
                lng={lng}
                noArticleWidget
              />
              <EventAside
                lng={lng}
                startDate={data?.data?.event_date}
                endDate={data?.data?.event_date_end}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
