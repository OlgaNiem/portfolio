import type { Metadata } from "next";
import Urbanist from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import clsx from "clsx";
import { PrismicPreview } from "@prismicio/next";
import { createClient } from "@/prismicio";
import { repositoryName } from "@/prismicio";

const urbanist = Urbanist({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = Urbanist({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return {
    title:settings.data.meta_title,
    description:settings.data.meta_description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-900 text-slate-100">
      <body
        className={clsx(urbanist.className, "relative min-h-screen")}>
          <Header />
          {children}
          <Footer />
        <div className="absolute inset-0 -z-50 max-h-screen background-gradient"></div>
        <div className="absolute pointer-events-none inset-0 -z-40 h-full bg-[url('/img/noisetexture.jpg')] opacity-20 mix-blend-soft-light">

        </div>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
