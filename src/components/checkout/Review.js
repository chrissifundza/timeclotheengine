import React, {useEffect} from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useUIContext } from "../../context/ui";





export default function Review() {
  const { 
    CardName, 
    CardNumber, 
    ExpiryDate, 
    CVV, 
    Address1, 
    Address2, 
    City, 
    Province, 
    ZipCode, 
    Country,
    TotalPrice, 
    setTotalPrice,
    CombinedProducts, 
    setCombinedProducts,
    CombinedAddress, 
    setCombinedAddress,
    CardCombinded, 
    setCardCombinded
  } = useUIContext();
  const addresses = [Address1, Address2, City, ZipCode, Country];
  //setCombinedAddress(addresses)
  const payments = [
    { name: 'Card type', detail: CardName },
    { name: 'Card number', detail:  cardHide(CardNumber) },
    { name: 'Expiry date', detail: ExpiryDate},
  ];
  function cardHide(card) {
    let hideNum = [];
    for(let i = 0; i < card.length; i++){
      if(i < card.length-4){
        hideNum.push("*");
      }else{
        hideNum.push(card[i]);
      }
    }
    return hideNum.join("");
  }
  useEffect(()=>{
    setCombinedAddress(addresses)
    
    CardCombinded[0]=CardName;
    CardCombinded[1]=CardNumber;
    CardCombinded[2]=ExpiryDate;
    const data2= localStorage.getItem("Cart")
  let arrayData2 = JSON.parse(data2)
  let pr=0
  
  arrayData2.forEach(element => {
    let pro=element.ProductName+" - R"+element.ProductPrice
    CombinedProducts.push(pro)
    pr=pr+ parseInt(element.ProductPrice) ;
    setTotalPrice(pr);
  });
  },[])
  //setCardCombinded(payments)
  const data= localStorage.getItem("Cart")
  let arrayData = JSON.parse(data)
  let pr=0
  /*
  arrayData.forEach(element => {
    let pro={name:element.ProductName,price:"R"+element.ProductPrice}
    CombinedProducts.push(pro)
    pr=pr+element.ProductPrice;
    setTotalPrice(pr);
  });
  console.log(arrayData);*/
  let total=0;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {arrayData.map((product) => (
          <ListItem key={product.ProductName} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.ProductName} secondary={product.ProductDiscription} />
            <Typography variant="body2">R{product.ProductPrice}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          R{TotalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}