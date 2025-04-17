import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { unstable_cache } from "next/cache";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/widgets/header";

import { session } from "@/lib/auth";
import { getGenre, getTags } from "@/lib/rawg";
import { DialogProvider } from "./context"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Game library",
  description: "Browse a massive collection of video games by genre, platform, rating, and more. Powered by RAWG API.",
  keywords: [
    "game catalog",
    "video games",
    "RAWG API",
    "game discovery",
  ],
  icons: {
    icon: '/icon.svg'
  }
};

const getTagsAndGenre = unstable_cache(
  async () => {
    const [
      getTagsRes,
      getGenreRes,
    ] = await Promise.all([
      await getTags(),
      await getGenre()
    ])

    return await Promise.all([
      await getTagsRes?.json(),
      await getGenreRes?.json(),
    ])
  }
)

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: userSession } = await session()
  const [tags, genre] = await getTagsAndGenre()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
          <DialogProvider>
            <Header session={userSession.user} genre={genre.results} tags={tags.results} />
            {children}
          </DialogProvider>
        <Toaster />
      </body>
    </html>
  );
}
