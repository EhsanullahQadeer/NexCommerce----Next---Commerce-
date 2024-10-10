import { selectSiteSetting } from "@/store/slices/siteSetting/siteSettingSlice";
import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const useDate = () => {
  const { selected_language_id } = useSelector(selectSiteSetting);
  const lang = selected_language_id == 1 ? "en" : "tr";
  moment.locale(lang);
  const formateDate = useCallback(
    (date: string) => {
      const format1 = moment(date).format("LL dddd");
      const format2 = moment(date).format("HH:mm:ss");
      return `${format1}, ${format2}`;
    },
    [lang]
  );
  return { formateDate };
};

export default useDate;
