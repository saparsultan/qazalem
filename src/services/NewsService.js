import $api from "@/utils/http";

export default class NewsService {
  static getNewsOriginCountryCategory(lng) {
    return $api.get(`news/kazakhstan/subcategory?lang=${lng}`);
  }

  static getNewsOriginCountry({
    lang,
    subcategory,
    published_date_start,
    published_date_end,
    search,
    page_size,
    page,
  }) {
    return $api.get(
      `news/kazakhstan/filter/preview?lang=${lang}&subcategory=${subcategory}&published_date_start=${published_date_start}&published_date_end=${published_date_end}&search=${search}&page=${page}&page_size=${page_size}`,
    );
  }

  static getOneOriginCountry(id, lang) {
    return $api.get(`news/kazakhstan/body?id=${id}&lang=${lang}`);
  }

  static getNewsWorldCategory(lng) {
    return $api.get(`news/world/subcategory?lang=${lng}`);
  }

  static getNewsWorld({
    lang,
    subcategory,
    published_date,
    search,
    page_size,
    page,
  }) {
    return $api.get(
      `news/world/filter/preview?lang=${lang}&subcategory=${subcategory}&published_date=${published_date}&search=${search}&page=${page}&page_size=${page_size}`,
    );
  }

  static getOneNewsWorld(id, lang) {
    return $api.get(`news/world/body?id=${id}&lang=${lang}`);
  }

  static getEvents({
    event_date_start,
    event_date_end,
    type_of_event,
    countries,
    search,
    archive,
    page,
    page_size,
    lang,
  }) {
    return $api.get(
      `events/preview?event_date=${event_date_start}&event_date_end=${event_date_end}&type_of_event=${type_of_event}&countries=${countries}&search=${search}&archive=${archive}&page=${page}&page_size=${page_size}&lang=${lang}`,
    );
  }

  static getOneEvents(id, lang) {
    return $api.get(`events/body?id=${id}&lang=${lang}`);
  }

  static getEventsCountry(lang) {
    return $api.get(`events/country?lang=${lang}`);
  }

  static getEventsType(lang) {
    return $api.get(`events/type_of_events?lang=${lang}`);
  }

  static getInterview({
    published_date_start,
    published_date_end,
    search,
    page,
    page_size,
    lang,
  }) {
    return $api.get(
      `interview/filter/preview?lang=${lang}&published_date_start=${published_date_start}&published_date_end=${published_date_end}&search=${search}&page=${page}&page_size=${page_size}`,
    );
  }

  static getOneInterview(id, lang) {
    return $api.get(`interview/body?id=${id}&lang=${lang}`);
  }

  static getFaq({ published_date, direction, search, page, page_size, lang }) {
    return $api.get(
      `for_bloods/filter?lang=${lang}&published_date=${published_date}&direction=${direction}&search=${search}&page=${page}&page_size=${page_size}`,
    );
  }

  static getFaqDirection(lang) {
    return $api.get(`for_bloods/direction?lang=${lang}`);
  }
}
