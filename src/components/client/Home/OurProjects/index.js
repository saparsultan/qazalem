"use client";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";
import { useTranslation } from "@/app/i18n/client";
import { LINK_URLS } from "@/utils/constants";

const OurProjects = ({ lng }) => {
  const { t: tHome } = useTranslation(lng, "home");
  return (
    <div className="our-projects-wrap">
      {/*<div className="our-projects-list"></div>*/}
      <div className="our-projects-options">
        <div className="our-projects-options__item">
          <div className="our-projects-options__item-icon">
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.27984 22.1667C8.27984 23.2421 7.40807 24.1138 6.33268 24.1138C5.2573 24.1138 4.38553 23.2421 4.38553 22.1667C4.38553 21.0913 5.2573 20.2195 6.33268 20.2195C7.40807 20.2195 8.27984 21.0913 8.27984 22.1667Z"
                strokeWidth="2.43902"
              />
              <path
                d="M2.41098 28.9564L2.41099 28.9564L2.4184 28.9532C3.61096 28.4341 4.927 28.1391 6.31302 28.1362C6.04908 28.9462 5.90549 29.8073 5.90549 30.7009V32.0305H1.21951L1.21951 30.7642L1.21951 30.7631C1.21917 30.3783 1.33193 30.0019 1.54376 29.6807C1.7556 29.3595 2.05716 29.1076 2.41098 28.9564Z"
                strokeWidth="2.43902"
              />
              <path
                d="M33.6138 22.1667C33.6138 23.2421 32.7421 24.1138 31.6667 24.1138C30.5913 24.1138 29.7195 23.2421 29.7195 22.1667C29.7195 21.0913 30.5913 20.2195 31.6667 20.2195C32.7421 20.2195 33.6138 21.0913 33.6138 22.1667Z"
                strokeWidth="2.43902"
              />
              <path
                d="M35.5807 28.9527L35.5844 28.9543C36.3151 29.2703 36.7806 29.974 36.7806 30.7642V32.0305H32.0946V30.7008C32.0946 29.8073 31.951 28.9462 31.687 28.1362C33.0271 28.1389 34.3524 28.4168 35.5807 28.9527ZM27.2806 30.7008V32.0305H10.7196L10.7196 30.7008L10.7196 30.6943C10.7159 30.015 10.9094 29.3493 11.2765 28.7778C11.6423 28.2082 12.1649 27.7566 12.7814 27.4772C14.5071 26.726 16.6186 26.157 19.0001 26.157C21.39 26.157 23.5019 26.7142 25.2181 27.4769C26.4739 28.035 27.2806 29.2991 27.2806 30.7008ZM19.0001 22.5305C17.0453 22.5305 15.4696 20.9548 15.4696 19C15.4696 17.0452 17.0453 15.4695 19.0001 15.4695C20.9549 15.4695 22.5306 17.0452 22.5306 19C22.5306 20.9548 20.9549 22.5305 19.0001 22.5305Z"
                strokeWidth="2.43902"
              />
              <path
                d="M1.8427 17.145C1.43493 15.9768 1.21951 14.8082 1.21951 13.6167C1.21951 8.43187 5.26518 4.3862 10.45 4.3862C13.3898 4.3862 16.2209 5.75597 18.0711 7.93102L19 9.023L19.9289 7.93102C21.7791 5.75597 24.6102 4.3862 27.55 4.3862C32.7348 4.3862 36.7805 8.43187 36.7805 13.6167C36.7805 14.8055 36.5661 15.972 36.164 17.1391C35.9737 16.9687 35.7733 16.8087 35.5634 16.6603C35.8774 15.6667 36.0528 14.6595 36.0528 13.6167C36.0528 8.85817 32.3085 5.11384 27.55 5.11384C23.2483 5.11384 21.0394 7.66049 19.0007 10.1169C16.9427 7.63884 14.7287 5.11384 10.45 5.11384C5.69148 5.11384 1.94716 8.85817 1.94716 13.6167C1.94716 14.6615 2.12329 15.6705 2.43834 16.6659C2.23052 16.8144 2.03171 16.9745 1.8427 17.145Z"
                strokeWidth="2.43902"
              />
            </svg>
          </div>
          <div className="our-projects-options__item-text">
            <div className="our-projects-options__item-name">
              {tHome("volunteers")}
            </div>
            <Link href="/" className="our-projects-options__item-link">
              <span>{tHome("learnMore")}</span>
              <RightOutlined />
            </Link>
          </div>
        </div>
        <div className="our-projects-options__item active">
          <div className="our-projects-options__item-icon">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 3.66809V37.5848"
                strokeWidth="3.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 7.33478H36.2496L38.5 11.0014L36.2496 14.6681H22V7.33478ZM22 20.1681H7.75042L5.5 23.8348L7.75042 27.5014H22V20.1681Z"
                strokeWidth="3.33333"
                strokeLinejoin="round"
              />
              <path
                d="M14.666 38.5014H29.3327"
                strokeWidth="3.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="our-projects-options__item-text">
            <div className="our-projects-options__item-name">
              {tHome("guide")}
            </div>
            <Link
              href={`/${lng}/${LINK_URLS.guide}`}
              className="our-projects-options__item-link"
            >
              <span>{tHome("learnMore")}</span>
              <RightOutlined />
            </Link>
          </div>
        </div>
        <div className="our-projects-options__item">
          <div className="our-projects-options__item-icon">
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.8384 14.1199C36.7761 11.7833 35.046 9.81348 32.866 8.45864C30.686 7.1038 28.1537 6.4246 25.5884 6.50665C23.023 6.58869 20.5393 7.42831 18.4503 8.91968C16.3614 10.4111 14.7606 12.4874 13.8498 14.8871C12.9391 17.2868 12.7591 19.9024 13.3325 22.4042C13.9059 24.906 15.207 27.1821 17.072 28.9456C18.9369 30.7092 21.2821 31.8811 23.8121 32.3139C26.342 32.7466 28.9435 32.4208 31.2885 31.3774"
                strokeWidth="2.43902"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M37.8762 37.8345C40.2128 36.7722 42.1826 35.0421 43.5375 32.8621C44.8923 30.6821 45.5715 28.1498 45.4895 25.5844C45.4074 23.0191 44.5678 20.5354 43.0764 18.4464C41.5851 16.3574 39.5087 14.7567 37.109 13.8459C34.7093 12.9352 32.0937 12.7552 29.5919 13.3286C27.0901 13.902 24.814 15.2031 23.0505 17.0681C21.2869 18.933 20.115 21.2782 19.6822 23.8082C19.2495 26.3381 19.5753 28.9396 20.6187 31.2846"
                strokeWidth="2.43902"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.1719 37.8744C15.2339 40.211 16.9639 42.1809 19.1437 43.5359C21.3236 44.8909 23.8558 45.5703 26.4211 45.4885C28.9865 45.4066 31.4702 44.5673 33.5592 43.0761C35.6483 41.585 37.2492 39.5088 38.1603 37.1093C39.0713 34.7098 39.2516 32.0942 38.6785 29.5924C38.1054 27.0905 36.8046 24.8143 34.9399 23.0506C33.0752 21.2869 30.7302 20.1146 28.2003 19.6815C25.6705 19.2484 23.069 19.5738 20.7239 20.6169"
                strokeWidth="2.43902"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.1227 14.1692C11.7861 15.2313 9.81612 16.9612 8.46113 19.1411C7.10614 21.3209 6.42674 23.8531 6.50856 26.4184C6.59038 28.9838 7.42975 31.4675 8.92088 33.5566C10.412 35.6456 12.4882 37.2466 14.8877 38.1576C17.2873 39.0686 19.9028 39.2489 22.4046 38.6758C24.9065 38.1027 27.1827 36.8019 28.9464 34.9372C30.7102 33.0725 31.8824 30.7275 32.3155 28.1977C32.7486 25.6678 32.4232 23.0664 31.3802 20.7212"
                strokeWidth="2.43902"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="our-projects-options__item-text">
            <div className="our-projects-options__item-name">
              {tHome("kazakhBrands")}
            </div>
            <Link href="/" className="our-projects-options__item-link">
              <span>{tHome("learnMore")}</span>
              <RightOutlined />
            </Link>
          </div>
        </div>
        <div className="our-projects-options__item">
          <div className="our-projects-options__item-icon">
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.8384 14.1199C36.7761 11.7833 35.046 9.81348 32.866 8.45864C30.686 7.1038 28.1537 6.4246 25.5884 6.50665C23.023 6.58869 20.5393 7.42831 18.4503 8.91968C16.3614 10.4111 14.7606 12.4874 13.8498 14.8871C12.9391 17.2868 12.7591 19.9024 13.3325 22.4042C13.9059 24.906 15.207 27.1821 17.072 28.9456C18.9369 30.7092 21.2821 31.8811 23.8121 32.3139C26.342 32.7466 28.9435 32.4208 31.2885 31.3774"
                strokeWidth="2.43902"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M37.8762 37.8345C40.2128 36.7722 42.1826 35.0421 43.5375 32.8621C44.8923 30.6821 45.5715 28.1498 45.4895 25.5844C45.4074 23.0191 44.5678 20.5354 43.0764 18.4464C41.5851 16.3574 39.5087 14.7567 37.109 13.8459C34.7093 12.9352 32.0937 12.7552 29.5919 13.3286C27.0901 13.902 24.814 15.2031 23.0505 17.0681C21.2869 18.933 20.115 21.2782 19.6822 23.8082C19.2495 26.3381 19.5753 28.9396 20.6187 31.2846"
                strokeWidth="2.43902"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.1719 37.8744C15.2339 40.211 16.9639 42.1809 19.1437 43.5359C21.3236 44.8909 23.8558 45.5703 26.4211 45.4885C28.9865 45.4066 31.4702 44.5673 33.5592 43.0761C35.6483 41.585 37.2492 39.5088 38.1603 37.1093C39.0713 34.7098 39.2516 32.0942 38.6785 29.5924C38.1054 27.0905 36.8046 24.8143 34.9399 23.0506C33.0752 21.2869 30.7302 20.1146 28.2003 19.6815C25.6705 19.2484 23.069 19.5738 20.7239 20.6169"
                strokeWidth="2.43902"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.1227 14.1692C11.7861 15.2313 9.81612 16.9612 8.46113 19.1411C7.10614 21.3209 6.42674 23.8531 6.50856 26.4184C6.59038 28.9838 7.42975 31.4675 8.92088 33.5566C10.412 35.6456 12.4882 37.2466 14.8877 38.1576C17.2873 39.0686 19.9028 39.2489 22.4046 38.6758C24.9065 38.1027 27.1827 36.8019 28.9464 34.9372C30.7102 33.0725 31.8824 30.7275 32.3155 28.1977C32.7486 25.6678 32.4232 23.0664 31.3802 20.7212"
                strokeWidth="2.43902"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="our-projects-options__item-text">
            <div className="our-projects-options__item-name">Алтын Бесік</div>
            <Link href="/" className="our-projects-options__item-link">
              <span>{tHome("learnMore")}</span>
              <RightOutlined />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProjects;
