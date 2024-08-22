import {PrismaAdapter} from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import {AuthOptions} from "next-auth";

import {prisma} from "~/lib/prisma";
import {Role} from "~/types/auth";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: ({session, token}) => {
      if (session?.user) {
        // @ts-ignore
        session.user.role = token.role as Role;
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({token, user}) => {
      if (user) {
        const u = user as unknown as any;

        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
