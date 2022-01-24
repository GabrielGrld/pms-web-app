import {useState, useEffect} from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import {useAuthContext} from '../../hooks/useAuthContext'
import {useAddProduct} from '../../hooks/useAddProduct'
import {useHistory} from 'react-router-dom'

//styles
import './EmeraldStore.css'
import { formLabelClasses } from '@mui/material'

const categories = [
    { value: 'anillo', label: 'Anillo' },
    { value: 'collar', label: 'Collar' },
    { value: 'piedra', label: 'Piedra' },
    { value: 'pulsera', label: 'Pulsera' },
  ]

export default function EmeraldStore() {
  const history = useHistory()
  const {addDocument, response} = useAddProduct('productos')  
  const [users, setUsers] = useState([])
  const {user} = useAuthContext()
   

  //form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [ct, setCt] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState(null)
  const [imageError, setImageError] = useState(null)
  const [formError, setFormError] = useState(null)

    //to get the documents and create the users array for the select option
  //This use effect allows us to wait for the documents when it changes from null to an array
  


   const handleSubmit = async (e)=>{
    e.preventDefault()
    setFormError(null)

    if(!category){
        setFormError('Please select a project category')
        return  //this means do not go any further, enede here
    }
      const product = {
        name,
        details,
        ct,
        price, 
        category: category.value,
        sold: false             
      }
      await addDocument(product, image)
       console.log(product, image)
       if(!response.error){
        history.push('/')
       }   
}

const handleFileChange =(e) => {
    setImage(null)
    let selected = e.target.files[0]
    //console.log(selected)

    if (!selected){
      setImageError('Please select a file')
      console.log(imageError)
      return
    }
    if(!selected.type.includes('image')){
      setImageError('Selected file must be an image')
      return
    }
    if(selected.size>250000){
        setImageError('Image file size must be lest that 250kb')
      return
    }

    setImageError(null)
    setImage(selected)
    console.log(selected)
}
return (
  <div className="create-form">
    <h2 className='page-title'>Crear un nuevo articulo</h2>
    <form onSubmit ={handleSubmit} >
      <label>
          <span>Nombre Del articulo</span>
          <input
          required
          type="text"
          onChange ={(e)=>setName(e.target.value)}
          value={name}
           />
      </label>
      <label>
          <span>Descripcion del articulo</span>
          <textarea
          required
          type="text"
          onChange ={(e)=>setDetails(e.target.value)}
          value={details}
           />
      </label>

      <label>
          <span>Kilates</span>
          <input
          required
          type="number"
          onChange ={(e)=>setCt(e.target.value)}
          value={ct}
           />
      </label>
      <label>
          <span>Precio: </span>
          <input
          required
          type="number"
          onChange ={(e)=>setPrice(e.target.value)}
          value={price}
           />
      </label>

      <label >
          <span> Categoría Producto </span>
          <Select
            onChange={(option)=>setCategory(option)} 
            options={categories}
          />
      </label>
      <label>
              <span>Agregar Imagen</span>
              <input
                  required
                  type="file"
                  onChange={handleFileChange}
                  />
                  {imageError &&<div className="error">{imageError}</div>}
            </label> 
      
  
  <button className='btn'>Agregar Producto</button>
  {formError && <p className='error'>{formError}</p>}
    </form>
  </div>
  )
}