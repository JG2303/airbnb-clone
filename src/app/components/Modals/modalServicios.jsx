const ModalServicios = ({onClose, children}) => {
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
            <div
                style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '30px',
                minWidth: '300px',
                Width: '900px'
                }}
            >
                <div className="flex flex-col">
                    <div >
                        <button className="p-2 cursor-pointer hover:bg-gray-100 hover:rounded-full " onClick={onClose}>❌</button>
                    </div>
                    <h1 className="text-center text-3xl mb-2 ">¿Que te gustaria compartir?</h1>
                    <div className="flex justify-center items-center gap-8 p-1">
                        {children} 
                    </div>
                    
                </div>               
            </div>
         </div>
    )
} 
export default ModalServicios