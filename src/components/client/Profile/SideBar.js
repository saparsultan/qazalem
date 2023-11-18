"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LINK_URLS } from "@/utils/constants";
import defaultAvatar from "@/assets/img/default.png";
import { useTranslation } from "@/app/i18n/client";
import { Skeleton } from "antd";

const SideBar = ({ lng }) => {
  const { data: session, status } = useSession();
  const { t: tDefault } = useTranslation(lng, "default");
  const pathname = usePathname();
  const router = useRouter();
  const profileMain = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.main}`;
  const profilePersonal = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.personal}`;
  const profileSocial = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.social}`;
  const profileAdditional = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.additional}`;
  const profileChangePassword = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.changePassword}`;
  const profileRegisterEvent = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.registerEvent}`;
  const activeLink = "profile-sidebar-list__link active";
  const defaultLink = "profile-sidebar-list__link";

  const handleLogout = async () => {
    await signOut({ redirect: false });
    await router.push(`/${lng}`);
  };

  return !session?.user && status === "unauthenticated" ? (
    <div
      style={{
        padding: "1.25em",
      }}
    >
      <Skeleton
        paragraph={{
          rows: 8,
        }}
      />
    </div>
  ) : (
    <>
      <div className="profile-sidebar__header profile-sidebar-header">
        <div className="profile-sidebar-header__preview">
          <div
            className="profile-sidebar-header__logout"
            onClick={handleLogout}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.3077 20.5C4.80257 20.5 4.375 20.325 4.025 19.975C3.675 19.625 3.5 19.1974 3.5 18.6923V5.3077C3.5 4.80257 3.675 4.375 4.025 4.025C4.375 3.675 4.80257 3.5 5.3077 3.5H11.2596C11.4724 3.5 11.6506 3.5718 11.7942 3.7154C11.9378 3.85898 12.0096 4.03718 12.0096 4.25C12.0096 4.46282 11.9378 4.64102 11.7942 4.7846C11.6506 4.92818 11.4724 4.99998 11.2596 4.99998H5.3077C5.23077 4.99998 5.16024 5.03203 5.09612 5.09613C5.03202 5.16024 4.99997 5.23077 4.99997 5.3077V18.6923C4.99997 18.7692 5.03202 18.8397 5.09612 18.9038C5.16024 18.9679 5.23077 19 5.3077 19H11.2596C11.4724 19 11.6506 19.0718 11.7942 19.2154C11.9378 19.3589 12.0096 19.5371 12.0096 19.75C12.0096 19.9628 11.9378 20.141 11.7942 20.2846C11.6506 20.4282 11.4724 20.5 11.2596 20.5H5.3077ZM17.6173 12.75H9.84612C9.63331 12.75 9.45511 12.6782 9.31152 12.5346C9.16792 12.391 9.09612 12.2128 9.09612 12C9.09612 11.7872 9.16792 11.609 9.31152 11.4654C9.45511 11.3218 9.63331 11.25 9.84612 11.25H17.6173L15.6942 9.32693C15.5558 9.18846 15.4849 9.01955 15.4817 8.8202C15.4785 8.62085 15.5494 8.44361 15.6942 8.28848C15.8391 8.13336 16.0147 8.05323 16.2211 8.0481C16.4275 8.04297 16.6083 8.11797 16.7634 8.2731L19.8576 11.3673C20.0384 11.5481 20.1288 11.759 20.1288 12C20.1288 12.241 20.0384 12.4519 19.8576 12.6327L16.7634 15.7269C16.6147 15.8756 16.4381 15.949 16.2336 15.9471C16.0292 15.9451 15.8494 15.8666 15.6942 15.7115C15.5494 15.5563 15.4795 15.3781 15.4846 15.1769C15.4898 14.9756 15.5648 14.8025 15.7096 14.6577L17.6173 12.75Z"
                fill="#171A1A"
                fillOpacity=".42"
              />
            </svg>
          </div>
          <div className="profile-sidebar-header__avatar">
            <Image
              quality={75}
              src={
                session && session?.user?.image
                  ? session?.user?.image
                  : defaultAvatar
              }
              alt="Avatar"
              sizes="(max-width: 768px) 100vw"
              width={100}
              height={100}
              loading="lazy"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAQAAACWCLlpAAAA30lEQVR42u3QQREAAAgDINc/9Kzg24MIpB2OIkuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyflp0Dyt64z+CCAAAAABJRU5ErkJggg=="
              placeholder="blur"
            />
          </div>
          <div className="profile-sidebar-header__fio">
            {session?.user &&
              `${session?.user?.lastname} ${session?.user?.firstname} ${session?.user?.middlename}`}
          </div>
        </div>
      </div>
      <div className="profile-sidebar__list">
        <ul className="list-reset profile-sidebar-list">
          <li className="profile-sidebar-list__item">
            <Link
              passHref
              href={profileMain}
              className={pathname === profileMain ? activeLink : defaultLink}
            >
              <span>{tDefault("titleMainData")}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4508 12.0004L7.10078 4.65038C6.85078 4.40038 6.72995 4.10871 6.73828 3.77538C6.74661 3.44204 6.87578 3.15038 7.12578 2.90038C7.37578 2.65038 7.66745 2.52538 8.00078 2.52538C8.33411 2.52538 8.62578 2.65038 8.87578 2.90038L16.5758 10.5754C16.7758 10.7754 16.9258 11.0004 17.0258 11.2504C17.1258 11.5004 17.1758 11.7504 17.1758 12.0004C17.1758 12.2504 17.1258 12.5004 17.0258 12.7504C16.9258 13.0004 16.7758 13.2254 16.5758 13.4254L8.87578 21.1254C8.62578 21.3754 8.32995 21.4962 7.98828 21.4879C7.64661 21.4795 7.35078 21.3504 7.10078 21.1004C6.85078 20.8504 6.72578 20.5587 6.72578 20.2254C6.72578 19.892 6.85078 19.6004 7.10078 19.3504L14.4508 12.0004Z"
                  fill="#1C1B1F"
                />
              </svg>
            </Link>
          </li>
          <li className="profile-sidebar-list__item">
            <Link
              passHref
              href={profilePersonal}
              className={
                pathname === profilePersonal ? activeLink : defaultLink
              }
            >
              <span>{tDefault("titlePersonalData")}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4508 12.0004L7.10078 4.65038C6.85078 4.40038 6.72995 4.10871 6.73828 3.77538C6.74661 3.44204 6.87578 3.15038 7.12578 2.90038C7.37578 2.65038 7.66745 2.52538 8.00078 2.52538C8.33411 2.52538 8.62578 2.65038 8.87578 2.90038L16.5758 10.5754C16.7758 10.7754 16.9258 11.0004 17.0258 11.2504C17.1258 11.5004 17.1758 11.7504 17.1758 12.0004C17.1758 12.2504 17.1258 12.5004 17.0258 12.7504C16.9258 13.0004 16.7758 13.2254 16.5758 13.4254L8.87578 21.1254C8.62578 21.3754 8.32995 21.4962 7.98828 21.4879C7.64661 21.4795 7.35078 21.3504 7.10078 21.1004C6.85078 20.8504 6.72578 20.5587 6.72578 20.2254C6.72578 19.892 6.85078 19.6004 7.10078 19.3504L14.4508 12.0004Z"
                  fill="#1C1B1F"
                />
              </svg>
            </Link>
          </li>
          <li className="profile-sidebar-list__item">
            <Link
              passHref
              href={profileSocial}
              className={pathname === profileSocial ? activeLink : defaultLink}
            >
              <span>{tDefault("titleSocialData")}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4508 12.0004L7.10078 4.65038C6.85078 4.40038 6.72995 4.10871 6.73828 3.77538C6.74661 3.44204 6.87578 3.15038 7.12578 2.90038C7.37578 2.65038 7.66745 2.52538 8.00078 2.52538C8.33411 2.52538 8.62578 2.65038 8.87578 2.90038L16.5758 10.5754C16.7758 10.7754 16.9258 11.0004 17.0258 11.2504C17.1258 11.5004 17.1758 11.7504 17.1758 12.0004C17.1758 12.2504 17.1258 12.5004 17.0258 12.7504C16.9258 13.0004 16.7758 13.2254 16.5758 13.4254L8.87578 21.1254C8.62578 21.3754 8.32995 21.4962 7.98828 21.4879C7.64661 21.4795 7.35078 21.3504 7.10078 21.1004C6.85078 20.8504 6.72578 20.5587 6.72578 20.2254C6.72578 19.892 6.85078 19.6004 7.10078 19.3504L14.4508 12.0004Z"
                  fill="#1C1B1F"
                />
              </svg>
            </Link>
          </li>
          <li className="profile-sidebar-list__item">
            <Link
              passHref
              href={profileAdditional}
              className={
                pathname === profileAdditional ? activeLink : defaultLink
              }
            >
              <span>{tDefault("titleAdditionalData")}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4508 12.0004L7.10078 4.65038C6.85078 4.40038 6.72995 4.10871 6.73828 3.77538C6.74661 3.44204 6.87578 3.15038 7.12578 2.90038C7.37578 2.65038 7.66745 2.52538 8.00078 2.52538C8.33411 2.52538 8.62578 2.65038 8.87578 2.90038L16.5758 10.5754C16.7758 10.7754 16.9258 11.0004 17.0258 11.2504C17.1258 11.5004 17.1758 11.7504 17.1758 12.0004C17.1758 12.2504 17.1258 12.5004 17.0258 12.7504C16.9258 13.0004 16.7758 13.2254 16.5758 13.4254L8.87578 21.1254C8.62578 21.3754 8.32995 21.4962 7.98828 21.4879C7.64661 21.4795 7.35078 21.3504 7.10078 21.1004C6.85078 20.8504 6.72578 20.5587 6.72578 20.2254C6.72578 19.892 6.85078 19.6004 7.10078 19.3504L14.4508 12.0004Z"
                  fill="#1C1B1F"
                />
              </svg>
            </Link>
          </li>
          <li className="profile-sidebar-list__item">
            <Link
              passHref
              href={profileChangePassword}
              className={
                pathname === profileChangePassword ? activeLink : defaultLink
              }
            >
              <span>{tDefault("titleChangePassword")}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4508 12.0004L7.10078 4.65038C6.85078 4.40038 6.72995 4.10871 6.73828 3.77538C6.74661 3.44204 6.87578 3.15038 7.12578 2.90038C7.37578 2.65038 7.66745 2.52538 8.00078 2.52538C8.33411 2.52538 8.62578 2.65038 8.87578 2.90038L16.5758 10.5754C16.7758 10.7754 16.9258 11.0004 17.0258 11.2504C17.1258 11.5004 17.1758 11.7504 17.1758 12.0004C17.1758 12.2504 17.1258 12.5004 17.0258 12.7504C16.9258 13.0004 16.7758 13.2254 16.5758 13.4254L8.87578 21.1254C8.62578 21.3754 8.32995 21.4962 7.98828 21.4879C7.64661 21.4795 7.35078 21.3504 7.10078 21.1004C6.85078 20.8504 6.72578 20.5587 6.72578 20.2254C6.72578 19.892 6.85078 19.6004 7.10078 19.3504L14.4508 12.0004Z"
                  fill="#1C1B1F"
                />
              </svg>
            </Link>
          </li>
          <li className="profile-sidebar-list__item">
            <Link
              passHref
              href={profileRegisterEvent}
              className={
                pathname === profileRegisterEvent ? activeLink : defaultLink
              }
            >
              <span>{tDefault("titleRegisterEvent")}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4508 12.0004L7.10078 4.65038C6.85078 4.40038 6.72995 4.10871 6.73828 3.77538C6.74661 3.44204 6.87578 3.15038 7.12578 2.90038C7.37578 2.65038 7.66745 2.52538 8.00078 2.52538C8.33411 2.52538 8.62578 2.65038 8.87578 2.90038L16.5758 10.5754C16.7758 10.7754 16.9258 11.0004 17.0258 11.2504C17.1258 11.5004 17.1758 11.7504 17.1758 12.0004C17.1758 12.2504 17.1258 12.5004 17.0258 12.7504C16.9258 13.0004 16.7758 13.2254 16.5758 13.4254L8.87578 21.1254C8.62578 21.3754 8.32995 21.4962 7.98828 21.4879C7.64661 21.4795 7.35078 21.3504 7.10078 21.1004C6.85078 20.8504 6.72578 20.5587 6.72578 20.2254C6.72578 19.892 6.85078 19.6004 7.10078 19.3504L14.4508 12.0004Z"
                  fill="#1C1B1F"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
