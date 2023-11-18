"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { $apiPrivate } from "@/utils/http";
import { useRefreshToken } from "@/hooks/useRefreshToken";

const useAxiosPrivate = () => {
  const { data: session } = useSession();
  const refresh = useRefreshToken();
  useEffect(() => {
    const requestIntercept = $apiPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = $apiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await refresh();
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${session?.accessToken}`;
          return $apiPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      $apiPrivate.interceptors.request.eject(requestIntercept);
      $apiPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [session, refresh]);

  return $apiPrivate;
};

export default useAxiosPrivate;
