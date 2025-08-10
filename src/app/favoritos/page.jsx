'use client'
import { useUser } from "@clerk/nextjs"
import CardFotos from "../components/cards/cardFotos"
export default function Favoritos(){
    const {user} = useUser()
    return(
        <div>
            {
                user&&(
                   <div className="flex flex-col gap-6">
                        <h1 className="text-center ">Mis favoritos</h1>
                        <div className="grid grid-cols-1 gap-3 px-2 sm:[grid-template-columns:repeat(auto-fit,minmax(450px,450px))]   ">
                            <CardFotos ciudad={"favoritos"} />
                        </div>
                   </div>
                )
            }
        </div>
    )
}