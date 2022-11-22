import React,{useEffect, useState} from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { products } from "../../data";
import SingleProduct from "./SingleProduct";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import SingleProductDesktop from "./SingleProductDesktop";
import Axios from 'axios'; 
import { useUIContext } from "../../context/ui";

export default  function Products({shop}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { setCart,Prot,SortP, setSortP, 
    setProt} = useUIContext();
  const [Pro, setPro] = useState([]);
 let newItem= Pro.filter((s)=> s.ShopName==shop)

useEffect(()=>{
   Axios.get("https://timelyclotheengine.herokuapp.com/products").then((res)=>{
    console.log(res.data) 
   
    setPro(res.data)
   })
   let cartData= localStorage.getItem("Cart");
   let data=JSON.parse(cartData);
   if(data){
      setCart(data);
   }
  ; 
},[])
   
   
  const renderProducts = newItem.filter((s)=> s.ProductName.toLowerCase().includes(Prot.toLowerCase())).map((product) => (
    <Grid item key={product.idshopsproducts} xs={2} sm={4} md={4} display="flex" flexDirection={'column'} alignItems="center">
      {matches ? (
        <SingleProduct product={product} matches={matches} />
      ) : (
        <SingleProductDesktop product={product} matches={matches} />
      )}
    </Grid>
  ));


  return (
    <Container>
      <Grid        
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px` }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
         {renderProducts}
      
      </Grid>
    </Container>
  );
}
