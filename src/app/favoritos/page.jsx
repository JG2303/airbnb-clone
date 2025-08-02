'use client'
import { useUser } from "@clerk/nextjs"
import CardFotos from "../components/cards/cardFotos"
export default function Favoritos(){
    const {user} = useUser()
    return(
        <div>
            {
                user&&(
                   <div>
                        <h1 className="text-6xl text-center ">Mis favoritos</h1>
                        <div className="grid grid-cols-1  sm:[grid-template-columns:repeat(auto-fit,minmax(250px,350px))]  gap-4  px-2 ">
                            <CardFotos lugar={"favoritos"} />
                        </div>
                   </div>
                )
            }
        </div>
    )
}