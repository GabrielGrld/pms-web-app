import { Link } from 'react-router-dom';
import { useState } from 'react';
import {useFirestore} from '../hooks/useFirestore'

//Material UI components for Layout
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import  CardActionArea  from '@mui/material/CardActionArea';
import EditIcon from '@mui/icons-material/Edit';
import PaidIcon from '@mui/icons-material/Paid';

//Styles
import  './Card.css';


export default function ActionAreaCard({ item}) {
  const [sold, setSold] = useState(null)

  // Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
console.log(item.sold)
const {updateDocument, response} = useFirestore('productos')
console.log(item)
  const handleSold = async () =>{      
      if (!item.sold){
        setSold(true)
      }else{
        setSold(false)
      }      
      const updateToDo={
        sold        
      }
      await updateDocument(item.id, updateToDo)
      if(!response.error){          
      }
  }




  const price = parseInt(item.price)
  const priceFormat = formatter.format(price);
  return (
    <>
    
    <Card className="card" sx={{ maxWidth: 345, minHeight:450, maxHeight:450    }}>
    <Link  to={{pathname: `/producto/${item.id}`, query: {item }}}>
      <CardActionArea>      
        <CardMedia
          component="img"
          height="240"
          image={item.imgUrl} 
          alt="emerald"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name.length<18?item.name: item.name.substring(0,14)+"..."}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary" className="card">
            {item.details}
          </Typography> */}
          <div className="specs">
          <Typography variant="body2" color="text.secondary" className="card">
            Precio: {priceFormat}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="card">
            ct: {item.ct}
          </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      </Link>
      <Link  to={{pathname: `/producto/${item.id}`, query: {item }}}>
      <button className="comprar" onClick={()=>console.log("comprar activado")}> <EditIcon /> </button>
      </Link>
      <button className="comprar" onClick={handleSold}> <PaidIcon /> </button>

    </Card>
    
    </>
  );
}