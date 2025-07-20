import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

import { Header } from "./components/header/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Airbnb",
  description: "Proyecto clon Airbnb",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="es" className={`${inter.variable} ${geistMono.variable}`}>
        <body>
          <header>            
            <Header />
          </header>
          {children}
        </body> 
      </html>
    </ClerkProvider>
  );
}
