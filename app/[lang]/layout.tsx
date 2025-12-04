import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { i18n } from "../../i18n-config";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "ZW&US Civilization Holding",
  description: "Planetary Circular Economy System",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased bg-[var(--background)] text-[var(--text-main)]">
        {children}
      </body>
    </html>
  );
}
