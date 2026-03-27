import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forex Trading Education | Master the Markets",
  description:
    "Learn forex trading from real experience. Courses, strategies, and a proven journey to consistent profitability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white antialiased">{children}</body>
    </html>
  );
}
