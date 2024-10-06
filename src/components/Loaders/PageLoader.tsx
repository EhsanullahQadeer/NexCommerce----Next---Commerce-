import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProgressIcon from "../Icons/ProgressIcon";

export default function FullPageLoader() {
  const { fullPageLoader } = useSelector((state: RootState) => state.root);
  useEffect(() => {
    document.body.style.overflow = fullPageLoader ? "hidden" : "";
  }, [fullPageLoader]);
  return (
    <div>
      <Backdrop
        sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
        open={fullPageLoader}
      >
        <ProgressIcon className="!h-14 !w-14  sm:!h-20 sm:!w-20 " />
      </Backdrop>
    </div>
  );
}
