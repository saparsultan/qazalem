import { dehydrate } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n";
import getQueryClient from "@/utils/getQueryClient";
import NewsService from "@/services/NewsService";
import { ReactQueryHydrate } from "@/components/client/ReactQueryHydrate/ReactQueryHydrate";
import NewsWorldClient from "@/components/client/Blogs/NewsWorld.client";

export default async function NewsWorld({ params: { lng } }) {
  const { t } = await useTranslation(lng, "home");
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["blogNewsWorld"], async () => {
    const { data } = await NewsService.getNewsWorld();
    return data;
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <section className="section section--publish news-world__container">
      <div className="container">
        <div className="news-world">
          <h2 className="title title-left text-low title-h2 news-world__title">
            {t("worldEvents")}
          </h2>
          <ReactQueryHydrate state={dehydratedState}>
            <NewsWorldClient lng={lng} />
          </ReactQueryHydrate>
        </div>
      </div>
    </section>
  );
}
