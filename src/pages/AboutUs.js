import React, {useEffect} from 'react'
import Appbar from '../components/appbar'
import { useUIContext } from '../context/ui';
export const AboutUs = () => {
	const { setCart} = useUIContext();
useEffect(()=>{
  let cartData= localStorage.getItem("Cart");
  let data=JSON.parse(cartData);
  if(data){
     setCart(data);
  }
},[])
  return (
	<><Appbar />
    <div className="section6">
		
		<div className="container6">
			<div className="content-section">
				<div className="title">
					<h1>About Us</h1>
				</div>
				<div className="content6">
					<h3>Our Legacy and Mission Around the Wolrd</h3>
					<p>Timeley Clothe Engine is a global fashion and lifestyle e-retailer 
						committed to making the beauty of fashion accessible to all. 
						We use on-demand manufacturing technology to connect suppliers 
						to our agile supply chain, reducing inventory waste and enabling 
						us to deliver a variety of affordable products to customers around the world.</p>
					<div className="button">
						<a href="/">Back Home</a>
					</div>
				</div>
				<div className="social">
					<a href="https://www.facebook.com/tceengine?mibextid=LQQJ4d"><i className="fab fa-facebook-f"></i></a>
					<a href=""><i className="fab fa-twitter"></i></a>
					<a href="https://instagram.com/timelyclotheengine?igshid=NTdlMDg3MTY="><i className="fab fa-instagram"></i></a>
				</div>
			</div>
			<div className="image-section">
				<img src="https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fabcc2256-4418-11ed-8885-043c27446b97.jpg?crop=1500%2C1000%2C0%2C0"/>
			</div>
		</div>
	</div>
	</>
  )
}
