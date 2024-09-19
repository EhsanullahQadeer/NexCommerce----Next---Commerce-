import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  let locale = "EN";
  if (typeof window !== "undefined") {
    locale = window.sessionStorage.getItem("lang") || "EN";
  }

  return {
    locale,
    messages: (await import(`../../locales/${locale}/common.json`)).default,
  };
});
