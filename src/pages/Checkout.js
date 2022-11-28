import React, {useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '../components/checkout/AddressForm';
import PaymentForm from '../components/checkout/PaymentForm';
import Review from '../components/checkout/Review';
import { useUIContext } from "../context/ui";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import swal from 'sweetalert';
import CircularProgress from '@mui/material/CircularProgress'
function Copyright() { 
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export  const Checkout =()=> {
 
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [Reference, setReference] = React.useState('');
  const navigate =useNavigate()
  const {TotalPrice, 
    setTotalPrice,
    CombinedProducts, 
    setCombinedProducts,
    CombinedAddress, 
    setCombinedAddress,
    Address2, 
    City, 
    Province, 
    ZipCode, 
    Country,
    CardCombinded, 
    CardName, 
    CardNumber, 
    ExpiryDate, 
    CVV, 
    ID,
    setCardCombinded,
    currentUserEmail } = useUIContext();
  const handleNext = () => {
    if(activeStep==2){
      console.log(CombinedProducts)
      console.log(CombinedAddress)
      console.log(CardCombinded)
      console.log(TotalPrice)
      setActiveStep(2)
      payMent()
    }
    
if((activeStep==0)&&(Address2=="" || City=="" || Province=="" || ZipCode=="" ||Country=="")){
  console.log("yes")
    setActiveStep(0)
    //alert("Enter All Address Details!")
    swal("Error","Enter All Address Details!",'error')
    return false
}else{
setActiveStep(activeStep + 1)
}
if((activeStep==1)&&(CardName=="" || CardNumber=="" || ExpiryDate=="" || CVV=="")){
  console.log("yes")
    setActiveStep(1)
    //alert("Enter All Address Details!")
    swal("Error","Enter All Card Details!",'error')
    return false
}
if (CardNumber!==""&& isNaN(CardNumber)){
  setActiveStep(1)
  swal("Error","Card Number Enter numbers only !",'error')
  return false
}
 if(CardNumber!==""&&CardNumber.length !== 16){
  setActiveStep(1)
  swal("Error","Card number Enter 16 digits !",'error')
  return false
}
if (CVV!==""&& isNaN(CVV)){
  setActiveStep(1)
  swal("Error","CVV Enter numbers only !",'error')
  return false
}
if(CVV!==""&&CVV.length !== 3){
  setActiveStep(1)
  swal("Error","CVV Enter 3 digits only !",'error')
  return false
}
else{
  setActiveStep(activeStep + 1)
}
    
    console.log(activeStep);
    
  };
  const data= localStorage.getItem("Cart")
  let arrayData = JSON.parse(data)
  console.log(arrayData)
  function payMent(){
    Axios.post('https://timelyclotheengine.herokuapp.com/payment',{
      CardName:CardName,
      CardNumber: CardNumber,
      ExpiryDate: ExpiryDate,
      CVV: CVV,
      idusers:ID
     
    }).then((response)=>{
      createOrder()
    })
  }
 function createOrder() {
    Axios.post('https://timelyclotheengine.herokuapp.com/placeorder',{
      Email:currentUserEmail,
      Products: CombinedProducts.join(", "),
      Address: CombinedAddress.join(", "),
      Card: CardCombinded.join(", "),
      Total: TotalPrice,
      Status:"Ordered",
      idusers:ID
     
    }).then((response)=>{
      
      
   //   generateString(10);
   getOrder() 
    })
  }
let last = 0
  function getOrder() {
    Axios.get("https://timelyclotheengine.herokuapp.com/orders").then((res)=>{
      console.log(res.data) 
     let totalOrders = res.data.length - 1
     console.log(totalOrders)
     console.log(res.data[totalOrders].idorders)
      
      last = res.data[totalOrders].idorders
      OrderedProduct()
     })
     
    
  }
  function OrderedProduct(){
  
    Axios.post('https://timelyclotheengine.herokuapp.com/addorderedproduct',{array:arrayData,orderid:last}).then((response)=>{
      
      
      generateString(10);
    })
  }
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    
    setReference(result)
    sendEmail1(result)
}


function sendEmail1(reference){
  Axios.post('https://timelyclotheengine.herokuapp.com/orderemail',{
    Email:currentUserEmail,
    Reference:reference
  }).then((response)=>{
    swal("Success","Order successfully placed","success")
    localStorage.clear()
    setActiveStep(activeStep + 1)
  })
}
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const { currentUser} = useUIContext();
useEffect(()=>{

},[])
if (currentUser!=="LoggedIN") {
  navigate("/signin")
}
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ background:"#D3D3D3", width:"100%"}}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4, }} > 
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Box display='flex' flexDirection={"column"} justifyContent={"center"} alignItems="center">
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is genereated as follows #{Reference==""?<CircularProgress align='center' />:Reference}. We will email your order
                  confirmation with reference, and will send you an update when your order has
                  shipped. 
                </Typography>
                <Link href="/" ><Button variant='contained' sx={{mt:4}}>Continue Shopping</Button></Link>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={()=>handleNext()}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
      </div>
    </ThemeProvider>
  );
}
