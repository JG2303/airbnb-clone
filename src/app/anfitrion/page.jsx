import CardFotos from "../components/cards/cardFotos";


export default function Anfitrion() {  

  return (
    <>
        <h1 className="text-center py-4">Mis anuncios</h1>
        <div className="px-4 pb-20" >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <CardFotos ciudad={'anuncios'}/>
            </div>
        </div>
    </>
  )
}
