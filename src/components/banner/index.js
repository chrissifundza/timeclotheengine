import React, {  useState } from 'react';
import { Button, IconButton, InputBase, Paper, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerShopButton,
  BannerTitle,
} from "../../styles/banner";
import {
	useJsApiLoader,
	GoogleMap,
	Marker,
	Autocomplete,
	DirectionsRenderer,
} from "@react-google-maps/api";
import DirectionsIcon from '@mui/icons-material/Directions';
import { useNavigate } from 'react-router-dom'
export default function Banner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate()
  const [Place, setPlace] = useState('');

const findPlace=()=>{
  Place!==""? navigate("/shops", {state:{place:Place}}) :alert("Field is empty")
console.log(Place) 
}
  return (
    <BannerContainer >
      <BannerImage src="/images/banner/nn.png" />
      <BannerContent> 
        <Typography variant="h6">Huge Collection</Typography>
        <BannerTitle variant="h2">
          New Fashion 
        </BannerTitle>

        <BannerDescription variant="subtitle">
          Black Friday is here, Get Up to 50% discount on your next purchase, Hurry
          the more you buy the more you save, start budgeting wise.
        </BannerDescription>

       
        <Paper
      component="form" 
      sx={{ p: '2px 4px', display: 'flex', flexDirection:"row", alignItems: 'center', width: 400 }}
    >
      <Autocomplete  inputProps={{ 'aria-label': 'search google maps' }}>
      <InputBase
        sx={{ ml: 1, flex: 1, width: 350 }}
        placeholder="Enter your Address to order"
        onChange={(event)=>{setPlace(event.target.value)}}
      /></Autocomplete>
      <IconButton onClick={()=>findPlace()} type="button" sx={{ p: '10px' }} aria-label="search">
         
        <DirectionsIcon  />
      </IconButton>
      
    </Paper>
      </BannerContent>
    </BannerContainer>
  );
}
