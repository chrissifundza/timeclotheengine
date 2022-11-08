import { useUIContext } from "../context/ui";

 const useCart=(product)=> { 
    const {Cart, setCart} = useUIContext();

    const addToCart = ()=>{
       // localStorage.clear("Cart")
        if( Cart.findIndex(c => c.idshopsproducts === product.idshopsproducts ) >=0){
            setCart(Cart.filter(c => c.idshopsproducts !== product.idshopsproducts) )
           // localStorage.setItem("Cart",JSON.stringify(Cart))
        }else{
            setCart(c=>[...c, product])
           // localStorage.setItem("Cart",JSON.stringify(Cart))
        }
      
        updateCart() 
    }

    function updateCart() {
        console.log(Cart)
        
       // localStorage.setItem("Cart",JSON.stringify(Cart))
    }
    const addToCartText =  Cart.findIndex(c => c.idshopsproducts === product.idshopsproducts) >=0
    ? "Remove from cart" : "Add to cart" ;
    
    return ( addToCart, addToCartText)
}
export default useCart
