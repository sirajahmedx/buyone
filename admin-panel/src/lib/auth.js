import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import client from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [Google],
   adapter: MongoDBAdapter(client),
});
