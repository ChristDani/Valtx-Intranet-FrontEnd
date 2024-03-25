import React from 'react'
import Cookies from 'js-cookie'

const LogoutService = () => {
    

        Cookies.remove('token');
        
  }
  
  export default LogoutService;