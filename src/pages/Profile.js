import React, {useEffect,useState} from 'react';
import {Paper,Container,Typography, TextField, Button, Box,} from '@mui/material';
import AppBar from '../components/appbar/';
import Axios from 'axios';
import { useUIContext } from "../context/ui";
import swal from 'sweetalert';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  
} from "firebase/storage";
import { storage } from '../firebase';
export const Profile = () => {
  const [UserLoged, setUserLoged] = useState([])
  const {currentUserEmail,  LastName, setLastName,
    UserName, setUserName,Photo, ID } = useUIContext();
    const [loading, setLoading] = useState(false);
    const [imageUpload, setImageUpload] = useState(null);
   const [selectedImage, setselectedImage] = useState('');
    function Update(){
      setLoading(true)
      const imageRef = ref(storage, `Profiles/${imageUpload.name }`);
    
    uploadBytes(imageRef, imageUpload).then((snapshot1) => {
      getDownloadURL(snapshot1.ref).then( async (url1) =>  {
        Axios.put('https://timelyclotheengine.herokuapp.com/update',{Name:UserName,LastName:LastName,UserPhoto:url1,id:ID}).then((response)=>{
          setLoading(false)
        swal('Success','Updated successfully','success')
  
        })
        
      })
    })
     
      }
  
      const previewImage = () => {
        console.log("running")
        var input = document.createElement("input");
	      input.type = "file";
        input.onchange = (event) => {
          const imageFiles = event.target.files;
          setImageUpload(event.target.files[0])
          const imageFilesLength = imageFiles.length;
      
          if (imageFilesLength > 0) {
              const imageSrc = URL.createObjectURL(imageFiles[0]);
             // const imagePreviewElement = document.querySelector("#preview-selected-image");
             // imagePreviewElement.src = imageSrc;
             setselectedImage(imageSrc)
             // imagePreviewElement.style.display = "block";
          }
        };
        input.click();
       
    };
      //getCurrentUser() 
     
      
  return (
    <div> 
        <AppBar/>
        <div className='cc'>
        <Container component="main" maxWidth="sm" sx={{ mb: 4, }} > 
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="150px"
                  height="150px"
                  onClick={previewImage}
                  src= {selectedImage !==''?selectedImage:Photo}
                  style={{ cursor: "pointer", borderRadius: "50%" , border:"1px solid grey"}}
                />
              </Box>
              
            </Box>
          <Typography component="h1" variant="h5" align="center">
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
