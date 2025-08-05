import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useState } from 'react'
import Cantidad from '../formRegistroCasa/elements/cantidad'
import { Search } from 'lucide-react'
export default function DropdownCantidad() {
    const [infoAlojamiento, setInfoAlojamiento ] = useState('')
  return (
    <div className='flex items-center  rounded-full w-full gap-5 hover:bg-gray-200 '>
        <Menu>
        <MenuButton >
            {({ active }) => <button >My account</button>}
        </MenuButton>
        <MenuItems anchor="bottom">
            <Cantidad  infoAlojamiento={infoAlojamiento} setInfoAlojamiento={setInfoAlojamiento}>
                
            </Cantidad>
        </MenuItems>
        </Menu>
        <button 
            type="button" 
            onClick={()=>alert('diste click en buscar')}
            className=" flex items-center justify-center gap-3 bg-red-400 rounded-full p-4  transition-all duration-75 hover:bg-red-600 ">
            <Search color='white' size={25} />            
        </button>
    </div>
  )
}