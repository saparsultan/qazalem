import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/utils/getQueryClient";
import NewsService from "@/services/NewsService";
import { ReactQueryHydrate } from "@/components/client/ReactQueryHydrate/ReactQueryHydrate";
import InterviewClient from "@/components/client/Blogs/Interview.client";

const Interview = async ({ params: { lng } }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["blogInterview"], async () => {
    const { data } = await NewsService.getInterview({
      lang: lng,
    });
    return data;
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <ReactQueryHydrate state={dehydratedState}>
      <InterviewClient lng={lng} />
    </ReactQueryHydrate>
  );
};

export default Interview;
