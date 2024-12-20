import { Outlet, Link, useLinkClickHandler } from "react-router-dom";

import { useEffect, useState } from "react";
import Header from "../components/header";


const l = {
  'about': 'about page',
  'log in': 'log in page', 
  'sign up': 'sing up page'}


function Layout ({user, yoffset}) {



    return (
      <>
      <Header user = {user}  yoffset = {yoffset}/>
      <Outlet  /> 
  
      </>
    )
  }



export default Layout; 