
/**
 * DropdownBase is a reusable dropdown component built with Headless UI's Menu.
 * It renders a button and a dropdown menu, allowing custom button and menu content.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.menuBoton - The content to display inside the dropdown button.
 * @param {React.ReactNode} props.children - The content to display inside the dropdown menu.
 * @returns {JSX.Element} The rendered dropdown component.
 */
"use client";
import { Menu, MenuButton, MenuItems , Input } from "@headlessui/react";
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
