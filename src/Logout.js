import React, { useContext } from 'react'

function Logout() {
  const {setAuthenticated} = useContext(true)

  function handleLogout(){
    window.localStorage.removeItem("jwtToken");
    setAuthenticated(false);
    window.location.href = '/';

  }
  return handleLogout;
  
}

export default Logout