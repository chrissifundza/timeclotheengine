import React from 'react'
import { Avatar, Button, Divider, Drawer, Link, Paper, Typography, useMediaQuery, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Colors } from '../../styles/theme';
import { useUIContext } from "../../context/ui";
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {

    const {Cart, setShowCart, ShowCart,TotalPrice, 
        setTotalPrice, setCart } = useUIContext();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"))
    let total = 0;

     Cart.forEach((item)=> {
        
       total= total+ parseInt(item.ProductPrice)
    
    });
    const removeCartItem = (id)=>{
let newItemCart = Cart.filter((item)=> item.idshopsproducts !==id)
setCart(newItemCart)
localStorage.setItem("Cart",JSON.stringify(newItemCart))
    }
    
    const cartContent = Cart.map(item=>(
        <Box key={item.idshopsproducts}>
            <Box
                display="flex"
                sx={{
                    pt:2, pb:2
                }}
                alignItems="start"
                justifyContent={"space-between"}
               
            >
                 <Avatar src={item.ProductPhoto} sx={{width:96, height:96, mr:2}}/>
                 <Box display="flex" flexDirection={"column"}>
                    <Typography variant="h6">{item.ProductName}</Typography>
                    <Typography variant="subtitle2">{item.ProductDiscription}</Typography>
                 </Box>
                 <Typography variant="body1" justifyContent={"end"}>
                    R{item.ProductPrice}
                 </Typography>
                
                 <Typography sx={{cursor:"pointer"}} onClick={()=>removeCartItem(item.idshopsproducts)}> 
                    <DeleteIcon/>
                 </Typography>
            </Box>
            <Divider variant='inset'/>
        </Box>
    ))
  return (
    <Drawer  open={ShowCart} onClose={()=>setShowCart(false)}
    anchor="right"
    PaperProps={{
        sx:{
            width:500,
            background: Colors.light_gray,
            borderRadius:0,
        }
    }}
    >
 <Box 
 sx={{p:4}}
 display="flex"
 justifyContent={"center"}
 flexDirection="column"
 alignItems="center"
 
 >
    <Typography variant='h3' color={Colors.black}>Your Cart</Typography>
    <Typography variant='body1' color={Colors.muted} alignItems="center" justifyContent={"center"} textAlign="center">
        Please review the product added to your cart before you can proceed to check out
    </Typography>
    <Paper
    elevation={0}
    justifyContent={"center"}
    alignItems="center"
    sx={{
        mt:2,
        width:"90%",
        padding:4,
        display:"flex",
        flexDirection:"column"
        
    }}
   
    >{Cart.length >0 ? cartContent: <Typography align='center' sx={{mt:3}} variant='h5' color={Colors.black} >Cart is Empty</Typography>}
    
   {Cart.length >0 ? <Typography sx={{mt:3}} variant='h5' color={Colors.black} >Total Price R{total}</Typography>:""} 
   {Cart.length >0 ? <Link href="/checkout"><Button variant='contained'  sx={{mt:4}}>Proceed to checkout</Button></Link> :""}
   
    
    </Paper>
    
    
    </Box>

    </Drawer>
  )
}
