"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  VKShareButton,
  VKIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import { Modal } from "antd";
import ImageGallery from "react-image-gallery";
import { RedableFormat } from "@/utils/dayjs";
import { SITE_URL } from "@/utils/constants";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { useTranslation } from "@/app/i18n/client";

const BlogContentPageClient = ({ data, lng, noArticleWidget }) => {
  const shareUrl = SITE_URL;
  const { t: tDefault } = useTranslation(lng, "default");
  const { t: tForm } = useTranslation(lng, "form");
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const dynamicImages = data?.dynamic_images
    ? data?.dynamic_images.map(({ id, image }) => {
        return {
          key: id,
          original: image,
          thumbnail: image,
          originalAlt: `original-${id++}`,
          thumbnailAlt: `thumbnail-${id++}`,
        };
      })
    : null;

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="publdet-content-wrap">
        {!noArticleWidget && (
          <div className="article-widget">
            <div className="article-widget__item article-widget__item--left">
              <div
                className="article-widget__back"
                onClick={() => router.back()}
                title={tForm("prev")}
              >
                <svg
                  className="article-widget__icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.8248 10.0008L10.7248 12.9008C10.9248 13.1008 11.0206 13.3341 11.0123 13.6008C11.004 13.8674 10.9081 14.1008 10.7248 14.3008C10.5248 14.5008 10.2915 14.6049 10.0248 14.6133C9.75814 14.6216 9.5248 14.5258 9.3248 14.3258L4.6998 9.70078C4.5998 9.60078 4.52897 9.49245 4.4873 9.37578C4.44564 9.25911 4.4248 9.13411 4.4248 9.00078C4.4248 8.86745 4.44564 8.74245 4.4873 8.62578C4.52897 8.50911 4.5998 8.40078 4.6998 8.30078L9.2748 3.72578C9.4748 3.52578 9.7123 3.42578 9.9873 3.42578C10.2623 3.42578 10.4998 3.52578 10.6998 3.72578C10.8998 3.92578 10.9998 4.15911 10.9998 4.42578C10.9998 4.69245 10.8998 4.92578 10.6998 5.12578L7.8248 8.00078H16.9998C17.5498 8.00078 18.0206 8.19661 18.4123 8.58828C18.804 8.97995 18.9998 9.45078 18.9998 10.0008V19.0008C18.9998 19.2841 18.904 19.5216 18.7123 19.7133C18.5206 19.9049 18.2831 20.0008 17.9998 20.0008C17.7165 20.0008 17.479 19.9049 17.2873 19.7133C17.0956 19.5216 16.9998 19.2841 16.9998 19.0008V10.0008H7.8248Z"
                    fill="#1C1B1F"
                  />
                </svg>
              </div>
              <div className="article-widget__date">
                <svg
                  className="article-widget__icon article-widget__date-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6C3 5.45 3.19583 4.97917 3.5875 4.5875C3.97917 4.19583 4.45 4 5 4H6V3C6 2.71667 6.09583 2.47917 6.2875 2.2875C6.47917 2.09583 6.71667 2 7 2C7.28333 2 7.52083 2.09583 7.7125 2.2875C7.90417 2.47917 8 2.71667 8 3V4H16V3C16 2.71667 16.0958 2.47917 16.2875 2.2875C16.4792 2.09583 16.7167 2 17 2C17.2833 2 17.5208 2.09583 17.7125 2.2875C17.9042 2.47917 18 2.71667 18 3V4H19C19.55 4 20.0208 4.19583 20.4125 4.5875C20.8042 4.97917 21 5.45 21 6V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H5ZM5 20H19V10H5V20ZM5 8H19V6H5V8Z"
                    fill="#1C1B1F"
                  />
                </svg>
                <div className="article-widget__date-text">
                  <RedableFormat
                    date={data?.published_date}
                    lng={lng}
                    format="D MMMM, YYYY - H:mm"
                  />
                </div>
              </div>
              <div
                className="article-widget__share"
                onClick={showModal}
                title={tDefault("share")}
              >
                <svg
                  className="article-widget__icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 22C17.1667 22 16.4583 21.7083 15.875 21.125C15.2917 20.5417 15 19.8333 15 19C15 18.8833 15.0083 18.7625 15.025 18.6375C15.0417 18.5125 15.0667 18.4 15.1 18.3L8.05 14.2C7.76667 14.45 7.45 14.6458 7.1 14.7875C6.75 14.9292 6.38333 15 6 15C5.16667 15 4.45833 14.7083 3.875 14.125C3.29167 13.5417 3 12.8333 3 12C3 11.1667 3.29167 10.4583 3.875 9.875C4.45833 9.29167 5.16667 9 6 9C6.38333 9 6.75 9.07083 7.1 9.2125C7.45 9.35417 7.76667 9.55 8.05 9.8L15.1 5.7C15.0667 5.6 15.0417 5.4875 15.025 5.3625C15.0083 5.2375 15 5.11667 15 5C15 4.16667 15.2917 3.45833 15.875 2.875C16.4583 2.29167 17.1667 2 18 2C18.8333 2 19.5417 2.29167 20.125 2.875C20.7083 3.45833 21 4.16667 21 5C21 5.83333 20.7083 6.54167 20.125 7.125C19.5417 7.70833 18.8333 8 18 8C17.6167 8 17.25 7.92917 16.9 7.7875C16.55 7.64583 16.2333 7.45 15.95 7.2L8.9 11.3C8.93333 11.4 8.95833 11.5125 8.975 11.6375C8.99167 11.7625 9 11.8833 9 12C9 12.1167 8.99167 12.2375 8.975 12.3625C8.95833 12.4875 8.93333 12.6 8.9 12.7L15.95 16.8C16.2333 16.55 16.55 16.3542 16.9 16.2125C17.25 16.0708 17.6167 16 18 16C18.8333 16 19.5417 16.2917 20.125 16.875C20.7083 17.4583 21 18.1667 21 19C21 19.8333 20.7083 20.5417 20.125 21.125C19.5417 21.7083 18.8333 22 18 22ZM18 6C18.2833 6 18.5208 5.90417 18.7125 5.7125C18.9042 5.52083 19 5.28333 19 5C19 4.71667 18.9042 4.47917 18.7125 4.2875C18.5208 4.09583 18.2833 4 18 4C17.7167 4 17.4792 4.09583 17.2875 4.2875C17.0958 4.47917 17 4.71667 17 5C17 5.28333 17.0958 5.52083 17.2875 5.7125C17.4792 5.90417 17.7167 6 18 6ZM6 13C6.28333 13 6.52083 12.9042 6.7125 12.7125C6.90417 12.5208 7 12.2833 7 12C7 11.7167 6.90417 11.4792 6.7125 11.2875C6.52083 11.0958 6.28333 11 6 11C5.71667 11 5.47917 11.0958 5.2875 11.2875C5.09583 11.4792 5 11.7167 5 12C5 12.2833 5.09583 12.5208 5.2875 12.7125C5.47917 12.9042 5.71667 13 6 13ZM18 20C18.2833 20 18.5208 19.9042 18.7125 19.7125C18.9042 19.5208 19 19.2833 19 19C19 18.7167 18.9042 18.4792 18.7125 18.2875C18.5208 18.0958 18.2833 18 18 18C17.7167 18 17.4792 18.0958 17.2875 18.2875C17.0958 18.4792 17 18.7167 17 19C17 19.2833 17.0958 19.5208 17.2875 19.7125C17.4792 19.9042 17.7167 20 18 20Z"
                    fill="#1C1B1F"
                  />
                </svg>
              </div>
              <Link
                href="https://www.gov.kz/subscribe?lang=ru&slug=qazalem"
                target="_blank"
                className="article-widget__rss"
                title={tDefault("subscribe")}
              >
                <svg
                  className="article-widget__icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 21.0007C4.45 21.0007 3.97917 20.8049 3.5875 20.4132C3.19583 20.0216 3 19.5507 3 19.0007C3 18.4507 3.19583 17.9799 3.5875 17.5882C3.97917 17.1966 4.45 17.0007 5 17.0007C5.55 17.0007 6.02083 17.1966 6.4125 17.5882C6.80417 17.9799 7 18.4507 7 19.0007C7 19.5507 6.80417 20.0216 6.4125 20.4132C6.02083 20.8049 5.55 21.0007 5 21.0007ZM18.475 21.0007C18.075 21.0007 17.7292 20.8591 17.4375 20.5757C17.1458 20.2924 16.975 19.9424 16.925 19.5257C16.7583 17.8924 16.3208 16.3591 15.6125 14.9257C14.9042 13.4924 13.9958 12.2216 12.8875 11.1132C11.7792 10.0049 10.5083 9.09655 9.075 8.38822C7.64167 7.67988 6.10833 7.24238 4.475 7.07572C4.05833 7.02572 3.70833 6.85072 3.425 6.55072C3.14167 6.25072 3 5.89238 3 5.47572C3 5.05905 3.14583 4.71322 3.4375 4.43822C3.72917 4.16322 4.075 4.04238 4.475 4.07572C6.525 4.24238 8.45 4.75905 10.25 5.62572C12.05 6.49238 13.6375 7.61322 15.0125 8.98822C16.3875 10.3632 17.5083 11.9507 18.375 13.7507C19.2417 15.5507 19.7583 17.4757 19.925 19.5257C19.9583 19.9257 19.8333 20.2716 19.55 20.5632C19.2667 20.8549 18.9083 21.0007 18.475 21.0007ZM12.475 21.0007C12.0917 21.0007 11.7458 20.8632 11.4375 20.5882C11.1292 20.3132 10.9333 19.9591 10.85 19.5257C10.55 17.9091 9.81667 16.5174 8.65 15.3507C7.48333 14.1841 6.09167 13.4507 4.475 13.1507C4.04167 13.0674 3.6875 12.8674 3.4125 12.5507C3.1375 12.2341 3 11.8757 3 11.4757C3 11.0424 3.15 10.6924 3.45 10.4257C3.75 10.1591 4.09167 10.0507 4.475 10.1007C6.94167 10.4341 9.04583 11.4716 10.7875 13.2132C12.5292 14.9549 13.5667 17.0591 13.9 19.5257C13.95 19.9091 13.8333 20.2507 13.55 20.5507C13.2667 20.8507 12.9083 21.0007 12.475 21.0007Z"
                    fill="#1C1B1F"
                  />
                </svg>
              </Link>
            </div>
            <div className="article-widget__item article-widget__item--right">
              <div className="article-widget__eye">
                <svg
                  className="article-widget__icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z"
                    fill="#1C1B1F"
                  />
                </svg>
                <div className="article-widget__eye-text">
                  {data?.count_view}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="publdet-content">
          {dynamicImages?.length > 0 ? (
            <ImageGallery items={dynamicImages} showIndex />
          ) : (
            <div className="publdet-content__preview">
              {data && data?.image && (
                <Image
                  src={data?.image}
                  alt={data?.title}
                  priority
                  sizes="(max-width: 768px) 100vw"
                  width={100}
                  height={100}
                  style={{ objectFit: "contain" }}
                  placeholder="empty"
                />
              )}
            </div>
          )}
          <div
            dangerouslySetInnerHTML={{ __html: data?.body_text }}
            className="inner-html"
          />
        </div>
      </div>
      <Modal
        open={open}
        className="modal-share"
        title={tDefault("share")}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <FacebookShareButton
            key="facebook-share"
            url={`${shareUrl}${pathname}`}
            quote={data?.title}
            hashtag={`#${data?.subcategory?.name}`}
          >
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>,
          <TwitterShareButton
            key="vk-share"
            url={`${shareUrl}${pathname}`}
            title={data?.title}
            hashtag={`#${data?.subcategory?.name}`}
          >
            <TwitterIcon size={40} round={true} />
          </TwitterShareButton>,
          <VKShareButton
            key="vk-share"
            url={`${shareUrl}${pathname}`}
            title={data?.title}
            image={data?.image}
          >
            <VKIcon size={40} round={true} />
          </VKShareButton>,
          <TelegramShareButton
            key="telegram-share"
            url={`${shareUrl}${pathname}`}
            title={data?.title}
          >
            <TelegramIcon size={40} round={true} />
          </TelegramShareButton>,
          <WhatsappShareButton
            key="whatsapp-share"
            url={`${shareUrl}${pathname}`}
            title={data?.title}
          >
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>,
        ]}
      ></Modal>
    </>
  );
};

export default BlogContentPageClient;
