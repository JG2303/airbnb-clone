'use client'
import { useStoreSearch } from "../stores/storeSearch"
import CardFotos from "../components/cards/cardFotos"
import Home from "../page"
export default function ResultadosFiltro(){
    const searchData = useStoreSearch((state)=>state.searchData)
    console.log(searchData)
    return(
       <>
            {
                !searchData || searchData.length > 0  
                ?
                (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-5 pb-20">
                        <CardFotos ciudad={'filtros'}/>
                    </div>
                )
                :
                (
                    <div className="">
                        <h2>En el momento no tenemos ningun alojamiento que cumpla con tus espectativas pero puedes explorar en otros lugares</h2>
                        <Home />                        
                    </div>
                )
            }
       </>
    )
}