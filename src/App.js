import logo from "./logo.svg";
import "./App.css";
import { Container, Typography, Box, Stack, Grid, Button } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import theme from "./styles/theme";
import { UIProvider } from "./context/ui";
import { useEffect } from "react";
import { BrowserRouter , Routes, Route } from 'react-router-dom'

import { Home } from "./pages/Home";
import {Shops} from './pages/Shops';
import {Checkout} from './pages/Checkout'
import Product from "./pages/Product";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import TrackOrder from './pages/TrackOrder';
import SearchBox from "./components/search/index";
import Footer from "./components/footer";
import AppDrawer from "./components/drawer/index";
import { Profile } from "./pages/Profile";
import { Cart } from "./components/cart";
import { AboutUs } from "./pages/AboutUs";
import { ContactUs } from "./pages/ContactUs";

function App() {
  useEffect(() => {
    document.title = "Time Clothe Engine";
  }, []);
 
  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          background: "#fff",
        }}
      >
        <Stack>
          <UIProvider>
          
          <SearchBox />
          <Cart/>
            <BrowserRouter>
                <Routes>
                  
                  <Route exact path="/" element={<Home/>}/>
                  <Route exact path="/shops" element={<Shops/>}/>
                  <Route exact path="/aboutus" element={<AboutUs/>}/>
                  <Route exact path="/contactus" element={<ContactUs/>}/>
                  <Route exact path="/products" element={<Product/>}/>
                  <Route exact path="/checkout" element={<Checkout/>}/>
                  <Route exact path="/signin" element={<SignIn/>}/>
                  <Route exact path="/signup" element={<Signup/>}/>
                  <Route exact path="/orders" element={<TrackOrder/>}/>
                  <Route exact path="/profile" element={<Profile/>}/>
                </Routes>
            
             </BrowserRouter>
             <Footer />
            <AppDrawer />
          </UIProvider>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
