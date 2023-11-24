export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export const YOUTUBE_CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE;
export const GOOGlE_API_KEY = process.env.NEXT_PUBLIC_API_GOOGLE;
export const ALEM_META = "https://alem.amadao.network/";
export const LANGUAGE = {
  kk: "Қазақша",
  ru: "Русский",
  en: "English",
  cn: "中文",
};

export const LINK_URLS = {
  home: "/",
  about: "about",
  login: "login",
  signUp: "sign-up",
  profile: "profile",
  main: "main",
  personal: "personal",
  social: "social",
  additional: "additional",
  changePassword: "change-password",
  registerEvent: "register-event",
  registerGuide: "register-guide",
  guide: "guide",
  news: "news",
  world: "world",
  events: "events",
  help: "help",
  interview: "interview",
  faq: "faq",
  aboutKazakhstan: "about-kazakhstan",
  regions: "regions",
  services: "services",
  usefulInformation: "useful-information",
  callCenters: "call-centers",
  resetPassword: "reset-password",
};

export const MAP_GEO = {
  ru: "https://www.google.com/maps/d/embed?mid=1KfKtwt3Amfap8hmSg7TGU0HPWollM6Q&ehbc=2E312F&=3",
  kk: "https://www.google.com/maps/d/embed?mid=1L77aIvfh85ij56XpuqBRDeFdpYyW2vg&ehbc=2E312F=3",
  en: "https://www.google.com/maps/d/embed?mid=1Ysk72GN4iNYaXkyBOCu2p80gHrdFjeA&ehbc=2E312F=3",
  cn: "https://www.google.com/maps/d/embed?mid=1L77aIvfh85ij56XpuqBRDeFdpYyW2vg&ehbc=2E312F=3",
};

export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};
