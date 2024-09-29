import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";


interface ApiStatus {
  isLoading: boolean;
  isError: boolean;
  error: any | null;
}

const useIsMutating = (): { apiStatus: (endpointName: string) => ApiStatus } => {
  const isMutating = useSelector((state: RootState) => state.api.mutations);

  const apiStatus = useCallback((endpointName: string): ApiStatus => {

    const mutations = Object.values(isMutating).filter(
      (mutation) => mutation?.endpointName === endpointName
    );

    const isLoading = mutations.some(mutation => mutation?.status === "pending");
    const isError = mutations.some(mutation => mutation?.status === "rejected");
    const error = isError ? mutations.find(mutation => mutation?.status === "rejected")?.error : null;

    return {
      isLoading,
      isError,
      error,
    };
  }, [isMutating]);

  return { apiStatus };
};

export default useIsMutating;
