import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "VaultPay - FINTRAC-Licensed Transfers to Africa | Save $1,000+/Year",
  description:
    "Send money to Africa in under 60 seconds. Pay $7.50, not $45. FINTRAC-licensed, bank-grade security. Join 8,200+ on the waitlist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} dark`}>
      <body suppressHydrationWarning>
        <Header />
        {children}
      </body>
    </html>
  );
}
