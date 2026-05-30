import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forex Trading Education | Master the Markets",
  description:
    "Learn forex trading from real experience. Courses, strategies, and a proven journey to consistent profitability.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#030712",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white antialiased min-h-dvh overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
