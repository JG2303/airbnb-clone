import { auth, currentUser } from "@clerk/nextjs/server";
import CargarImagen from "@/app/components/upload/Upload";
import CardFotos from "./components/cards/cardFotos";
import { SignedIn, SignIn } from "@clerk/nextjs";
export default async function Home(){    
    const user = await currentUser()       
    return (
    <>        
        <CardFotos></CardFotos>

        {/* <CargarImagen /> */}
         
    </>
)
}