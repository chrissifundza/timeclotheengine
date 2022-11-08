import { useEffect, useState } from "react";
import {
  ExtraActionsWrapper,
  Product,
  ProductActionButton,
  ProductActionsWrapper,
  ProductAddToCart,
  ProductFavButton,
  ProductImage,
  ProductMetaWrapper,
} from "../../styles/product";
import { Stack, Tooltip, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import useDialogModal from "../../hooks/useDialogModal";
import ProductDetail from "../productdetail";
import ProductMeta from "./ProductMeta";
import useCart from "../../hooks/useCart";
import { useUIContext } from "../../context/ui";

export default function SingleProductDesktop({ product, matches }) {
  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ProductDetail);

    
    
    
 const {Cart, setCart} = useUIContext();

 const addToCart = ()=>{
  if( Cart.findIndex(c => c.idshopsproducts === product.idshopsproducts ) >=0){
      let newArr = Cart.filter(c => c.idshopsproducts !== product.idshopsproducts)
      setCart(newArr)
      localStorage.setItem("Cart",JSON.stringify(newArr))
  }else{
    let ElseCart = [...Cart,product]
      setCart(ElseCart)
      localStorage.setItem("Cart",JSON.stringify(ElseCart))
  }
  
 // updateCart() 
}

function updateCart() {
  console.log(Cart)
}
    const addToCartText =  Cart.findIndex(c => c.idshopsproducts === product.idshopsproducts) >=0
    ? "Remove from cart" : "Add to cart" ;
  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };
  return (
    <>
      <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ProductImage src={product.ProductPhoto} />
        <ProductFavButton isfav={0}>
          <FavoriteIcon />
        </ProductFavButton>
        {(showOptions || matches) && (
          <ProductAddToCart show={showOptions} onClick={addToCart} variant="contained">
            {addToCartText}
          </ProductAddToCart>
        )}
        <ProductActionsWrapper show={showOptions || matches}>
          <Stack direction={matches ? "row" : "column"}>
            <ProductActionButton>
              <Tooltip placement="left" title="share this product">
                <ShareIcon color="primary" />
              </Tooltip>
            </ProductActionButton>
            <ProductActionButton onClick={() => showProductDetailDialog()}>
              <Tooltip placement="left" title="Full view">
                <FitScreenIcon color="primary" />
              </Tooltip>
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
      </Product>
      <ProductMeta product={product} />
      <ProductDetailDialog product={product} />
    </>
  );
}
