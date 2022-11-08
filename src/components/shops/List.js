import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Link } from '@mui/material';
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../../firebase';
import { useLocation } from 'react-router-dom'
import { useUIContext } from '../../context/ui';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

 const List = (props) => {
    const [expanded, setExpanded] = React.useState(false);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const navigate = useNavigate()
    const [directionsResponse, setDirectionsResponse] = useState(null);
    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef();
    /** @type React.MutableRefObject<HTMLInputElement> */
    const distiantRef = useRef();
    const {Res, Shop, setShop, setCart} = useUIContext();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
 
  const location = useLocation();

useEffect(()=>{
  navigator.geolocation.getCurrentPosition((position)=>{
    console.log(position.coords.latitude)
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude)
    getAllShops()
   console.log(location.state.place)

   let cartData= localStorage.getItem("Cart");
   let data=JSON.parse(cartData);
   if(data){
      setCart(data);
   }
  })
  
  },[])
  let New=[]
async function getAllShops() {
  //const querySnapshot = await getDocs(collection(db, "Shops"));

  Axios.get("https://timelyclotheengine.herokuapp.com/shops").then((response)=>{
    
   let querySnapshot= response.data
  



  let allShops =  ()=>{
    querySnapshot.forEach((doc) => {
      let shopTemplate={name:doc.ShopName,Address:doc.Address,
        Cover:doc.CoverPhoto,Icon:doc.Icon, ShortAddress:doc.ShortAddress,
        Discription:doc.ShortDiscription, Brand:doc.Brand }
  
      New.push(shopTemplate)
    });
     console.log(New)
     getData(New)
  }
  allShops();
 //getData(allShops)
})

}
  // get data
  
  async function getData(shopTemplate){
    
   console.log(shopTemplate);

    for (let i = 0; i <shopTemplate.length; i++) {
        const element = shopTemplate[i].Address;
        
        
        let distance = await calculateRoute(element);
        let s1=distance.split(" ");
        let element1='';
        if (s1.length==4) {
          element1=(parseInt(s1[0])*60)+parseInt(s1[2]); 
        } else if(s1.length==2){
          element1=(parseInt(s1[0])); 
        }
     
        let NewOBject ={ShopName:shopTemplate[i].name,ShopDstance:element1,ShopCover: shopTemplate[i].Cover, Icon:shopTemplate[i].Icon,ShortAddress:shopTemplate[i].ShortAddress, Discription:shopTemplate[i].Discription, Brand:shopTemplate[i].Brand}
        

        ReadytoOutput(NewOBject)
    }
  

  }
  let Ready1=[]
  
 function  ReadytoOutput(shop){
  Ready1.push(shop)
  Ready1.sort(function(a, b){
   
   

    return (a.ShopDstance - b.ShopDstance)
  
  });
  console.log(Ready1)
  setShop(Ready1)
 }

async function calculateRoute(dist) {
  
  let cont =0;
  /* eslint-disable no-undef */
  if (cont==0){
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: location.state.place,
      destination: dist,
      /* eslint-disable no-undef */
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    
    return  results.routes[0].legs[0].duration.text;
    cont++
  }
  
  
}

const ViewproductShop=( SName)=>{
 let selectedShop= Shop.filter((s)=> s.ShopName==SName)
navigate("/products",{state:{
  shop:selectedShop,
  place:location.state.place
}})
}
    return (
    
     
        <Grid  container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px` }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Shop.filter((s)=> s.ShopName.toLowerCase().includes(Res.toLowerCase())).map((shop)=>{

            return (

              <Grid item xs={12} sm={6} md={4}>
        <Link underline="none" sx={{cursor:"pointer"}} onClick={()=>ViewproductShop(shop.ShopName)}>
        <Card sx={{ maxWidth: "100%", height:280 }}>
         
          <CardMedia
            component="img"
            height="194"
            image={shop.ShopCover}
            alt="Paella dish"
          />
          
          <CardActions disableSpacing>
            <div className='mycard'>
           <div className='left'>
            <div className='icon'>
              <img src={shop.Icon} alt=""/>
            </div>
            <div className='text'>
                <h5>{shop.ShortAddress}</h5>
                <p>{shop.Discription}</p>
            </div>
           </div>
           <div className='right'>
            <div className='cont'> 
            <span><span className='Min'>{shop.ShopDstance >60 ? (shop.ShopDstance/60).toFixed(2) + " hrs": shop.ShopDstance +" min"} </span> away</span>
            </div>
          
           </div>
              
            
            </div>
           
           
          </CardActions>
         
        </Card>
        </Link>
        </Grid>
            )
          }
          
          
          )}
        

       
        </Grid>
        
        
       
      );
}
export default List;