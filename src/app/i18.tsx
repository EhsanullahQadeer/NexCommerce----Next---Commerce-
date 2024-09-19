"use client"; // Ensure this component is treated as a Client Component

import React, { useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { useSelector } from "react-redux";
import { selectSiteSetting } from "@/store/slices/siteSetting/siteSettingSlice";

 export const I18Provider = ({ children }: { children: React.ReactNode }) => {
  const { selected_language_id } = useSelector(selectSiteSetting);
  const [locale, setLocale] = useState("EN");
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const fetchLocaleData = async () => {
      const lang = selected_language_id == 1 ? "EN" : "TR"; 
      const fetchedMessages = await import(`../../locales/${lang.toLowerCase()}/common.json`);
      setLocale(lang);
      setMessages(fetchedMessages.default);
      window.sessionStorage.setItem("lang", lang); 
    };

    fetchLocaleData();
  }, [selected_language_id]); 

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default I18Provider;

