import React, {useState, useEffect} from 'react';
import Appbar from '../components/appbar';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,SearchBar, Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Axios from 'axios'; 
import { useUIContext } from "../context/ui";
 const TrackOrder = () => {
  const {currentUserEmail } = useUIContext();
   
    
      const [rows, setRows] = useState([]);

      const [searched, setSearched] = useState("");
    
      const requestSearch = (searchedVal) => {
      /*  const filteredRows = originalRows.filter((row) => {
          return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });*/
       // setRows(filteredRows);
      };
    
      const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
      };
      
      useEffect(()=>{
        Axios.get("https://timelyclotheengine.herokuapp.com/orders").then((res)=>{
         console.log(res.data) 
        setRows(res.data)
         
        })
      },[])
      let count =0
  return (
    <div >
       
        <Appbar/>

        <div className='cc'>
        <Typography sx={{mb:2}} variant="h4">Track your Order</Typography>
        <Container>
        <Paper>
        
      
        <TableContainer>
          <Table sx={{minWidth:650}} aria-label="simple table">
            <TableHead>
              <TableRow >
              <TableCell sx={{fontWeight:"Bold"}} >Order No.</TableCell>
                <TableCell sx={{fontWeight:"Bold"}}>Items Ordered</TableCell>
               
                
                <TableCell sx={{fontWeight:"Bold"}} align="right">Total Amount</TableCell>
                <TableCell sx={{fontWeight:"Bold"}} align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.filter((pro)=>pro.Email==currentUserEmail).map((row, index) => (
                <TableRow key={row.idorders}>
                  <TableCell >{count=count+1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.Products}
                  </TableCell>
                  <TableCell align="right">R{row.Total}</TableCell>
                  <TableCell align="right">{row.Status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
        </Container> 
        </div>
    </div>
  )
}
export default TrackOrder;