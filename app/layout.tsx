import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientThemeProvider from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tanmoy's Blog",
  description: "Personal blog",
  icons: {
    icon: "/logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var el=document.getElementById('pronounceRootElement');if(el)el.remove();document.querySelectorAll('.pronounceRootElementItem').forEach(function(n){n.remove()});document.querySelectorAll('audio').forEach(function(a){try{if(a && a.style && a.style.position==='fixed')a.remove()}catch(e){}});}catch(e){} })();`,
          }}
        />

        <ClientThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
