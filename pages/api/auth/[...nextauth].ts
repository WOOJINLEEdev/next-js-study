import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "lib/prisma";
import { getEnv } from "utils/env";

const googleClientId = getEnv("GOOGLE_CLIENT_ID") || "";
const googleClientSecret = getEnv("GOOGLE_CLIENT_SECRET") || "";

const naverClientId = getEnv("NAVER_CLIENT_ID") || "";
const naverClientSecret = getEnv("NAVER_CLIENT_SECRET") || "";

const kakaoClientId = getEnv("KAKAO_CLIENT_ID") || "";
const kakaoClientSecret = getEnv("KAKAO_CLIENT_SECRET") || "";

const githubClientId = getEnv("GITHUB_ID") || "";
const githubClientSecret = getEnv("GITHUB_SECRET") || "";

const facebookClientId = getEnv("FACEBOOK_CLIENT_ID") || "";
const facebookClientSecret = getEnv("FACEBOOK_CLIENT_SECRET") || "";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    NaverProvider({
      clientId: naverClientId,
      clientSecret: naverClientSecret,
    }),
    KakaoProvider({
      clientId: kakaoClientId,
      clientSecret: kakaoClientSecret,
    }),
    GitHubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
    FacebookProvider({
      clientId: facebookClientId,
      clientSecret: facebookClientSecret,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
};
export default NextAuth(authOptions);
