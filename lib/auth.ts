import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/db/index";
import type { Adapter } from "next-auth/adapters";
import { SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";




export const authOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secr3t",
  session: { strategy: "jwt" as SessionStrategy },
  callbacks: {
    async jwt({ token, user }:{ token: JWT; user: any }) {
      if (user) {
        token.sub = user.id;  // Ensure user ID is added to the token
      }
      return token;
    },
    async session({ session, token }:  { session: any; token: JWT }) {
      const user = await db.user.findUnique({
        where: {
          id: token.sub,
        },
      });
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = user?.id;
        // console.log((user?.role)==="ADMIN");
        session.user.Admin =( (user?.role)==="ADMIN");
      }
      return session;
    },
  },
};
