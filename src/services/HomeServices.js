import axios from "axios";
import $api from "@/utils/http";

export default class HomeService {
  static getSliderMain(lang, limit) {
    return $api.get(`slider/all?lang=${lang}&limit=${limit}`);
  }
  static getSocial(limit) {
    return $api.get(`social_site?limit=${limit}`);
  }
  static async getYoutubeVideos(part, channelId, maxResults, order, key) {
    return await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=${part}&channelId=${channelId}&maxResults=${maxResults}&order=${order}&key=${key}`,
    );
  }
  static getPartners() {
    return $api.get("partners");
  }
  static getKazakhTourismPreview(lng) {
    return $api.get(`kazakh_tourism/preview?lang=${lng}`);
  }
  static getKazakhInvestPreview(lng) {
    return $api.get(`kazakh_invest/preview?lang=${lng}`);
  }
  static getAlemMetaPreview(lng) {
    return $api.get(`alem_metaverse/preview?lang=${lng}`);
  }
  static getQazTradePreview(lng) {
    return $api.get(`qaz_trade/preview?lang=${lng}`);
  }
  static getAstanaHubPreview(lng) {
    return $api.get(`astana_hub/preview?lang=${lng}`);
  }
}
