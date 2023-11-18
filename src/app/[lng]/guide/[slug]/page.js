"use client";
import { useParams } from "next/navigation";
import BlogProfileInfo from "@/components/client/Blogs/BlogProfileInfo";

const GuideInfoPage = ({ params: { lng } }) => {
  const { slug } = useParams();
  return (
    <section className="section section--publish blog-profile-page__container">
      <div className="container">
        <div className="blog-profile-page">
          <BlogProfileInfo lng={lng} slug={slug} />
        </div>
      </div>
    </section>
  );
};

export default GuideInfoPage;
