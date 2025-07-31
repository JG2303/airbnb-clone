"use client";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
export default function DropdownBase({menuBoton, children}) {  
  return (
    <Menu 
      as="div" 
      className="relative inline-block text-left w-full"     
    >
      {({open})=>{
        document.documentElement.style.overflow = open ? "" : "";
        document.documentElement.style.paddingRight = "";
        return(
          <>
            <MenuButton className="w-full ">
              {menuBoton}
            </MenuButton>

            <MenuItems className="absolute z-10 mt-2 w-full origin-top-left rounded-xs bg-white shadow-2xl  focus:outline-none">
              <div className="p-4 space-y-2">
                {children}
              </div>
            </MenuItems>
          </>
        )
      }}
      
    </Menu>
  );
}
