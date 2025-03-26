import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/config/db";
import User from "@/models/User";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              username: { label: "username", type: "text" },
              password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
              if (!credentials.username || !credentials.password) {
                throw new Error("Username and password are required");
              }
      
              // Fetch user from database 
              await connectDB()
              const user = await User.findOne({ username: credentials.username })
              
              if (user && (await user.matchPasswords(credentials.password))) {
                return {
                  _id: user._id.toString(),
                  username: user.username,
                };
              } else {
                throw new Error('Invalid username or password');
              }
            },
        }),
    ],
    pages: {
      signIn: "/login", // Custom login page
    },
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user._id
          token.username = user.username
        }
        return token;
      },

      async session({ session, token }) {
        if (token) {
          session.user.id = token.id;
          session.user.username = token.username
        }
        return session;
      },
    },
    secret: process.env.JWT_SECRET
}