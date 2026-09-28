import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CivicOS | AI-Powered Civic Intelligence Platform",
  description: "From Citizen Voice to Smarter Public Decisions — An AI-powered civic intelligence platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
