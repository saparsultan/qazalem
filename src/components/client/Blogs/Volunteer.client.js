"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, Input, Modal, Pagination, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import InformationService from "@/services/InformationService";
import UserService from "@/services/UserService";
import { LINK_URLS } from "@/utils/constants";
import EmptyBlock from "@/components/server/EmptyBlock";
import locationLogo from "@/assets/img/icons/location.svg";
import educationLogo from "@/assets/img/icons/education.svg";
import bookLogo from "@/assets/img/icons/book.svg";

const VolunteerClient = ({ lng }) => {
  const [modal, contextHolder] = Modal.useModal();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t: tMessage } = useTranslation(lng, "message");
  const { t: tHome } = useTranslation(lng, "home");
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tDefault } = useTranslation(lng, "default");
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [pagination, setPagination] = useState(1);

  const searchQuery =
    searchParams.get("search") && searchParams.get("search") !== null
      ? searchParams.get("search")
      : "";
  const cityQuery =
    searchParams.get("city") && searchParams.get("city") !== null
      ? searchParams.get("city")
      : "";
  const educationQuery =
    searchParams.get("education") && searchParams.get("education") !== null
      ? searchParams.get("education")
      : "";
  const skillsQuery =
    searchParams.get("skill") && searchParams.get("skill") !== null
      ? searchParams.get("skill")
      : "";

  useEffect(() => {
    if (searchQuery && searchQuery !== "") {
      setSearch(searchQuery);
    }
    if (cityQuery && cityQuery !== "") {
      setCity(cityQuery);
    }
    if (educationQuery && educationQuery !== "") {
      setEducation(+educationQuery);
    }
    if (skillsQuery && skillsQuery !== "") {
      setSkills(+skillsQuery);
    }
  }, [searchQuery, cityQuery, educationQuery, skillsQuery]);

  const dataEducation = useQuery({
    queryKey: ["blogVolunteerEducationName", lng],
    queryFn: async () => {
      const { data } = await UserService.getProfileVolunteerEducation(lng);
      return data;
    },
  });

  const dataSkills = useQuery({
    queryKey: ["blogVolunteerSkills", lng],
    queryFn: async () => {
      const { data } = await UserService.getProfileVolunteerSkills(lng);
      return data;
    },
  });

  console.log({ dataSkills });

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [
      "blogVolunteerList",
      searchQuery,
      cityQuery,
      educationQuery,
      skillsQuery,
      pagination,
      lng,
    ],
    queryFn: async () => {
      const formData = {
        lang: lng,
        search: searchQuery,
        city: cityQuery,
        education: educationQuery,
        skills: skillsQuery,
        page: pagination,
        page_size: "",
      };
      const { data } = await InformationService.getVolunteerList(formData);
      return data;
    },
  });

  const getEducationNameLabel = (value) => {
    return (
      dataEducation?.data?.length &&
      dataEducation?.data?.filter((i) => i?.id === value)[0]?.name
    );
  };

  const getSkillsLabel = (value) => {
    return (
      dataSkills?.data?.length &&
      dataSkills?.data?.filter((i) => i?.id === value)[0]?.name
    );
  };

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
  };

  const onChangeEducation = (value) => {
    if (value === undefined) {
      setEducation("");
    } else {
      setEducation(value);
    }
  };

  const onChangeSkills = (value) => {
    if (value === undefined) {
      setSkills("");
    } else {
      setSkills(value);
    }
  };

  const onChangeSize = (current) => {
    setPagination(current);
  };

  const onSubmitFilter = () => {
    router.push(
      `${pathname}?search=${search}&city=${city}&education=${education}&skill=${skills}`,
    );
  };

  const onResetFilter = () => {
    setSearch("");
    setCity("");
    setEducation(0);
    setSkills(0);
    router.push(`${pathname}`);
  };

  return (
    <>
      <div className="publish publish--one">
        <div className="publish-filter publish-filter--horizontal">
          <div className="publish-filter__search">
            <Input
              addonBefore={<SearchOutlined />}
              placeholder={`${tForm("search")}...`}
              allowClear
              value={search}
              onChange={onChangeSearch}
            />
          </div>
          <div className="publish-filter__select">
            <Input
              placeholder={tForm("searchCity")}
              allowClear
              value={city}
              onChange={onChangeCity}
            />
          </div>
          <div className="publish-filter__select">
            <Select
              allowClear
              placeholder={tForm("skills")}
              style={{
                width: 120,
              }}
              onChange={onChangeSkills}
              value={
                skills && skills !== ""
                  ? {
                      value: skills,
                      label: getSkillsLabel(skills),
                    }
                  : null
              }
              options={
                dataSkills?.data?.length &&
                dataSkills?.data.map(({ id, name }) => {
                  return {
                    value: id,
                    label: name,
                  };
                })
              }
            />
          </div>
          <div className="publish-filter__select">
            <Select
              allowClear
              placeholder={tForm("education")}
              style={{
                width: 120,
              }}
              onChange={onChangeEducation}
              value={
                education && education !== ""
                  ? {
                      value: education,
                      label: getEducationNameLabel(education),
                    }
                  : null
              }
              options={
                dataEducation?.data?.length &&
                dataEducation?.data.map(({ id, name }) => {
                  return {
                    value: id,
                    label: name,
                  };
                })
              }
            />
          </div>
          <div className="publish-filter__action">
            <div className="publish-filter__submit">
              <Button type="primary" onClick={onSubmitFilter}>
                {tForm("apply")}
              </Button>
            </div>
            <div className="publish-filter__submit">
              <Button onClick={onResetFilter}>{tForm("reset")}</Button>
            </div>
          </div>
        </div>
        {!isLoading && isSuccess && data?.results.length > 0 ? (
          <div className="publish-grid publish-grid--three">
            {data &&
              data?.results.map(({ id, volunteer, education_name, skills }) => {
                return (
                  <div className="blog-profile" key={id}>
                    <div className="blog-profile-image">
                      <Image
                        src={volunteer?.image}
                        alt={volunteer?.firstname}
                        priority
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="blog-profile__title">
                      {volunteer?.lastname} {volunteer?.firstname}{" "}
                      {volunteer?.middlename}
                    </div>
                    <div className="blog-profile-info">
                      {education_name &&
                        education_name.map(({ id, name }, i) => {
                          return (
                            <div className="blog-profile-info__item" key={id}>
                              <Image
                                src={educationLogo}
                                alt="education logo"
                                className="blog-profile-info__item-logo"
                              />
                              <div className="blog-profile-info__item-text">
                                {name}
                              </div>
                            </div>
                          );
                        })}
                      <div className="blog-profile-info__item">
                        <Image
                          src={bookLogo}
                          alt="skills logo"
                          className="blog-profile-info__item-logo"
                        />
                        <div className="blog-profile-info__item-text">
                          {skills && skills.map(({ name }) => name).join(", ")}
                        </div>
                      </div>
                      <div className="blog-profile-info__item">
                        <Image
                          src={locationLogo}
                          alt="loaction logo"
                          className="blog-profile-info__item-logo"
                        />
                        <div className="blog-profile-info__item-text">
                          {volunteer?.personal_data?.city}
                        </div>
                      </div>
                    </div>
                    <div
                      className="blog-profile-footer"
                      style={{
                        gridTemplateColumns: "1fr",
                      }}
                    >
                      <Link
                        href={`/${lng}/${LINK_URLS.volunteer}/${id}`}
                        className="blog-profile-footer__btn btn btn-link btn-prime"
                        style={{
                          width: "100%",
                        }}
                      >
                        {tHome("learnMore")}
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="publish-empty">
            <EmptyBlock description={tDefault("noResultsFound")} />
          </div>
        )}
        {!isLoading && isSuccess && data?.results.length > 0 && (
          <div className="publish-pagination">
            <Pagination
              onChange={onChangeSize}
              defaultCurrent={pagination}
              total={data?.count}
            />
          </div>
        )}
      </div>
      {contextHolder}
    </>
  );
};

export default VolunteerClient;
