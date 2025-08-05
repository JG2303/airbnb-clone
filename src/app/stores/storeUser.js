import { create } from "zustand"
import {persist} from 'zustand/middleware'
export const useSessionUser = create(
    persist(
        (set)=>({
            usuarioLogueado : false ,
            setUsuarioLogueado : (data) => set({usuarioLogueado: data}),
            limpiarUsuario: ()=> set({usuarioLogueado: false}),
    }),
    {
        name:'usuario-logueado',
        getStorage: () => localStorage,
    }
))