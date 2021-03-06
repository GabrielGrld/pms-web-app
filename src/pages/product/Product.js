import { useLocation, useParams } from "react-router-dom"
import { useDocument } from "../../hooks/useDocument";
import UpdateProduct from './UpdateProduct'


//styles
import './Product.css'

export default function Product() {
    const { id } = useParams();    
    const {error, document} = useDocument('productos', id)

      // Create our number formatter.
    var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    if(document){
    const price = parseInt(document.price)
    var priceFormat = formatter.format(price);
   
    }  
    
    return (
        <div className='single-product'>
            
            {error&&<p>{error}</p>}            
            {document&&(
                <>
                <div className='product'>
                <div className="image-container">
                <img src={document.imgUrl} alt="Imagen de Producto" className="image" />
                <div className="description">
                <h3>{document.name}</h3>
                <span>Descripción</span>
                <p>{document.details}</p>
                <span>Kilates</span>
                <p> ct: {document.ct}</p>                
                </div>
                {priceFormat&&<p>Precio: {priceFormat}</p>}
                </div>                
                {document&&<UpdateProduct product={document} />}
                </div>
                
                </>
            )}
            
        </div>
    )
}
