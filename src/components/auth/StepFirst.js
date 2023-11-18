"use client";
import Image from "next/image";
import { Button, Form, Input, Select } from "antd";
import ImageUploading from "react-images-uploading";
import { useTranslation } from "@/app/i18n/client";
import UploadImageIcon from "@/components/UploadImageIcon";

const StepFirst = ({
  lng,
  form,
  onChangeAvatar,
  onFinish,
  setName,
  setSurname,
  setMiddlename,
  setGender,
  setEmail,
  setPassword,
  emailCheck,
  avatar,
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
        <div className="form-item form-item--full">
          <Form.Item
            name="name"
            label={t("name")}
            rules={[
              {
                required: true,
                message: t("requiredField"),
              },
            ]}
          >
            <Input
              onChange={(e) => setName(e.target.value)}
              placeholder={t("placeholderName")}
            />
          </Form.Item>
          <Form.Item name="surname" label={t("lastname")}>
            <Input
              onChange={(e) => setSurname(e.target.value)}
              placeholder={t("placeholderLastName")}
            />
          </Form.Item>
          <Form.Item name="middlename" label={t("middlename")}>
            <Input
              onChange={(e) => setMiddlename(e.target.value)}
              placeholder={t("placeholderMiddleName")}
            />
          </Form.Item>
        </div>
        <div className="form-auto">
          <Form.Item label={t("photo")} name="photo">
            <ImageUploading
              value={avatar}
              onChange={onChangeAvatar}
              dataURLKey="data_url"
            >
              {({ imageList, onImageUpload, isDragging, dragProps }) => {
                return (
                  <div
                    className="upload__image-wrapper"
                    style={isDragging ? { border: "1px solid red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    {imageList?.length ? (
                      <div className="upload__image-item">
                        <Image
                          className="upload__image-src"
                          src={avatar[0]["data_url"]}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </div>
                    ) : (
                      <UploadImageIcon text={t("download")} />
                    )}
                  </div>
                );
              }}
            </ImageUploading>
          </Form.Item>
        </div>
      </div>
      <Form.Item
        name="gender"
        label={t("gender")}
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <Select
          placeholder={t("labelSelectGender")}
          style={{
            width: "100%",
          }}
          allowClear
          options={[
            {
              value: "MALE",
              label: t("male"),
            },
            {
              value: "FEMALE",
              label: t("female"),
            },
          ]}
          onChange={(name) => setGender(name)}
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: t("rulesEmail"),
          },
          {
            required: true,
            message: t("requiredField"),
          },
          () => ({
            validator() {
              if (emailCheck === false) {
                return Promise.resolve();
              } else {
                return Promise.reject(new Error(t("rulesCheckEmail")));
              }
            },
          }),
        ]}
      >
        <Input
          onChange={(e) => setEmail(e)}
          autoComplete="off"
          placeholder={t("placeholderEmail")}
        />
      </Form.Item>
      <Form.Item
        name="password"
        label={t("password")}
        hasFeedback
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
          {
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            message: t("rulesCheckTryPassword"),
          },
        ]}
      >
        <Input.Password
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          placeholder={t("placeholderEnterPassword")}
        />
      </Form.Item>

      <Form.Item
        label={t("confirmPassword")}
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: t("rulesEnterConfirmPassword"),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t("rulesCheckPassword")));
            },
          }),
        ]}
      >
        <Input.Password placeholder={t("placeholderEnterConfirmPassword")} />
      </Form.Item>
      <div
        className="form-btns"
        style={{
          marginTop: 24,
        }}
      >
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

export default StepFirst;
