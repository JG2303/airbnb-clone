import { Inter, Poppins} from "next/font/google";
import { ClerkProvider} from '@clerk/nextjs'
import "./globals.css";
import Footer from "./components/footertest/footer";
import ClientLayout from "./clientLayout";
import SyncUser from "./components/usuarios";
const inter = Inter({
  variable: "--font-poppins",
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
				<body className="min-h-screen flex flex-col">
					<ClientLayout>
						<SyncUser />
						<main className="flex-1">
							{children}
						</main>
						<Footer />
					</ClientLayout>					
				</body> 
			</html>        
		</ClerkProvider>

	);
}
