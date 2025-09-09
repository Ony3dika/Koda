import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Koda",
  description: "Collaborative Text Editor",
};

export default function RootLayout({ children }) {
  return (
   
      <html lang='en' suppressHydrationWarning>
        <body className={`bg-sidebar ${plusJakarta.className} antialiased`}>
           <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
          </ThemeProvider>
        </body>
      </html>
    
  );
}
