import { Jost } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
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
    <html lang="en" className={jost.variable}>
      <body suppressHydrationWarning>
        <Header />
        {children}
      </body>
    </html>
  );
}
