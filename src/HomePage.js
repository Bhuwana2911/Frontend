import React from 'react'
import Navbar from './Navbar'
// import image from './images/HomePage image.webp'
import { isExpired } from 'react-jwt'

function HomePage() {
//   if(isExpired(localStorage.getItem('jwtToken'))){
//     alert("Session Timeout. Please  Login");
//     window.location.href("/admin")
// }
  return (

    <div>        
       <Navbar></Navbar>       
    </div>

   

  )
}

export default HomePage