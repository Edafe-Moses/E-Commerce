import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const useAppSelector = <T>(selector: (state:RootState) => T) => useSelector(selector)