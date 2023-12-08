import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { BASE_URL } from "@/utils/constants";

const refreshTokenApiCall = async (token) => {
  const url = BASE_URL + "login/refresh/";
  const formData = new URLSearchParams();
  formData.append("refresh", token.refreshToken);
  const res = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });
  if (res.ok) {
    const data = await res.json();
    return {
      ...token,
      error: null,
      accessToken: data.access,
      expiresIn: Date.now() + parseInt(data.expires_in) * 1000 - 2000,
    };
  } else {
    return {
      error: "RefreshTokenTokenError",
    };
  }
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const url = BASE_URL + "login/";
        const formData = new URLSearchParams();
        formData.append("email", credentials.username);
        formData.append("password", credentials.password);
        const res = await fetch(url, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
        if (res.ok) {
          return await res.json();
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async session({ token, session }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      if (session?.accessToken ?? false) {
        const url = `${BASE_URL}user/profile/main/${token.id}`;
        const userRes = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });
        if (userRes.ok) {
          session.user = await userRes.json();
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.refreshToken = user.refresh;
        token.accessToken = user.access;
        token.id = user.user.id;
        token.expiresIn = Date.now() + parseInt(user.expires_in) * 1000 - 2000;
      }
      if (Date.now() < token.expiresIn) {
        return token;
      }
      return await refreshTokenApiCall(token);
    },
  },

  pages: {
    signIn: "/ru/login",
    signOut: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
