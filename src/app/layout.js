import { Inter, Nunito} from "next/font/google";
import { ClerkProvider} from '@clerk/nextjs'
import "./globals.css";
import Footer from "./components/footer/footer";
import ClientLayout from "./clientLayout";
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
    <ClerkProvider appearance={{cssLayerName: 'clerk', }}>      
        <html lang="es" className={`${inter.variable} `}>
          <body >
            <ClientLayout>
              {children}
            </ClientLayout>
            
          </body> 
        </html>        
    </ClerkProvider>

  );
}
