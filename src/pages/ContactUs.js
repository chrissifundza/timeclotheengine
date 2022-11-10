import React, {useState} from 'react'
import Appbar from '../components/appbar'
import Axios from 'axios';
import swal from 'sweetalert'
export const ContactUs = () => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Message, setMessage] = useState('');

  function handleSubmit(){
    Axios.post('http://localhost:3001/contactemail',{
      Name:Name,  
      Email:Email,
      Message:Message
    }).then((response)=>{
      swal("Success","Message successfully sent","success")
      
    })
  }
  return (
    
    <>
    <Appbar />
       <div className="container7">
    <div className="content7">
      <div className="left-side">
        <div className="address details">
          <i className="fas fa-map-marker-alt"></i>
          <div className="topic">Address</div>
          <div className="text-one">Surkhet, NP12</div>
          <div className="text-two">Pretoria Central Building 06</div>
        </div>
        <div className="phone details">
          <i className="fas fa-phone-alt"></i>
          <div className="topic">Phone</div>
          <div className="text-one">011 9893 5647</div>
          <div className="text-two">011 3434 5678</div>
        </div>
        <div className="email details">
          <i className="fas fa-envelope"></i>
          <div className="topic">Email</div>
          <div className="text-one">timelyclotheengine@gmail.com</div>
          <div className="text-two">info@gmail.com</div>
        </div>
      </div>
      <div className="right-side">
        <div className="topic-text">Send us a message</div>
        <p>If you have any questions or any type of quries related to Timely Clothe Engine, you can send us a message from here. It's our pleasure to help you.</p>
      <div>
        <div className="input-box">
          <input type="text" onChange={(e)=> setName(e.target.value)} placeholder="Enter your name"/>
        </div>
        <div className="input-box">
          <input type="text" onChange={(e)=> setEmail(e.target.value)} placeholder="Enter your email"/>
        </div>
        <div className="input-box message-box">
        <textarea onChange={(e)=> setMessage(e.target.value)} id="w3review" name="w3review" rows="4" cols="50"/>
        </div>
        <div className="button">
          <input type="button" onClick={handleSubmit} value="Send Now" />
        </div>
      </div>
    </div>
    </div>
  </div> 
    </>
  )
}
