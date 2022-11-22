import React, {  useState } from 'react';
import {
    Box,
    Divider,
    IconButton,
    InputBase,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
    Typography,
  } from "@mui/material";
  import {
    AppbarActionIcons,
    AppbarContainer,
    AppbarHeader,
    MyList,
  } from "../../styles/appbar";
  import { useNavigate } from 'react-router-dom'
  import PersonIcon from "@mui/icons-material/Person";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import SearchIcon from "@mui/icons-material/Search";
  import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
  import Actions from "./actions";
  import { useUIContext } from "../../context/ui";
  import Link from '@mui/material/Link';
  import { useLocation } from 'react-router-dom'
  import Logged from "../menu/logged";
  import LoggedOut from "../menu/loggedout";
  export default function AppBar3({ matches }) {
  
    const { Prot, setProt, currentUser} = useUIContext();
    const navigate = useNavigate()
    const location = useLocation();
    console.log(location.state.place)
    const Home =()=>{
        navigate("/shops", {state:{
          place:location.state.place
        }})
    }
  
    return (
        <>
      <AppbarContainer>
        <div className='th'>
        <AppbarHeader  variant="h4" display={"flex"} flexDirection={"row"}><Link sx={{color:"unset"}} href="/" underline="none">TC Engine</Link></AppbarHeader>
        </div>
       <div className="Header">
        <h5>{location.state.place}</h5>
        <button className='btn' onClick={Home}>Back To Shops</button>
        <Paper sx={{borderRadius:20, pl: 1,pr: 1, mb:1}}>
        <InputBase
        sx={{ ml: 1, flex: 1, width: 350 , }}
        placeholder="Search products"
        onChange={(event)=>{setProt(event.target.value)}}
      />
      <IconButton onClick={()=>alert("clicked")} type="button" sx={{ p: '10px' }} aria-label="search">
         
        <SearchIcon  />
      </IconButton>
      </Paper>
       </div>
         <Actions matches={matches} />
         {currentUser=="LoggedIN"?<Logged/>:<LoggedOut/>}   
      </AppbarContainer>
      </>
    );
  }
  