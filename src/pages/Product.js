import React from 'react'
import Appbar from '../components/appbar';
import Products from "../components/products";
import { useLocation } from 'react-router-dom';
import { Container, Paper } from '@mui/material';
import AppBar3 from '../components/appbar/appBar3';
 const Product = () => {
  const location = useLocation();
  
  return (
    <div>
      <AppBar3 />
      <Container>
      <Paper sx={{mb:4}}>
      <div className='ShopClicked'>
        <div className='cover'>
          <img src={location.state.shop[0].ShopCover}/>
        </div>
        <div className='mycard'>
           <div className='left'>
            <div className='icon'>
              <img src={location.state.shop[0].Icon} alt=""/>
            </div>
            <div className='text'>
                <h5>{location.state.shop[0].ShopName} {location.state.shop[0].ShortAddress}</h5>
                <p>{location.state.shop[0].Discription}</p>
            </div>
           </div>
           <div className='right'>
            <div className='cont'> 
            <span><span className='Min'>{location.state.shop[0].ShopDstance >60 ? (location.state.shop[0].ShopDstance/60).toFixed(2) + " hrs": location.state.shop[0].ShopDstance +" min"} </span> away</span>
            </div>
          
           </div>
              
            
            </div>
      </div>
      </Paper>
      </Container>
        <Products shop={location.state.shop[0].ShopName}/>
    </div>
  )
}
export default Product;
