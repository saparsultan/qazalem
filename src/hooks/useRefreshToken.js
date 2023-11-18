"use client";
import { signIn, useSession } from "next-auth/react";
import AuthService from "@/services/AuthService";

export const useRefreshToken = () => {
  const { data: session } = useSession();
  return async () => {
    const res = await AuthService.refresh(session.refreshToken);
    if (session) {
      session.accessToken = res.access;
      session.refreshToken = res.refresh;
    } else signIn();
  };
};
