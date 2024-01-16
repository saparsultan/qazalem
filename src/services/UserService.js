import $api, { $apiPrivate } from "@/utils/http";

export default class UserService {
  // static getUserMain(id, token) {
  //   return $apiPrivate.get(`user/profile/main/${id}`, {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  // }
  static getUserPersonal(id, token) {
    return $apiPrivate.get(`user/profile/personal/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static getUserSocial(id, token) {
    return $apiPrivate.get(`user/profile/social/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static getUserAdditional(id, token) {
    return $apiPrivate.get(`user/profile/additional/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static updateMain(id, token, data) {
    return $apiPrivate.put(`user/profile/main/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static updatePersonal(id, token, data) {
    return $apiPrivate.put(`user/profile/personal/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static updateSocial(id, token, data) {
    return $apiPrivate.put(`user/profile/social/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static updateAdditional(id, token, data) {
    return $apiPrivate.put(`user/profile/additional/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static updatePassword(id, token, data) {
    return $apiPrivate.put(`user/profile/password/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static registerEvents(token, data) {
    return $apiPrivate.post("events/register_events", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static getSelectEvents(lang) {
    return $api.get(`events/select_events?lang=${lang}`);
  }

  static getSelectGuideTypeEx(lang) {
    return $api.get(`guide/type_ex/?lang=${lang}`);
  }
  static registerGuide(token, data, lang) {
    return $apiPrivate.post(`guide/register?lang=${lang}`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static registerGuideVideo(token, data) {
    return $apiPrivate.post("guide/video", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static getDescriptionGuide(token) {
    return $apiPrivate.get(`guide`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static updateDescriptionGuide(id, token, data) {
    return $apiPrivate.put(`guide/update/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static getProfileGuideVideo(token) {
    return $apiPrivate.get(`guide/personal/video`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static updateProfileGuideVideo(id, token, data) {
    return $apiPrivate.put(`guide/video/update/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static registerVolunteer(token, data, lang) {
    return $apiPrivate.post(`volunteer/register?lang=${lang}`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static registerVolunteerGallery(token, data) {
    return $apiPrivate.post("volunteer/gallery", data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static updateVolunteerGallery(id, token, data) {
    return $apiPrivate.put(`volunteer/gallery/update/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static deleteVolunteerGallery(id, token) {
    return $apiPrivate.delete(`volunteer/gallery/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static getProfileVolunteerEducation(lang) {
    return $api.get(`volunteer/education/all?lang=${lang}`);
  }
  static getProfileVolunteerSkills(lang) {
    return $api.get(`volunteer/skills/get?lang=${lang}`);
  }
  static getMyProfileVolunteer(token) {
    return $api.get("volunteer/get", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static updateMyProfileVolunteer(token, data) {
    return $apiPrivate.put("volunteer/update", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static getMyProfileVolunteerGallery(token) {
    return $api.get("volunteer/gallery/get", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static createVolunteerEducationName(token, data) {
    return $apiPrivate.post("volunteer/education_name", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static getVolunteerEducationName(token) {
    return $apiPrivate.get("volunteer/education_name/get", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static updateVolunteerEducationName(id, token, data) {
    return $apiPrivate.put(`volunteer/education_name/update/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static deleteVolunteerEducationName(id, token) {
    return $apiPrivate.delete(`volunteer/education_name/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  static createVolunteerBecameParticipants(token, data) {
    return $apiPrivate.post("volunteer/became_participants", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static getVolunteerBecameParticipants(token) {
    return $apiPrivate.get("volunteer/became_participants/get", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static updateVolunteerBecameParticipants(id, token, data) {
    return $apiPrivate.put(`volunteer/became_participants/update/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static deleteVolunteerBecameParticipants(id, token) {
    return $apiPrivate.delete(`volunteer/became_participants/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
}
