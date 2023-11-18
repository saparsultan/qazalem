"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { App, Button, Form, Input, Skeleton } from "antd";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import UserService from "@/services/UserService";

const SocialInfo = ({ lng }) => {
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const { data: session } = useSession();
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tMessage } = useTranslation(lng, "message");
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess } = useInfiniteQuery({
    queryKey: ["userSocial", session?.user?.id, session?.accessToken],
    queryFn: async () => {
      const sessionId =
        session && session?.user && session?.user?.id ? session?.user?.id : "";
      const { data } = await UserService.getUserSocial(
        sessionId,
        session?.accessToken,
      );
      return data;
    },
  });

  useEffect(() => {
    form.setFieldsValue({
      facebook: data?.pages[0]?.facebook,
      instagram: data?.pages[0]?.instagram,
      tiktok: data?.pages[0]?.tiktok,
      vk: data?.pages[0]?.vk,
      twitter: data?.pages[0]?.twitter,
      youtube: data?.pages[0]?.youtube,
      discord: data?.pages[0]?.discord,
      linkedin: data?.pages[0]?.linkedin,
    });
  }, [isSuccess]);

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (value) => {
      const formData = {
        facebook: value?.facebook,
        instagram: value?.instagram,
        tiktok: value?.tiktok,
        vk: value?.vk,
        twitter: value?.twitter,
        youtube: value?.youtube,
        discord: value?.discord,
        linkedin: value?.linkedin,
      };
      await UserService.updateSocial(
        session?.user?.id,
        session?.accessToken,
        formData,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["userSocial"]);
      await notification.success({
        message: tMessage("success"),
        description: tMessage("updateProfileSuccess"),
        placement: "topRight",
      });
    },
    onError: async (error) => {
      await notification.error({
        message: tMessage("error"),
        description: tMessage("updateProfileError"),
        placement: "topRight",
      });
      console.error("Error update social info", error);
    },
  });

  return (
    <div className="profile-form">
      <Form
        form={form}
        onFinish={onSubmitForm}
        name="validateOnly"
        layout="vertical"
      >
        {isLoading && !isSuccess ? (
          <Skeleton
            paragraph={{
              rows: 8,
            }}
          />
        ) : (
          <>
            <div className="form-row">
              <div className="form-item">
                <Form.Item name="facebook" label="Facebook">
                  <Input placeholder={tForm("placeholderProvideLink")} />
                </Form.Item>
                <Form.Item name="instagram" label="Instagram">
                  <Input placeholder={tForm("placeholderProvideLink")} />
                </Form.Item>
                <Form.Item name="tiktok" label="TikTok">
                  <Input placeholder={tForm("placeholderProvideLink")} />
                </Form.Item>
                <Form.Item name="vk" label="VK">
                  <Input placeholder={tForm("placeholderProvideLink")} />
                </Form.Item>
              </div>
              <div className="form-item">
                <Form.Item name="twitter" label="Twitter">
                  <Input placeholder={tForm("placeholderProvideLink")} />
                </Form.Item>
                <Form.Item name="youtube" label="YouTube">
                  <Input placeholder={tForm("placeholderProvideLink")} />
                </Form.Item>
                <Form.Item name="discord" label="Discord">
                  <Input placeholder={tForm("placeholderProvideLink")} />
                </Form.Item>
                <Form.Item name="linkedin" label="LinkedIn">
                  <Input placeholder={tForm("placeholderProvideLink")} />
                </Form.Item>
              </div>
            </div>
            <Button
              type="primary"
              style={{
                marginLeft: "auto",
              }}
              htmlType="submit"
            >
              {tForm("save")}
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default SocialInfo;
