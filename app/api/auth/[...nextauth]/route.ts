import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const users = await sql`SELECT * FROM users WHERE email = ${credentials.email}`;
        const user = users[0];
        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.full_name,
            email:user.email,
            image:user.image
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login'
  },
  callbacks:{
    async jwt({token,user}){
      if(user){
        token.id= user.id,
        token.name= user.name
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
        session.user.name= token.name;
      }
      return session;
    },
  }
});

export { handler as GET, handler as POST }