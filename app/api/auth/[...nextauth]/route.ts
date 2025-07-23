import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma/client"; 
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: ""},
                password: { label: "Password", type: "password", placeholder: "" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: {email : credentials.email},
                });

                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(credentials.password, user.password!);
                // return passwordsMatch ? user : null;
                if (!passwordsMatch) return null;
                
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role // Make sure your User model has a 'role' field
                };
            },
        }),
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!
            })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role; 
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/signin",
        signOut: "/signout",
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };