"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { App, Button, Form, Input, Radio, Skeleton } from "antd";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import UserService from "@/services/UserService";

const AdditionalInfo = ({ lng }) => {
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const { data: session } = useSession();
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tMessage } = useTranslation(lng, "message");
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess } = useInfiniteQuery({
    queryKey: ["userAdditional", session?.user?.id, session?.accessToken],
    queryFn: async () => {
      const sessionId =
        session && session?.user && session?.user?.id ? session?.user?.id : "";
      const { data } = await UserService.getUserAdditional(
        sessionId,
        session?.accessToken,
      );
      return data;
    },
  });

  useEffect(() => {
    form.setFieldsValue({
      relocate: data?.pages[0]?.move_to_kazakhstan,
      ability: data?.pages[0]?.abilities,
      instrument: data?.pages[0]?.instrument_play,
      benefit: data?.pages[0]?.benefit,
      volunteer: data?.pages[0]?.volunteer,
    });
  }, [isSuccess]);

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (value) => {
      const formData = {
        move_to_kazakhstan: value?.relocate,
        abilities: value?.ability,
        instrument_play: value?.instrument,
        benefit: value?.benefit,
        volunteer: value?.volunteer,
      };
      await UserService.updateAdditional(
        session?.user?.id,
        session?.accessToken,
        formData,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["userAdditional"]);
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
      console.error("Error update additional info", error);
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
            <Form.Item name="relocate" label={tForm("doYouWantMove")}>
              <Input placeholder={tForm("youAnswer")} />
            </Form.Item>
            <Form.Item name="ability" label={tForm("whatAbilities")}>
              <Input placeholder={tForm("youAnswer")} />
            </Form.Item>
            <Form.Item name="instrument" label={tForm("whatInstrumentPlay")}>
              <Input placeholder={tForm("youAnswer")} />
            </Form.Item>
            <Form.Item name="benefit" label={tForm("whatBringEvents")}>
              <Input placeholder={tForm("youAnswer")} />
            </Form.Item>
            <Form.Item name="volunteer" label={tForm("youVolunteer")}>
              <Radio.Group>
                <Radio value={true}>{tForm("yes")}</Radio>
                <Radio value={false}>{tForm("no")}</Radio>
              </Radio.Group>
            </Form.Item>
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

export default AdditionalInfo;
