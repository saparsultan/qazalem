import InformationService from "@/services/InformationService";
import BlogVolunteerPage from "@/components/client/Blogs/BlogVolunteerPage";

export default async function VolunteerInfoPage({ params: { lng, slug } }) {
  const data = await InformationService.getOneVolunteer(slug, lng);
  return (
    <section className="section section--publish blog-profile-page__container">
      <div className="container">
        <div className="blog-profile-page">
          <BlogVolunteerPage data={data?.data} lng={lng} />
        </div>
      </div>
    </section>
  );
}
