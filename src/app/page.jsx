import CardFotos from "./components/cards/cardFotos";
export default function Home(){ 
    return (  
        <div className=" px-7  flex flex-col gap-7">     
            {/* ---------------------sesion 1----------------------        */}
            <div className=" overflow-x-auto  ">
                <div className="grid grid-cols-12 w-[1800px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:w-[3200px] 2xl:[grid-template-columns:repeat(auto-fit,250px))]   gap-2   ">
                    <CardFotos></CardFotos>
                </div>
            </div>
            {/* ---------------------sesion 2----------------------        */}
           <div className=" overflow-x-auto  ">
                <div className="grid grid-cols-12 w-[1800px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:w-[3200px] 2xl:[grid-template-columns:repeat(auto-fit,250px))]   gap-2   ">
                    <CardFotos></CardFotos>
                </div>
            </div>
            {/* ---------------------sesion 3----------------------        */}
            <div className=" overflow-x-auto  ">
                <div className="grid grid-cols-12 w-[1800px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:w-[3200px] 2xl:[grid-template-columns:repeat(auto-fit,250px))]   gap-2   ">
                    <CardFotos></CardFotos>
                </div>
            </div> 
            {/* ---------------------sesion 4----------------------        */}
           <div className=" overflow-x-auto  ">
                <div className="grid grid-cols-12 w-[1800px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:w-[3200px] 2xl:[grid-template-columns:repeat(auto-fit,250px))]   gap-2   ">
                    <CardFotos></CardFotos>
                </div>
            </div>

        </div>   
    )
}