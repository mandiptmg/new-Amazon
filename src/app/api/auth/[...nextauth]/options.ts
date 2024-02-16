import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        name:{label:'Full Name'},
        email: { label: 'Email' },
        password: { label: 'Password' },
      },
      authorize(credentials, req) {
        if (
          credentials?.email === 'admin@example.com' &&
          credentials?.password === 'admin' && credentials?.name==="admin"
        ) {
          return {
            id: '1',
            email: 'admin@example.com',
            name:'admin'
          }
        }
        return null
      },
    }),
  ],
}
