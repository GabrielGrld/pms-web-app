import React from 'react';
import Card from '../../components/Card';
import { useCollection } from '../../hooks/useCollection'

//Material UI components for responsive grid
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

//Components


//styles
import './Products.css'


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function Home(){
  const {documents, error} = useCollection('productos')
  console.log(documents)

    return(
      
    <div className="container" style={{"margin":"1em"}}>
    <div>
    <h1>Productos Listados Actualmente</h1>
      
      
      <Box sx={{ flexGrow: 1 }} >
      <Grid container  spacing={1} justify = "center"   >
 
{documents && documents.map((document) => (
  <Grid  item xs={12} sm={12} md={12} lg ={4}>    
    <div key={document.id} align="center">
    <Card  
          key = {document.imgUrl}
          title={document.name}
          description ={document.details.substring(0,100)}
          imgLink ={document.imgUrl}
          item = {document} 
          />
    </div>
  </Grid>
))}      

      </Grid>

    </Box>
    </div>
      
      
      
      
      
      
      
      
      </div>)
}


export default Home;