import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, App, Button, Form, Input, Select, Skeleton } from "antd";
import { useTranslation } from "@/app/i18n/client";
import UserService from "@/services/UserService";

const FormGuide = ({ lng }) => {
  const { data: session } = useSession();
  const { message, modal, notification } = App.useApp();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tMessage } = useTranslation(lng, "message");

  const {
    data: dataEducation,
    isLoading: isLoadingEducation,
    isSuccess: isSuccessEducation,
  } = useQuery({
    queryKey: ["volunteerEducationAll"],
    queryFn: async () => {
      const { data } = await UserService.getProfileVolunteerEducation(lng);
      return data;
    },
  });

  const {
    data: dataSkills,
    isLoading: isLoadingSkills,
    isSuccess: isSuccessSkills,
  } = useQuery({
    queryKey: ["volunteerSkillsAll", lng],
    queryFn: async () => {
      const { data } = await UserService.getProfileVolunteerSkills(lng);
      return data;
    },
  });

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["myVolunteerInfo", session?.accessToken],
    queryFn: async () => {
      const { data } = await UserService.getMyProfileVolunteer(
        session?.accessToken,
      );
      return data;
    },
  });

  useEffect(() => {
    form.setFieldsValue({
      descriptionFilledKz: data?.description_kk,
      descriptionFilledRu: data?.description_ru,
      descriptionFilledEn: data?.description_en,
      descriptionFilledCn: data?.description_cn,
      skillsDescriptionFilledKk: data?.skills_description_kk,
      skillsDescriptionFilledRu: data?.skills_description_ru,
      skillsDescriptionFilledEn: data?.skills_description_en,
      skillsDescriptionFilledCn: data?.skills_description_cn,
      educationDescriptionFilledKk: data?.education_description_kk,
      educationDescriptionFilledRu: data?.education_description_ru,
      educationDescriptionFilledEn: data?.education_description_en,
      educationDescriptionFilledCn: data?.education_description_cn,
      educationFilled: data?.education,
      skillsFilled: data?.skills,
    });
  }, [isLoading, isSuccess]);

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (values) => {
      const formData = {
        description_kk: values.descriptionKz,
        description_en: values.descriptionEn,
        description_ru: values.descriptionRu,
        description_cn: values.descriptionCn,
        skills_description_kk: values.skillsDescriptionKk,
        skills_description_en: values.skillsDescriptionEn,
        skills_description_ru: values.skillsDescriptionRu,
        skills_description_cn: values.skillsDescriptionCn,
        education_description_kk: values.educationDescriptionKk,
        education_description_en: values.educationDescriptionEn,
        education_description_ru: values.educationDescriptionRu,
        education_description_cn: values.educationDescriptionCn,
        education: values.education,
        skills: values.skills,
      };
      await UserService.registerVolunteer(session?.accessToken, formData, lng);
    },
    onSuccess: async () => {
      await message.success(tMessage("registerSuccessVolunteer"));
      await form.setFieldsValue({
        descriptionKz: "",
        descriptionEn: "",
        descriptionRu: "",
        descriptionCn: "",
        skillsDescriptionKk: "",
        skillsDescriptionEn: "",
        skillsDescriptionRu: "",
        skillsDescriptionCn: "",
        educationDescriptionKk: "",
        educationDescriptionEn: "",
        educationDescriptionRu: "",
        educationDescriptionCn: "",
        education: [],
        skills: [],
      });
    },
    onError: async (error) => {
      // console.error("Error register volunteer form", error);
      if (error.response.status === 400) {
        await modal.warning({
          title: tMessage("warning"),
          content: (
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                listStyle: "disc",
              }}
            >
              {error.response.data.city && <li>{error.response.data.city}</li>}
              {error.response.data.image && (
                <li>{error.response.data.image}</li>
              )}
              {error.response.data.middlename && (
                <li>{error.response.data.middlename}</li>
              )}
              {error.response.data.phone_number && (
                <li>{error.response.data.phone_number}</li>
              )}
              {error.response.data.instagram && (
                <li>{error.response.data.instagram}</li>
              )}
            </ul>
          ),
        });
      } else {
        await message.error(tMessage("registerError"));
      }
    },
  });

  const { mutate: onUpdateForm } = useMutation({
    mutationFn: async (value) => {
      const formData = {
        description_kk: value?.descriptionFilledKz,
        description_ru: value?.descriptionFilledRu,
        description_en: value?.descriptionFilledEn,
        description_cn: value?.descriptionFilledCn,
        skills_description_kk: value?.skillsDescriptionFilledKk,
        skills_description_ru: value?.skillsDescriptionFilledRu,
        skills_description_en: value?.skillsDescriptionFilledEn,
        skills_description_cn: value?.skillsDescriptionFilledCn,
        education_description_kk: value?.educationDescriptionFilledKk,
        education_description_ru: value?.educationDescriptionFilledRu,
        education_description_en: value?.educationDescriptionFilledEn,
        education_description_cn: value?.educationDescriptionFilledCn,
        education: value?.educationFilled,
        skills: value?.skillsFilled,
      };
      await UserService.updateMyProfileVolunteer(
        session?.accessToken,
        formData,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["myVolunteerInfo"]);
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
      console.error("Error update volunteer info", error);
    },
  });

  return (
    <div className="profile-form">
      {!session?.user ? (
        <Skeleton />
      ) : session?.user?.volunteer_id ? (
        <Form
          form={form}
          name="validateOnlyVolunteer"
          layout="vertical"
          onFinish={onUpdateForm}
        >
          <Form.Item
            name="descriptionFilledKz"
            label={tForm("descriptionKz")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="descriptionFilledRu"
            label={tForm("descriptionRu")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="descriptionFilledEn"
            label={tForm("descriptionEn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="descriptionFilledCn"
            label={tForm("descriptionCn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="skillsDescriptionFilledKk"
            label={tForm("skillsDescriptionKz")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="skillsDescriptionFilledRu"
            label={tForm("skillsDescriptionRu")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="skillsDescriptionFilledEn"
            label={tForm("skillsDescriptionEn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="skillsDescriptionFilledCn"
            label={tForm("skillsDescriptionCn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="educationDescriptionFilledKk"
            label={tForm("educationDescriptionKz")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="educationDescriptionFilledRu"
            label={tForm("educationDescriptionRu")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="educationDescriptionFilledEn"
            label={tForm("educationDescriptionEn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="educationDescriptionFilledCn"
            label={tForm("educationDescriptionCn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="educationFilled"
            label={tForm("education")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Select
              placeholder={tForm("chooseEducation")}
              mode="multiple"
              allowClear
              options={
                !isLoadingEducation &&
                isSuccessEducation &&
                dataEducation?.length &&
                dataEducation.map(({ id, name }) => {
                  return {
                    value: id,
                    label: name,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="skillsFilled"
            label={tForm("skills")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Select
              placeholder={tForm("chooseSkills")}
              mode="multiple"
              allowClear
              options={
                !isLoadingSkills &&
                isSuccessSkills &&
                dataSkills?.length &&
                dataSkills.map(({ id, name }) => {
                  return {
                    value: id,
                    label: name,
                  };
                })
              }
            />
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
        </Form>
      ) : (
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          onFinish={onSubmitForm}
        >
          {!session?.user?.volunteer_id && (
            <Alert
              className="ant-form__alert-info"
              message={`${tMessage("attention")}!`}
              description={tMessage("attentionDescVolunteer")}
              type="warning"
              showIcon
            />
          )}
          <Form.Item
            name="descriptionKz"
            label={tForm("descriptionKz")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="descriptionRu"
            label={tForm("descriptionRu")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="descriptionEn"
            label={tForm("descriptionEn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="descriptionCn"
            label={tForm("descriptionCn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="skillsDescriptionKk"
            label={tForm("skillsDescriptionKz")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="skillsDescriptionRu"
            label={tForm("skillsDescriptionRu")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="skillsDescriptionEn"
            label={tForm("skillsDescriptionEn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="skillsDescriptionCn"
            label={tForm("skillsDescriptionCn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="educationDescriptionKk"
            label={tForm("educationDescriptionKz")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="educationDescriptionRu"
            label={tForm("educationDescriptionRu")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="educationDescriptionEn"
            label={tForm("educationDescriptionEn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="educationDescriptionCn"
            label={tForm("educationDescriptionCn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="education"
            label={tForm("education")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Select
              placeholder={tForm("chooseEducation")}
              mode="multiple"
              allowClear
              options={
                !isLoadingEducation &&
                isSuccessEducation &&
                dataEducation?.length &&
                dataEducation.map(({ id, name }) => {
                  return {
                    value: id,
                    label: name,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="skills"
            label={tForm("skills")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Select
              placeholder={tForm("chooseSkills")}
              mode="multiple"
              allowClear
              options={
                !isLoadingSkills &&
                isSuccessSkills &&
                dataSkills?.length &&
                dataSkills.map(({ id, name }) => {
                  return {
                    value: id,
                    label: name,
                  };
                })
              }
            />
          </Form.Item>
          <Button
            type="primary"
            style={{
              marginLeft: "auto",
            }}
            htmlType="submit"
          >
            {tForm("sendRequest")}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default FormGuide;
