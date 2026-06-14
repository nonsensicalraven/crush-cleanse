import type { Metadata } from "next";
import { Quicksand, Nunito } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-quicksand",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Crush Cleanse 🎀",
  description: "Detox your mind from your crush with absolute cuteness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${quicksand.variable} ${nunito.variable}`}>
      <body 
        className="min-h-screen text-[#5b4452]"
        style={{ 
          fontFamily: "var(--font-nunito)",
          backgroundColor: "#fff6ee",
          backgroundImage: `
            radial-gradient(circle at 15% 0%, #ffd9ec 0%, transparent 45%),
            radial-gradient(circle at 100% 20%, #e6d6f2 0%, transparent 40%),
            linear-gradient(180deg, #fff6ee 0%, #ffeaf3 100%)
          `,
          backgroundAttachment: "fixed"
        }}
      >
        {children}
      </body>
    </html>
  );
}