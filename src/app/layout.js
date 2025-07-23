import { Inter} from "next/font/google";
import { ClerkProvider} from '@clerk/nextjs'
import { Header } from "./components/header/Header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Airbnb",
  description: "Proyecto clon Airbnb",
};
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="es" className={`${inter.variable} `}>
        <body>
          <header>            
            <Header>
            </Header>
          </header>
          {children}
        </body> 
      </html>
    </ClerkProvider>
  );
}
