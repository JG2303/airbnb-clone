import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home(){
    const {userId} = await auth()
    console.log("usuario logueado :", userId)
    if(!userId){
        return <div>Sign in to view this page</div>
    }
    const user = await currentUser()
    return <div className="flex justify-center p-8 text-8xl">Welcome, {user.firstName}!</div>
}