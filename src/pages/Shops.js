import React, {useEffect, useState} from 'react'
import List from '../components/shops/List'
import AppBar2 from '../components/appbar/appBar2';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
export const Shops = () => {
  const [stat, setstat] = useState(false)
  setTimeout(() => {
    setstat(true) 
  }, 2000);
  return ( 
    <>
    <AppBar2/>
<div style={{ background:"#D3D3D3", width:"100%"}}>

<Container align='center' sx={{width:'100%'}}
>
<Box  display="flex" justifyContent="center" sx={{ p: 2 }}>
              <Typography variant="h4">Shops Available</Typography>
 </Box>
{stat==false ? <CircularProgress align='center' /> : <List/>}

</Container>
</div>
</> 
    
  )
}
