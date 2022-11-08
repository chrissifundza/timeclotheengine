import React, {useEffect,useState} from 'react';
import {Paper,Container,Typography, TextField, Button,} from '@mui/material';
import AppBar from '../components/appbar/';
import Axios from 'axios';
import { useUIContext } from "../context/ui";
import swal from 'sweetalert';
import LoadingButton from '@mui/lab/LoadingButton';
export const Profile = () => {
  const [UserLoged, setUserLoged] = useState([])
  const {currentUserEmail,  LastName, setLastName,
    UserName, setUserName, ID } = useUIContext();
    const [loading, setLoading] = useState(false);
   
   
    function Update(){
      setLoading(true)
      Axios.put('https://timelyclotheengine.herokuapp.com/update',{Name:UserName,LastName:LastName,id:ID}).then((response)=>{
        setLoading(false)
      swal('Success','Updated successfully','success')

      })
      
      }
  
    
      //getCurrentUser() 
      
  return (
    <div> 
        <AppBar/>
        <div className='cc'>
        <Container component="main" maxWidth="sm" sx={{ mb: 4, }} > 
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            User Profile 
          </Typography>
          <TextField sx={{mb:1}} value={UserName} onChange={(e)=>setUserName(e.target.value)} fullWidth label="Name" id="Name" />
          <TextField sx={{mb:1}} value={LastName} onChange={(e)=> setLastName(e.target.value)} fullWidth label="Last Name" id="fullWidth" />
          <TextField disabled sx={{mb:1}} value={currentUserEmail} fullWidth label="Email" id="fullWidth" />
          <LoadingButton loading={loading} loadingPosition="end" variant="contained"  fullWidth onClick={Update}>Update</LoadingButton>
          </Paper>
        </Container>
        </div>
    </div>
  ) 
}
