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
  export default function AppBar2({ matches }) {
  
    const { Res, setRes, currentUser} = useUIContext();
    const navigate = useNavigate()
    const location = useLocation();
    const Home =()=>{
        navigate("/")
    }
  console.log(Res)
    return (
        <>
      <AppbarContainer>
        <div className='th'>
        <AppbarHeader  variant="h4" display={"flex"} flexDirection={"row"}>TC Engine</AppbarHeader>
        </div>
       <div className="Header">
        <h5>{location.state.place}</h5>
        <button className='btn' onClick={Home}>Change Addres</button>
        <Paper sx={{borderRadius:20, pl: 1,pr: 1, mb:1}}>
        <InputBase
        sx={{ ml: 1, flex: 1, width: 350 , }}
        placeholder="Search Fashion Shop of your Choice"
        onChange={(event)=>{setRes(event.target.value)}}
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
  