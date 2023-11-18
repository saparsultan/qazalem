import $api, { $apiPrivate } from "@/utils/http";
import { BASE_URL } from "@/utils/constants";

export default class AuthService {
  static config(lng) {
    return $api.get(`config/?lang=${lng}`);
  }
  static async emailExists(data) {
    return $api.post("email_exists/", { email: data });
  }

  static async login(email, password) {
    // console.log(apiInstance);
    return $api.post(
      `login/`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      },
    );
  }

  static async refresh(token) {
    // console.log(apiInstance);
    return $api.post(
      "login/refresh/",
      { refresh: token },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      },
    );
  }

  static async registerStepFirst(
    firstname,
    lastname,
    middlename,
    email,
    gender,
    password,
    image,
  ) {
    return $api.post(
      "register/step/main/",
      {
        firstname,
        lastname,
        middlename,
        email,
        gender,
        password,
        image,
      },
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
  }
  static async registerStepSecond(
    token,
    iin_p_d,
    citizenship,
    field_of_activity,
    country,
    date_of_birth,
    city,
    phone_number,
    profession,
    course,
    education,
  ) {
    return $api.post(
      "register/step/personal_data",
      {
        iin_p_d,
        citizenship,
        field_of_activity,
        country,
        date_of_birth,
        city,
        phone_number,
        profession,
        course,
        education,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  static async registerStepThird(
    token,
    facebook,
    instagram,
    tiktok,
    vk,
    twitter,
    youtube,
    discord,
    linkedin,
  ) {
    return $api.post(
      "register/step/social_network",
      {
        facebook,
        instagram,
        tiktok,
        vk,
        twitter,
        youtube,
        discord,
        linkedin,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  static async registerStepFourth(
    token,
    move_to_kazakhstan,
    instrument_play,
    volunteer,
    abilities,
    benefit,
  ) {
    return $api.post(
      "register/step/additional_information",
      {
        move_to_kazakhstan,
        instrument_play,
        volunteer,
        abilities,
        benefit,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
