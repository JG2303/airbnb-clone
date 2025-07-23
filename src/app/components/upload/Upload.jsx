'use client'
import {useState, useRef, useEffect} from 'react'
import {supabase} from '@/lib/supabaseClient'
import { insertData} from '@/lib/supabaseCrud'
import { useUser } from '@clerk/nextjs'
export default function CargarImagen(){
    const [imagen, setImagen] = useState(null)
    const [preview, setPreview] = useState(null)
    const [uploading, setUploading] = useState(false)    
    const fileInputRef = useRef(null)  
    const {user} = useUser()   
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(file){
            setImagen(file)
            const reader = new FileReader()
            reader.onloadend = () =>{
                setPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }    
    const handleUpload = async (e) =>{
        e.preventDefault();
        if(!imagen) return
        try {
          setUploading(true)
          const fileName = `${user.firstName}-${user}-${Date.now()}.jpg`
          // sube las fotos al bucket : fotos
          const {error} = await supabase.storage
              .from('fotos')
              .upload(`${user.id}/nuevas/${fileName}`,imagen)
          if(error) throw error
          // ---------------------------------
          const {data:{publicUrl}} = supabase.storage
              .from('fotos')
              .getPublicUrl(`${user.id}/nuevas/${fileName}`)     
          const values = {      
            url: publicUrl,
            id_user: user             
          } 
          // sube las fotos a la BD en la tabla : fotos
          const response = await insertData('fotos', values)     
          if(!response) throw new Error('Error') 
          // ------------------------------------------
        } catch (error) {
            console.error('Error al subir la imagen ', error.message)
        }finally{
            setUploading(false)
        }
    }
    const handleCancel = () =>{
        setImagen(null)
        setPreview(null)
        if(fileInputRef.current){
            fileInputRef.current.value = ''
        }
    }   
    return (
        <div >
          <form onSubmit={handleUpload}>
            <div >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                disabled={uploading}
                ref={fileInputRef}
                style={{ display: 'none' }}
                id="imageUpload"
              />
              <label htmlFor="imageUpload" >
                Seleccionar Imagen
              </label>
            </div>
    
            {preview && (
              <div >
                <h3>Vista Previa:</h3>
                <img 
                  src={preview} 
                  alt="Preview" 
                  className='max-h-[300px] max-w-[200px]'
                />
                <div >
                  <button type="button" onClick={handleCancel}>
                    Cancelar
                  </button>
                  <button type="submit" disabled={uploading} >
                    {uploading ? 'Subiendo...' : 'Subir Imagen'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      );
} 