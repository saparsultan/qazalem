import { useQuery } from "@tanstack/react-query";
import NewsService from "@/services/NewsService";

const useNewsOriginCountry = (key, data) => {
  return useQuery([key, data], () => NewsService.getNewsOriginCountry(data));
};

const useNewsWorld = (key, data) => {
  return useQuery([key, data], () => NewsService.getNewsWorld(data));
};

const useInterview = (key, data) => {
  return useQuery([key, data], () => NewsService.getInterview(data));
};

export { useNewsOriginCountry, useNewsWorld, useInterview };
