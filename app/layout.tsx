import type { Metadata } from "next";
import "./globals.css";
import NextAuthSessionProvider from "@/app/SessionProvider";
import { useSession } from "next-auth/react";
import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";


export const metadata: Metadata = {
  title: "benaam",
  description: "find your lost items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <body
          className={"antialiased"}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </NextAuthSessionProvider>
    </html>
  );
}
