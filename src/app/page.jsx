import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import CargarImagen from "@/components/upload/Upload";
export default async function Home(){
    const {userId} = await auth()    
    if(!userId){
        return (
            <div className="flex justify-center"> 
                <p className="text-4xl">No estas logueado!</p>
            </div>
        )
    }
    console.log(userId)
    const user = await currentUser()    
    return (
    <>
        <div className="flex flex-col justify-center items-center gap-2 p-8 text-4xl">
            <p>Welcome, {user.fullName}! </p>
            <Image 
                src={user.imageUrl}
                alt = "imagen"
                width={400}
                height={400}
                className="rounded-full"
            />
        </div>
        <CargarImagen 
         user = {userId}
         nombre = {user.firstName}
        />
            
    </>
)
}