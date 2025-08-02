import CardFotos from "./components/cards/cardFotos";
export default function Home(){ 
    return (  
        <div className="flex flex-col justify-center px-7">
            <h1 className="text-5xl py-4 text-center">Pagina principal</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:[grid-template-columns:repeat(auto-fit,250px))]  justify-center gap-4 scroll-auto ">
                <CardFotos></CardFotos>
            </div> 

        </div>   
    )
}