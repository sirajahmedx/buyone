import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import client from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
   ],
   adapter: MongoDBAdapter(client),
   // callbacks: {
   //    async jwt({ token, user }) {
   //       // Only set token.id if user object exists and has an id or use a fallback
   //       if (user) {
   //          token.id = user.id || user.sub; // Fallback to user.sub if user.id is not present
   //       }
   //       return token;
   //    },
   //    async session({ session, token }) {
   //       // Only set session.user.id if token.id is present
   //       if (token.id) {
   //          session.user.id = token.id;
   //       }
   //       return session;
   //    },
   // },
});
