import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LVS",
  description: "Projeto de front da LVS",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}