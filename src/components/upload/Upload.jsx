'use client'
import {useState, useRef} from 'react'
import {supabase} from '@/lib/supabaseClient'

export default function CargarImagen({user, nombre}){
    const [imagen, setImagen] = useState(null)
    const [preview, setPreview] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const fileInputRef = useRef(null)
    
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
            
            const fileName = `${nombre}-${user}`
            const {error} = await supabase.storage
                .from('fotos')
                .upload(`${user}/1/${fileName}`,imagen)
            if(error) throw error
            const {data:{publicUrl}} =supabase.storage
                .from('fotos')
                .getPublicUrl(`${user}/${fileName}`)
            setImageUrl(publicUrl)
            alert('Imagen subida con éxito')

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
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <form onSubmit={handleUpload}>
            <div style={{ marginBottom: '20px' }}>
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
              <label htmlFor="imageUpload" style={{
                display: 'inline-block',
                padding: '10px 15px',
                backgroundColor: '#4CAF50',
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '10px'
              }}>
                Seleccionar Imagen
              </label>
            </div>
    
            {preview && (
              <div style={{ marginBottom: '20px' }}>
                <h3>Vista Previa:</h3>
                <img 
                  src={preview} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '300px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }} 
                />
                <div style={{ marginTop: '10px' }}>
                  <button 
                    type="button" 
                    onClick={handleCancel}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '10px'
                    }}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    disabled={uploading}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: uploading ? '#cccccc' : '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: uploading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {uploading ? 'Subiendo...' : 'Subir Imagen'}
                  </button>
                </div>
              </div>
            )}
          </form>
    
          {imageUrl && (
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h3>Imagen Subida:</h3>
              <img 
                src={imageUrl} 
                alt="Uploaded content" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '300px',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }} 
              />
              <p style={{ wordBreak: 'break-all' }}>URL: {imageUrl}</p>
            </div>
          )}
        </div>
      );

} 