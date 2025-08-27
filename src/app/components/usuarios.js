"use client"
import { useUser } from "@clerk/nextjs"
import { supabase } from "@/lib/supabaseClient"
import { useEffect } from "react"

export default function SyncUser() {
    const { user } = useUser()

    useEffect(() => {
        if (user) {
            const syncUser = async () => {
                const { error } = await supabase
                    .from("usuario")
                    .upsert([
                        {
                            id: user.id,
                            nombre: user.firstName || "",
                            apellido: user.lastName || "",
                            correo: user.emailAddresses[0]?.emailAddress || "",
                        },
                    ]);

                if (error) {
                    console.error("Error al insertar usuario en Supabase:", error)
                }
            };

            syncUser()
        }
    }, [user])

    return null
}
