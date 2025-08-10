import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const ModalServicios = ({ onClose, itemsAirbnb, seleccionado, setSeleccionado, setMostrarModal }) => {
  return (
    <div
      style={{
        backgroundColor: "#000000aa",
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "30px",
          minWidth: "300px",
          Width: "900px",
        }}
      >
        <div className="flex flex-col">
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
          <h1 className="text-center text-3xl mb-2 ">
            ¿Que te gustaria compartir?
          </h1>
          <div className="flex justify-center items-center gap-8 p-1">
            <div className="flex flex-col">
              <div className="flex gap-5">
                {itemsAirbnb.map((item) => (
                  <div
                    key={item.titulo}
                    onClick={() => setSeleccionado(item.link)}
                    className={`border-1 cursor-pointer p-[6rem] rounded-xl ${
                      seleccionado === item.link
                        ? "border-black border-3 "
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={item.titulo}
                      width={80}
                      height={80}
                    />
                    {item.titulo}
                  </div>
                ))}
              </div>
              <hr className="m-3 w-full bg-gray-400 border-gray-300" />
              <div className="flex flex-col items-end">
                {seleccionado ? (
                  <Link href={seleccionado} >
                    <button
                      onClick={() => (
                        setMostrarModal(false), setSeleccionado(null)
                      )}
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
