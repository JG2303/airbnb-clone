import { X } from "lucide-react";
import Link from "next/link";
const ModalServicios = ({ onClose, itemsAirbnb, seleccionado, setSeleccionado, setMostrarModal }) => {
  return (
    <div className="bg-gray-900/80 fixed inset-0 flex justify-center  items-center z-1000 ">
		<div className="bg-white md:p-20 rounded-[30px] md:w-[900px] border">
			<div>
				<button
					className="p-2 cursor-pointer hover:bg-gray-100 hover:rounded-full "
					onClick={() => {
						onClose();
						setSeleccionado(null);
					}}
				>
				<X />
				</button>
			</div>
			<h1 className="text-center text-[15px] md:text-3xl mb-2 ">
				¿Que te gustaria compartir?
			</h1>
			<div className=" flex flex-col">
				<div className="flex  justify-center items-center gap-8 p-1">
					<div className="flex flex-col">
					<div className="flex p-4 gap-5">
						{itemsAirbnb.map((item) => (
						<div
							key={item.titulo}
							onClick={() => setSeleccionado(item.link)}
							className={`flex flex-col text-[12px] md:text-[18px] bg-gray-200/20 justify-center w-24 md:w-full  h-24 items-center border-1 cursor-pointer md:p-[5rem] rounded-xl ${
							seleccionado === item.link
								? "border-black border-3 "
								: "border-gray-300"
							}`}
						>
							<img
							src={item.src}
							alt={item.titulo}
							className="w-12 md:w-20"							
							/>
							{item.titulo}
						</div>
						))}
					</div>
					<hr className="m-3 w-full bg-gray-400 border-gray-300" />
					<div className="flex flex-col items-end pr-6 pb-4 md:pb-0">
						{seleccionado ? (
							<Link href={seleccionado} >
								<button
									onClick={() => (setMostrarModal(false), setSeleccionado(null))}
									className={`cursor-pointer bg-blue-200 rounded-[10px] p-2 w-[120px] `}
								>
								Siguiente
								</button>
							</Link>
							) : (
							<button
								disabled
								className="'bg-gray-300 bg-gray-400 text-white cursor-not-allowed p-2 w-[120px] rounded-[10px]"
							>
								Siguiente
							</button>
						)}
					</div>
					</div>
				</div>
			</div>
		</div>
    </div>
  );
};
export default ModalServicios;
