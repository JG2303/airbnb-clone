import { X } from "lucide-react";
export default function Modal({onClose, children}){
    return(
        <div
            style={{
                backgroundColor: '#000000aa',
                position: 'fixed',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
            }}
            >
            <div className="">
                <div className="flex flex-col">
                    <div >
                        <button 
                            className="p-2 cursor-pointer hover:bg-gray-100 hover:rounded-full " 
                            onClick={()=>{
                                onClose();                                
                            }}
                        ><X /></button>
                    </div>                    
                    <div className="flex justify-center items-center gap-8 p-1">
                        {children} 
                    </div>
                    
                </div>               
            </div>
         </div>
    )
} 
