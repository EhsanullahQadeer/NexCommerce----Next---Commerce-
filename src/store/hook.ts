import { useSelector } from "react-redux";
import type { RootState } from "./index";

export const useAppSelector = useSelector.withTypes<RootState>();
