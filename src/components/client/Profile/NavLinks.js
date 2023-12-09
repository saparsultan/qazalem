"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { LINK_URLS } from "@/utils/constants";

const NavLinks = ({ lng, session }) => {
  const { t } = useTranslation(lng, "layout");
  const pathname = usePathname();
  const profileMain = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.main}`;
  const registerGuide = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.registerGuide}`;
  const registerVolunteer = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.registerVolunteer}`;
  const guide = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.guide}`;
  const volunteer = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.volunteer}`;
  const defaultLink = "profile-menu__link";
  const activeLink = "profile-menu__link active";

  return (
    <ul className="profile-menu list-reset">
      <li className="profile-menu__item">
        <Link
          href={profileMain}
          className={
            pathname.includes(`${LINK_URLS.profile}`) &&
            !pathname.includes(`${LINK_URLS.registerGuide}`) &&
            !pathname.includes(`${LINK_URLS.guide}`) &&
            !pathname.includes(`${LINK_URLS.registerVolunteer}`) &&
            !pathname.includes(`${LINK_URLS.volunteer}`)
              ? activeLink
              : defaultLink
          }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.3077 20.5C4.80257 20.5 4.375 20.325 4.025 19.975C3.675 19.625 3.5 19.1974 3.5 18.6923V5.3077C3.5 4.80257 3.675 4.375 4.025 4.025C4.375 3.675 4.80257 3.5 5.3077 3.5H9.7577C9.83718 2.93847 10.0853 2.46475 10.5019 2.07885C10.9186 1.69295 11.4179 1.5 12 1.5C12.582 1.5 13.0814 1.69295 13.498 2.07885C13.9147 2.46475 14.1628 2.93847 14.2423 3.5H18.6923C19.1974 3.5 19.625 3.675 19.975 4.025C20.325 4.375 20.5 4.80257 20.5 5.3077V18.6923C20.5 19.1974 20.325 19.625 19.975 19.975C19.625 20.325 19.1974 20.5 18.6923 20.5H5.3077ZM12 4.34613C12.2166 4.34613 12.3958 4.27529 12.5375 4.13363C12.6791 3.99196 12.75 3.81279 12.75 3.59613C12.75 3.37946 12.6791 3.20029 12.5375 3.05863C12.3958 2.91696 12.2166 2.84613 12 2.84613C11.7833 2.84613 11.6041 2.91696 11.4625 3.05863C11.3208 3.20029 11.25 3.37946 11.25 3.59613C11.25 3.81279 11.3208 3.99196 11.4625 4.13363C11.6041 4.27529 11.7833 4.34613 12 4.34613ZM4.99997 18.0423C5.89998 17.159 6.94581 16.4631 8.13748 15.9548C9.32914 15.4465 10.6166 15.1923 12 15.1923C13.3833 15.1923 14.6708 15.4465 15.8625 15.9548C17.0541 16.4631 18.1 17.159 19 18.0423V5.3077C19 5.23077 18.9679 5.16024 18.9038 5.09613C18.8397 5.03203 18.7692 4.99998 18.6923 4.99998H5.3077C5.23077 4.99998 5.16024 5.03203 5.09612 5.09613C5.03202 5.16024 4.99997 5.23077 4.99997 5.3077V18.0423ZM12 13.0385C12.9025 13.0385 13.6698 12.7224 14.3019 12.0904C14.9339 11.4583 15.25 10.691 15.25 9.78845C15.25 8.8859 14.9339 8.1186 14.3019 7.48655C13.6698 6.8545 12.9025 6.53848 12 6.53848C11.0974 6.53848 10.3301 6.8545 9.69808 7.48655C9.06603 8.1186 8.75 8.8859 8.75 9.78845C8.75 10.691 9.06603 11.4583 9.69808 12.0904C10.3301 12.7224 11.0974 13.0385 12 13.0385ZM6.44225 19H17.5577V18.7885C16.768 18.0833 15.9016 17.5577 14.9587 17.2115C14.0157 16.8653 13.0295 16.6923 12 16.6923C10.9833 16.6923 10.0019 16.8637 9.05573 17.2067C8.10956 17.5497 7.2384 18.0705 6.44225 18.7692V19ZM12 11.5385C11.5192 11.5385 11.1073 11.367 10.7644 11.0241C10.4214 10.6811 10.25 10.2692 10.25 9.78845C10.25 9.30768 10.4214 8.89583 10.7644 8.55288C11.1073 8.20993 11.5192 8.03845 12 8.03845C12.4807 8.03845 12.8926 8.20993 13.2356 8.55288C13.5785 8.89583 13.75 9.30768 13.75 9.78845C13.75 10.2692 13.5785 10.6811 13.2356 11.0241C12.8926 11.367 12.4807 11.5385 12 11.5385Z"
              fill="currentColor"
            />
          </svg>
          <span className="profile-menu__text">{t("personalInfo")}</span>
        </Link>
      </li>
      <li className="profile-menu__item">
        <Link
          href={session?.user?.guide_id ? guide : registerGuide}
          className={
            pathname.includes(`${LINK_URLS.registerGuide}`) ||
            pathname.includes(`${LINK_URLS.guide}`)
              ? activeLink
              : defaultLink
          }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0012 19.5135C13.9576 17.7622 15.4547 16.0824 16.4925 14.474C17.5303 12.8657 18.0492 11.457 18.0492 10.2481C18.0492 8.42498 17.4701 6.92627 16.3117 5.7519C15.1534 4.57753 13.7166 3.99035 12.0012 3.99035C10.2858 3.99035 8.84893 4.57753 7.6906 5.7519C6.53227 6.92627 5.9531 8.42498 5.9531 10.2481C5.9531 11.457 6.47201 12.8657 7.50983 14.474C8.54766 16.0824 10.0448 17.7622 12.0012 19.5135ZM12.0012 20.9403C11.8063 20.9403 11.6114 20.9067 11.4166 20.8394C11.2217 20.7721 11.0454 20.6679 10.8877 20.5269C9.99031 19.7 9.15058 18.8484 8.36853 17.9721C7.58648 17.0958 6.90667 16.2199 6.3291 15.3442C5.75153 14.4686 5.29448 13.6006 4.95795 12.7404C4.6214 11.8801 4.45312 11.0493 4.45312 10.2481C4.45312 7.94038 5.1996 6.07213 6.69255 4.64328C8.18548 3.21443 9.95502 2.5 12.0012 2.5C14.0473 2.5 15.8169 3.21443 17.3098 4.64328C18.8027 6.07213 19.5492 7.94038 19.5492 10.2481C19.5492 11.0493 19.381 11.8785 19.0444 12.7356C18.7079 13.5926 18.2524 14.4606 17.6781 15.3394C17.1037 16.2183 16.4255 17.0942 15.6434 17.9673C14.8614 18.8404 14.0217 19.6904 13.1242 20.5173C12.9688 20.6583 12.7923 20.7641 12.5945 20.8346C12.3967 20.9051 12.1989 20.9403 12.0012 20.9403ZM12.0029 11.8654C12.5005 11.8654 12.9258 11.6882 13.279 11.3339C13.6322 10.9795 13.8089 10.5536 13.8089 10.056C13.8089 9.55839 13.6317 9.133 13.2774 8.7798C12.923 8.4266 12.4971 8.25 11.9995 8.25C11.5019 8.25 11.0765 8.42717 10.7233 8.7815C10.3701 9.13583 10.1935 9.56179 10.1935 10.0594C10.1935 10.557 10.3707 10.9824 10.725 11.3356C11.0793 11.6888 11.5053 11.8654 12.0029 11.8654Z"
              fill="currentColor"
            />
          </svg>
          <span className="profile-menu__text">
            {session?.user?.guide_id ? t("infoGuide") : t("registerGuide")}
          </span>
        </Link>
      </li>
      <li className="profile-menu__item">
        <Link
          href={session?.user?.volunteer_id ? volunteer : registerVolunteer}
          className={
            pathname.includes(`${LINK_URLS.registerVolunteer}`) ||
            pathname.includes(`${LINK_URLS.volunteer}`)
              ? activeLink
              : defaultLink
          }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8272 12.261C15.7233 12.261 15.6253 12.246 15.533 12.2159C15.4407 12.1857 15.356 12.1354 15.2791 12.0649C13.8714 10.8226 12.6685 9.63092 11.6705 8.4899C10.6724 7.34889 10.1734 6.29184 10.1734 5.31875C10.1734 4.48159 10.4596 3.77679 11.032 3.20435C11.6044 2.63192 12.3092 2.3457 13.1464 2.3457C13.6477 2.3457 14.1301 2.46461 14.5935 2.70243C15.057 2.94026 15.4682 3.2829 15.8272 3.73033C16.1862 3.2829 16.5974 2.94026 17.0609 2.70243C17.5243 2.46461 18.0067 2.3457 18.508 2.3457C19.3451 2.3457 20.0499 2.63192 20.6224 3.20435C21.1948 3.77679 21.481 4.48159 21.481 5.31875C21.481 6.29184 20.982 7.34889 19.9839 8.4899C18.9858 9.63092 17.783 10.8226 16.3753 12.0649C16.3048 12.1354 16.2217 12.1857 16.1262 12.2159C16.0307 12.246 15.931 12.261 15.8272 12.261ZM15.8272 10.5111C16.8874 9.55851 17.8448 8.61172 18.6993 7.6707C19.5538 6.72967 19.9811 5.94569 19.9811 5.31875C19.9811 4.89055 19.8426 4.53799 19.5657 4.26105C19.2887 3.98414 18.9362 3.84568 18.508 3.84568C18.2554 3.84568 17.9961 3.90754 17.7301 4.03125C17.464 4.15497 17.2015 4.38543 16.9426 4.72263L15.8272 6.08028L14.7118 4.72263C14.4528 4.38543 14.1903 4.15497 13.9243 4.03125C13.6583 3.90754 13.399 3.84568 13.1464 3.84568C12.7182 3.84568 12.3656 3.98414 12.0887 4.26105C11.8118 4.53799 11.6733 4.89055 11.6733 5.31875C11.6733 5.94569 12.1006 6.72967 12.9551 7.6707C13.8096 8.61172 14.7669 9.55851 15.8272 10.5111ZM13.6907 20.3707C13.7227 20.3835 13.7515 20.3899 13.7772 20.3899C13.8028 20.3899 13.8317 20.3835 13.8637 20.3707L19.7464 18.5495C19.6951 18.3226 19.5887 18.1486 19.4272 18.0274C19.2657 17.9063 19.0849 17.8457 18.8849 17.8457H13.9888C13.5516 17.8457 13.1804 17.8274 12.8753 17.7909C12.5701 17.7543 12.2567 17.6828 11.9349 17.5764L10.3657 17.063C10.1631 16.9989 10.0179 16.8707 9.93008 16.6784C9.84226 16.4861 9.83041 16.2886 9.89451 16.0861C9.95861 15.8899 10.0826 15.7454 10.2666 15.6524C10.4506 15.5595 10.6438 15.5451 10.8464 15.6092L12.1464 16.0649C12.449 16.1611 12.7875 16.2294 13.1618 16.2698C13.5362 16.3101 14.0221 16.3355 14.6195 16.3457H14.8849C14.8849 16.0983 14.8291 15.8848 14.7176 15.7053C14.606 15.5258 14.4592 15.4047 14.2772 15.3419L8.47528 13.2111C8.45605 13.2047 8.43842 13.1999 8.42238 13.1967C8.40635 13.1935 8.38872 13.1919 8.36951 13.1919H6.51948V18.3457L13.6907 20.3707ZM13.3003 21.8399L6.51948 19.8956C6.40538 20.3097 6.17333 20.6421 5.82333 20.8928C5.47333 21.1434 5.10282 21.2687 4.71181 21.2687H3.32723C2.82851 21.2687 2.40256 21.0921 2.04936 20.7389C1.69614 20.3857 1.51953 19.9597 1.51953 19.461V13.4996C1.51953 13.0009 1.69613 12.5749 2.04933 12.2217C2.40253 11.8685 2.82849 11.6919 3.32721 11.6919H8.35986C8.46371 11.6919 8.56916 11.7028 8.67621 11.7246C8.78326 11.7464 8.88357 11.7739 8.97716 11.8073L14.8041 13.9534C15.2579 14.1214 15.6348 14.4185 15.9348 14.8448C16.2348 15.271 16.3848 15.7714 16.3848 16.3457H18.8849C19.6028 16.3457 20.1877 16.5774 20.6397 17.0409C21.0916 17.5043 21.3175 18.1059 21.3175 18.8457C21.3175 19.129 21.2425 19.3572 21.0925 19.5303C20.9425 19.7033 20.7156 19.8405 20.4118 19.9418L14.3445 21.8245C14.1804 21.8783 14.0079 21.9069 13.8272 21.9101C13.6464 21.9133 13.4708 21.8899 13.3003 21.8399ZM3.01951 19.461C3.01951 19.5508 3.04836 19.6245 3.10606 19.6822C3.16376 19.7399 3.23748 19.7688 3.32723 19.7688H4.71181C4.80156 19.7688 4.87527 19.7447 4.93296 19.6966C4.99066 19.6485 5.01951 19.57 5.01951 19.461V13.1919H3.32723C3.23748 13.1919 3.16376 13.2207 3.10606 13.2784C3.04836 13.3361 3.01951 13.4098 3.01951 13.4996V19.461Z"
              fill="currentColor"
            />
          </svg>
          <span className="profile-menu__text">
            {session?.user?.volunteer_id
              ? t("infoVolunteer")
              : t("registerVolunteer")}
          </span>
        </Link>
      </li>
      {/*<li className="profile-menu__item">*/}
      {/*  <Link href="/" className="profile-menu__link">*/}
      {/*    <svg*/}
      {/*      width="24"*/}
      {/*      height="24"*/}
      {/*      viewBox="0 0 24 24"*/}
      {/*      fill="none"*/}
      {/*      xmlns="http://www.w3.org/2000/svg"*/}
      {/*    >*/}
      {/*      <path*/}
      {/*        d="M6.3077 21.5C5.80257 21.5 5.375 21.325 5.025 20.975C4.675 20.625 4.5 20.1974 4.5 19.6923V8.3077C4.5 7.80257 4.675 7.375 5.025 7.025C5.375 6.675 5.80257 6.5 6.3077 6.5H8.25V6.25C8.25 5.2141 8.61603 4.33013 9.34808 3.59808C10.0801 2.86603 10.9641 2.5 12 2.5C13.0359 2.5 13.9198 2.86603 14.6519 3.59808C15.3839 4.33013 15.75 5.2141 15.75 6.25V6.5H17.6922C18.1974 6.5 18.625 6.675 18.975 7.025C19.325 7.375 19.5 7.80257 19.5 8.3077V19.6923C19.5 20.1974 19.325 20.625 18.975 20.975C18.625 21.325 18.1974 21.5 17.6922 21.5H6.3077ZM6.3077 20H17.6922C17.7692 20 17.8397 19.9679 17.9038 19.9038C17.9679 19.8397 18 19.7692 18 19.6923V8.3077C18 8.23077 17.9679 8.16024 17.9038 8.09613C17.8397 8.03203 17.7692 7.99998 17.6922 7.99998H15.75V10.25C15.75 10.4628 15.6782 10.641 15.5346 10.7846C15.391 10.9282 15.2128 11 15 11C14.7872 11 14.609 10.9282 14.4654 10.7846C14.3218 10.641 14.25 10.4628 14.25 10.25V7.99998H9.74995V10.25C9.74995 10.4628 9.67816 10.641 9.53457 10.7846C9.39099 10.9282 9.21279 11 8.99997 11C8.78716 11 8.60896 10.9282 8.46537 10.7846C8.32179 10.641 8.25 10.4628 8.25 10.25V7.99998H6.3077C6.23077 7.99998 6.16024 8.03203 6.09612 8.09613C6.03202 8.16024 5.99997 8.23077 5.99997 8.3077V19.6923C5.99997 19.7692 6.03202 19.8397 6.09612 19.9038C6.16024 19.9679 6.23077 20 6.3077 20ZM9.74995 6.5H14.25V6.25C14.25 5.62307 14.0317 5.09133 13.5952 4.6548C13.1586 4.21825 12.6269 3.99998 12 3.99998C11.373 3.99998 10.8413 4.21825 10.4048 4.6548C9.96822 5.09133 9.74995 5.62307 9.74995 6.25V6.5Z"*/}
      {/*        fill="currentColor"*/}
      {/*      />*/}
      {/*    </svg>*/}
      {/*    <span className="profile-menu__text">{t("registerBrand")}</span>*/}
      {/*  </Link>*/}
      {/*</li>*/}
    </ul>
  );
};

export default NavLinks;
