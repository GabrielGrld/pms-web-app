import {useState} from 'react'

import {useFirestore} from '../../hooks/useFirestore'

//styles
import './Product.css'

function UpdateProduct({product}) {
    const {updateDocument, response} = useFirestore('productos')


    const [name, setName] = useState(product.name)
    const [ct, setCt] = useState(product.ct)
    const [details, setDetails] = useState(product.details)
    const [price, setPrice] = useState(product.price)

    const handleSubmit = async (e) =>{
        e.preventDefault()
  
        const updateToDo={
          name,
          details,
          ct,
          price,
          
        }
  
        await updateDocument(product.id, updateToDo)
        if(!response.error){
            
        }
       
  
    }


    console.log(product)
    return(
        <div className='form-container'>
            <h3>Actualizar Producto</h3>
            <form onSubmit={handleSubmit} className='form' >
            
                <label>
                    <span>Nombre: </span>
                    <input
                     type="text" 
                     onChange ={(e)=>setName(e.target.value)}
                     value = {name}
                    />
                </label>
                <label>
                    <span>Detalles: </span>
                    <textarea
                     type="text" 
                     onChange ={(e)=>setDetails(e.target.value)}
                     value = {details}
                    />
                </label>
                <label>
                    <span>Kilate: {product.name}</span>
                    <input
                     type="number" 
                     onChange ={(e)=>setCt(e.target.value)}
                     value = {ct}
                    />
                </label>
                <label>
                    <span>Precio:</span>
                    <input
                     type="number" 
                     onChange ={(e)=>setPrice(e.target.value)}
                     value = {price}
                    />
                </label>
                <button className='btn'>Actualizar</button>
            </form>

            
        </div>
    )



}


export default UpdateProduct;