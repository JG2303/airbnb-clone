import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ScrollAlojamientos({scrollRef, scrollAmount = 300}){
    const scroll = (direction) => {    
        if (!scrollRef?.current)  return     
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth"
        })        
    } 
    
    return(
        <div className="hidden md:flex md:gap-3 md:pr-6 ">
            <ChevronLeft 
                className="bg-gray-100 rounded-full  h-7 w-7 hover:bg-gray-300"
                onClick={() => scroll("left")}
            />
            <ChevronRight 
                className="bg-gray-100 rounded-full  h-7 w-7 hover:bg-gray-300"
                onClick={() => scroll("right")}
            />
        </div>
    )
}