import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { logger } from "/lib/logger";
import prisma from "/lib/prisma";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Search for a user with the username specified in the form who belongs to one of the valid groups.
        const userOnGroup = await prisma.usersOnResearchGroup.findFirst({
          where: {
            user: {username: credentials.username},
            researchGroup: {name: { in: ["FLORA", "KHAOS"]}}
          },
          select: {
            user: true,
            researchGroup: true,
          }
        });
        if (!userOnGroup) return null
        const user = userOnGroup.user
        const group = userOnGroup.researchGroup

        // Validate password
        const validPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        user.password = undefined;
        user.group = group.name;

        // If the password is valid and all the above conditions have been met, the user is returned.
        return validPassword ? user : null;
      }
    }),
  ],
  events: {
    async signIn({ user, isNewUser }) {
      logger.info({ event: "signIn", user, isNewUser });
      return user.isDisabled;
    },
    async signOut(message) {
      logger.info({ event: "signOut", session: message.session });
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      // ! Esto hace una doble llamada, en una hay username y en otra no. Sin el if da error Typescript.
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
        token.group = user.group;
      }
      return token;
    },

    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.fullname = token.fullname;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.group = token.group;
      return session;
    },

    // See: https://github.com/nextauthjs/docs/pull/101
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      // If the redirect url is not absolute, prepend with base URL
      return new URL(url, baseUrl.replace("www.", "")).toString();
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 9 * 24 * 60 * 60, // 9 days
    updateAge: 9 * 60 * 60, // 9 hours
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
