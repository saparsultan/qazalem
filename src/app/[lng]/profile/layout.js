import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { App } from "antd";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LINK_URLS } from "@/utils/constants";
import SideBar from "@/components/client/Profile/SideBar";
import NavLinks from "@/components/client/Profile/NavLinks";

export default async function ProfileLayout({ children, params: { lng } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/${lng}/${LINK_URLS.login}`);
  }
  return (
    <App>
      <section className="section profile__container">
        <div className="profile-menu__container">
          <div className="container">
            <NavLinks lng={lng} session={session} />
          </div>
        </div>
        <div className="profile-content__container">
          <div className="container">
            <div className="profile">
              <div className="profile-sidebar">
                <SideBar lng={lng} session={session} />
              </div>
              <div className="profile-content">{children}</div>
            </div>
          </div>
        </div>
      </section>
    </App>
  );
}
