import React, {useEffect}from 'react'

import Promotions from "../components/promotions/index";

import Banner from "../components/banner/index";
import Products from "../components/products";
import { Secure } from '../components/secure';
import { Category } from '../components/category';
import {  Typography, Box,  Grid, Button } from "@mui/material";
import Appbar from '../components/appbar';
import { useUIContext } from '../context/ui';

export const Home = () => {
  const { setCart} = useUIContext();
useEffect(()=>{
  let cartData= localStorage.getItem("Cart");
  let data=JSON.parse(cartData);
  if(data){
     setCart(data);
  }
},[])
  return (
    <div>

         <Appbar />
            <Banner />
            <Promotions />
             <Secure/>
              <Box  display="flex" justifyContent="center" sx={{ p: 2 }}>
              <Typography variant="h4">Category</Typography>
              </Box>
              <Category/>
           
    </div>
  )
}
