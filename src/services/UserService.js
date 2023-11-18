import $api, { $apiPrivate } from "@/utils/http";

export default class UserService {
  static getUserMain(id, token) {
    return $apiPrivate.get(`user/profile/main/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
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
  static registerGuide(token, data) {
    return $apiPrivate.post("guide/register", data, {
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
}
