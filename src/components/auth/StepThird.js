"use client";
import { Button, Form, Input } from "antd";
import { useTranslation } from "@/app/i18n/client";

const StepThird = ({
  lng,
  form,
  onFinish,
  onBack,
  setFacebook,
  setTwit,
  setInsta,
  setYouTube,
  setTikTok,
  setDiscord,
  setVk,
  setLinkedIn,
}) => {
  const { t } = useTranslation(lng, "form");
  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <div className="form-row">
        <div className="form-item">
          <Form.Item name="facebook" label="Facebook">
            <Input
              placeholder={t("placeholderProvideLink")}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="instagram" label="Instagram">
            <Input
              placeholder={t("placeholderProvideLink")}
              onChange={(e) => setInsta(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="tiktok" label="TikTok">
            <Input
              placeholder={t("placeholderProvideLink")}
              onChange={(e) => setTikTok(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="vk" label="VK">
            <Input
              placeholder={t("placeholderProvideLink")}
              onChange={(e) => setVk(e.target.value)}
            />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item name="twitter" label="Twitter">
            <Input
              placeholder={t("placeholderProvideLink")}
              onChange={(e) => setTwit(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="youtube" label="YouTube">
            <Input
              placeholder={t("placeholderProvideLink")}
              onChange={(e) => setYouTube(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="discord" label="Discord">
            <Input
              placeholder={t("placeholderProvideLink")}
              onChange={(e) => setDiscord(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="linkedin" label="LinkedIn">
            <Input
              placeholder={t("placeholderProvideLink")}
              onChange={(e) => setLinkedIn(e.target.value)}
            />
          </Form.Item>
        </div>
      </div>
      <div
        className="form-btns"
        style={{
          marginTop: 24,
        }}
      >
        <Button onClick={onBack}>{t("prev")}</Button>
        <Button
          type="primary"
          style={{
            marginLeft: "auto",
          }}
          htmlType="submit"
        >
          {t("next")}
        </Button>
      </div>
    </Form>
  );
};

export default StepThird;
