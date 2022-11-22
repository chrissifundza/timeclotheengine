import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Axios from 'axios';
export const UIContext = createContext({});
export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [Cart, setCart] = useState([]);
    const [ShowCart, setShowCart] = useState(false) 
    const [Shop, setShop] = useState([])
    const [Res, setRes] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentUser, setCurrentUser] = useState('');
    const [currentUserEmail, setCurrentUserEmail] = useState('');
    const [Address1, setAddress1] = useState('')
    const [Address2, setAddress2] = useState('')
    const [City, setCity] = useState('')
    const [Province, setProvince] = useState('')
    const [ZipCode, setZipCode] = useState('')
    const [Country, setCountry] = useState('')
    const [CardName, setCardName] = useState('')
    const [CardNumber, setCardNumber] = useState('')
    const [ExpiryDate, setExpiryDate] = useState('')
    const [CVV, setCVV] = useState('')
    const [TotalPrice, setTotalPrice] = useState(0)
    const [CombinedAddress, setCombinedAddress] = useState([])
    const [CombinedProducts, setCombinedProducts] = useState([])
    const [CardCombinded, setCardCombinded] = useState([])
    const [Prot, setProt] = useState('')
    const [LoggedUserMy, setLoggedUserMy] = useState('')
    const [UserName, setUserName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Photo, setPhoto] = useState("https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg")
    const [ID, setID] = useState(0)
    const [SortP, setSortP] = useState('')
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const Checkout=()=>{
        localStorage.setItem("Cart",JSON.stringify(Cart))
        setShowCart(true);
        }
//Sign up
      
        //Login
        function login(email, password) {
          return auth.signInWithEmailAndPassword(email, password);
        }
      // Logout
        function logout() {
          return auth.signOut();
        }
      //Reset password
        function resetPassword(email) {
          return auth.sendPasswordResetEmail(email);
        }

        useEffect(() => {
          const unsubscribe = auth.onAuthStateChanged((user) => {

            if(user){
              console.log("User logged in")
              setCurrentUser("LoggedIN");
              
            }else{
              console.log("User logged out")
              setCurrentUser("LoggedOUT");
            }
            
            console.log(user.email)
            setCurrentUserEmail(user.email)
            
            setLoggedUserMy(getUse(user.email))
          });
      
          return unsubscribe;
        }, []);
       
          
        async function getUse(user){
         let response= await Axios.get("https://timelyclotheengine.herokuapp.com/user/"+user)
            console.log(response.data)
            setUserName(response.data[0].Name)
            setLastName(response.data[0].LastName)
            setPhoto(response.data[0].UserPhoto)
            setID(response.data[0].idusers)

         return response.data
         }
        
          
    const value = {
      ID, 
        open,
        handleClick,
        handleClose,
        anchorEl,
        Shop,
        setShop,
        drawerOpen,
        setDrawerOpen,
        showSearchBox, 
        setShowSearchBox,
        Cart,
        setCart,
        Res, 
        setRes,
        ShowCart,
        Checkout,
        setShowCart,
        currentUser,
       
        Address1, 
        setAddress1,
        Address2, 
        setAddress2,
        City, 
        setCity,
        Province, 
        setProvince,
        ZipCode, 
        setZipCode,
        Country, 
        setCountry,
        CardName, 
        setCardName,
        CardNumber, 
        setCardNumber,
        ExpiryDate, 
        setExpiryDate,
        CVV, 
        setCVV,
        TotalPrice, 
        setTotalPrice,
        CombinedProducts, 
        setCombinedProducts,
        CombinedAddress, 
        setCombinedAddress,
        CardCombinded, 
        setCardCombinded,
        currentUserEmail,
        Prot, 
        setProt,
        LoggedUserMy, 
        setLoggedUserMy,
        LastName, 
        setLastName,
        UserName, setUserName,Photo, setPhoto,SortP, setSortP
    };

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}