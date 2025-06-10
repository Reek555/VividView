import { Outlet, Link, useLinkClickHandler } from "react-router-dom";

import { useEffect, useState } from "react";
import Header from "../components/header";
import axios from 'axios';


const url = import.meta.env.VITE_BASE_URL // special way to access envirenment variales in vite


function Layout ({user, yoffset}) {

    //editing insights file in the server:
    useEffect(() => {
      if (localStorage.getItem('visited')) {
        return; 
      }

      localStorage.setItem('visited', true)

      axios({
        method: 'put',
        url: url + '/insights'})
      .catch ( (e) => {
        localStorage.removeItem('visited')
      })
      

    }, []) 



    return (
      <>
      <Header user = {user}  yoffset = {yoffset}/>
      <Outlet  /> 
  
      </>
    )
  }



export default Layout; 