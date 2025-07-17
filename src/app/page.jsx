import Image from "next/image";
import Button from "./components/buttons/Button";
export default function Home() {
  return (
    <main>
       <div className="flex justify-center items-center p-3 ">
          <button className="bg-amber-800 text-white rounded-2xl p-2 cursor-pointer">Iniciar sesión</button>
       </div>
    </main>
  );
}
