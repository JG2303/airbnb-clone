import {create} from "zustand"
export const useAnuncioStore = create((set)=>({
   anuncio : null,
   setAnuncio:(data) => set({anuncio:data}),
   clearAnuncio:()=> set({alojamiento:null})
    
}))