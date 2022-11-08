import React from 'react'
import Appbar from '../components/appbar'

export const ContactUs = () => {
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
        <p>If you have any questions or any types of quries related to Timely Clothe Engine, you can send me message from here. It's my pleasure to help you.</p>
      <form action="#">
        <div className="input-box">
          <input type="text" placeholder="Enter your name"/>
        </div>
        <div className="input-box">
          <input type="text" placeholder="Enter your email"/>
        </div>
        <div className="input-box message-box">
        <textarea id="w3review" name="w3review" rows="4" cols="50"/>
        </div>
        <div className="button">
          <input type="button" value="Send Now" />
        </div>
      </form>
    </div>
    </div>
  </div> 
    </>
  )
}
