import NextAuth from "next-auth";
import bcrypt from "bcrypt"
import UserModel from "@/app/model/User";
import { AuthOptions } from "next-auth";
import dbConnect from "@/app/lib/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "password", type: "text" }
      },
      async authorize(credentials: any): Promise<any> {
        try {
          await dbConnect();
          const user = await UserModel.findOne({ email: credentials.email });

          if (!user) {
            console.log("User not found");
            return null;
          }
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            console.log("Invalid password");
            return null;
          }

          console.log("✅ Login Successful");
          return { email: user.email };

        } catch (error) {
          console.error("❌ Authorize Error:", error);
          return null;
        }
      }
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user , account ,profile}) {
      if (user) {
        token.id = user.id || profile?.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // <-- attach id here
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
