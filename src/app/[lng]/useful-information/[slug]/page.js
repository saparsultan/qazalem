"use client";
import HelpfulInformationPageClient from "@/components/client/Blogs/HelpfulInformationPage.client";
import { useParams } from "next/navigation";

const HelpfulInformationPage = ({ params: { lng } }) => {
  const { slug } = useParams();
  return (
    <section className="section section--publish helpful-info__container">
      <div className="container">
        <HelpfulInformationPageClient lng={lng} slug={slug} />
      </div>
    </section>
  );
};

export default HelpfulInformationPage;
