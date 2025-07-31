import { create } from "zustand"
import {persist} from 'zustand/middleware'
export const useReservaStore = create(
    persist(
        (set)=>({
            datosReserva : null,
            setDatosReserva : (data) => set({datosReserva:data}),
            limpiarReserva: ()=> set({datosReserva:null}),
    }),
    {
        name:'reserva-storage',
    }
))