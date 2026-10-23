import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { getUserById } from "@/actions/user"
import prisma from "@/lib/db"
import { LoginSchema } from "@/schemas"


 
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user){
        session.user.role = token.role as string;
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(Number(token.sub));

      if (!existingUser) return token;

      let roleType:string;

      switch (existingUser.roleId) {
        case 1:
          roleType = "ADMIN"
          break;
        case 2: 
          roleType = "TEACHER"
          break;
        case 3: 
          roleType = "STUDENT"
          break;
        case 4: 
          roleType = "PSYCHOLOGIST"
          break;
        default:
          roleType = "GUEST"
          break;
      }

      token.role = roleType;
      
      return token
    },
  },
  session: { strategy: "jwt"},
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password
          )

          if (passwordsMatch) return user as any;

        }
        return null;
      },
    }),
  ],
})
