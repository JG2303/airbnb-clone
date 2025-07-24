'use client'
import { useRef, useEffect } from 'react'
export default function DropdownBase({estado, onClose, children}) {  
  const menuRef = useRef(null)
  useEffect(() => {
      const handleClickOutside = (event) => {        
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          onClose()
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])
  if(!estado) return null
  return (
    <div ref={menuRef} className="relative inline-block text-left" >
        {children}
    </div>
  )
}
