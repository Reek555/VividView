import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Layout from './pages/layout';
import HomePage from './pages/homePage';
import RegisterPage from './pages/registerPage'
import NoPage from './pages/noPage';
import UploadsPage from './pages/uploadsPage';
import ContactPage from './pages/contactPage';
import InsightsPage from './pages/insightsPage';
import AboutPage from './pages/aboutPage';
import axios from 'axios';



const url = import.meta.env.VITE_BASE_URL // special way to access envirenment variales in vite

//config defaults that will be applied to every request.
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');




function App() {
  const [user, setUser] = useState({})
  const [yoffset, setYoffset] = useState(0)


  useEffect(() => {

    
    axios.get(`${url}/profile`)
    .then(
      (res) => {
        setUser(res.data)
      }
      )
    .catch(
      (err) => {}
    ) 



  }, [])

  document.addEventListener('scroll', (e) => {

      setYoffset(window.pageYOffset)
    
  })  


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user = {user} yoffset = {yoffset}/>}>
          <Route index element={<HomePage user = {user} yoffset = {yoffset} setYoffset = {setYoffset}/>} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<RegisterPage />} />
          <Route path='/uploads' element={user.id? <UploadsPage user = {user} yoffset = {yoffset} setYoffset = {setYoffset}/>: <NoPage/>} />
          <Route path = '/contact' element = {<ContactPage />}/>
          <Route path = '/insights' element = {<InsightsPage />}/>
          <Route path = '/about' element = {<AboutPage />}/>



          <Route path='*' element={<NoPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}





export default App
