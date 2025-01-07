import { Outlet, Link, useLinkClickHandler } from "react-router-dom";

import { useEffect, useState } from "react";
import Header from "../components/header";
import axios from 'axios';


const url = import.meta.env.VITE_BASE_URL // special way to access envirenment variales in vite


const l = {
  'about': 'about page',
  'log in': 'log in page', 
  'sign up': 'sing up page'}


function Layout ({user, yoffset}) {

    //editing insights file in the server:
    useEffect(() => {
      if (localStorage.getItem('visited')) {
        return; 
      }

      axios({
        method: 'put',
        url: url + '/insights'})
      .then (
        () => {
          localStorage.setItem('visited', true)
        }
      )

    }, []) 



    return (
      <>
      <Header user = {user}  yoffset = {yoffset}/>
      <Outlet  /> 
  
      </>
    )
  }



export default Layout; 