import { Plus_Jakarta_Sans, Explora, Italianno } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const explora = Explora({
  variable: "--font-explora",
  weight: "400",
  subsets: ["latin"],
});

const italianno = Italianno({
  variable: "--font-italianno",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Styla",
  description: "Find outfits made for YOU",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`bg-sidebar ${plusJakarta.variable} antialiased`}>{children}</body>
    </html>
  );
}
