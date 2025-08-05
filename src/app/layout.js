import { Inter} from "next/font/google";
import { ClerkProvider} from '@clerk/nextjs'
import { Header } from "./components/header/header";
import "./globals.css";
import Footer from "./components/footer/footer";
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
    <ClerkProvider
      appearance={{
        cssLayerName: 'clerk',
      }}
    >      
        <html lang="es" className={`${inter.variable} `}>
          <body >
            <header>            
              <Header />              
            </header>
            {children}
            <Footer />
          </body> 
        </html>        
    </ClerkProvider>

  );
}
