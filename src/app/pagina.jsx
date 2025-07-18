import { auth } from "@clerk/nextjs/server";

export async function Page(){
    const {userId} = await auth()
    console.log("usuario logueado :", userId)
    if(!userId){
        return <div>Sign in to view this page</div>
    }
}