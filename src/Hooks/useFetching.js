import { useState, useEffect } from "react"
export default function useFetching(URL){
    
    const [dataset, setDataset] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)    
    const fechingData = async () => {
        try {                        
            const response = await fetch(URL)
            if(!response.ok) throw new Error('Error al recibir la respuesta')
            const data = await response.json()
            setDataset(data)            
        } catch (err) {
            console.error('Ha ocurrrido un error : ', err)
            setError(err)
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        fechingData()
    },[URL])
    return{
        isLoading,
        error,
        dataset
    }
}