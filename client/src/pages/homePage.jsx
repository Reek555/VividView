import Images from '../components/images'
import Add from '../components/add'
import axios from 'axios';
import '../styles/homePage.css'
import photography from '../assets/photography.webp'
import UploadModal from '../components/uploadModal'
import { useState, useEffect } from 'react';
import Loader from '../components/loader';

const url = import.meta.env.VITE_BASE_URL // special way to access envirenment variales in vite


function ParaScroll() {
  return (
    <div id = 'para-container'>  
      <img src={photography} alt="" ></img>
      <div>
        <p style = {{fontSize: 25, letterSpacing: 10, margin: 0}} >CAPTURE THE MOMENT</p>
        <p style = {{fontSize: 13, margin: 0}} >Discover other creators photographic art and share yours.</p>
      </div>
    </div> 
  )

}


function Home ({user, yoffset, setYoffset}) {

    const[formModalDisplay, setFormModalDisplay] = useState('none');
    const [activeImg, setActiveImg] = useState({likes: [], caption: ''});
    const [photos, setPhotos] = useState();

    useEffect(() => {
      axios.get(url + '/photos/all')
      .then((result) => {
      
      let results = result.data.reverse()

      setPhotos(results); 
      })
  }, [user]) //why user? app > UploadPage > images ... app returns before user/user.id is set, even if we the user is set later useEffect[] only renders at the beginning; 


    return (
        <>
            <Loader visible = {photos}/>
            <ParaScroll/>
            <Images 
              user = {user}
              yoffset = {yoffset}
              setYoffset = {setYoffset}
              setFormModalDisplay = {setFormModalDisplay} 
              activeImg = {activeImg} 
              setActiveImg = {setActiveImg}
              photos = {photos}
              setPhotos = {setPhotos} />
            
            <Add 
              user = {user} 
              setFormModalDisplay = {setFormModalDisplay} 
              setYoffset = {setYoffset}
              yoffset = {yoffset} />
            
            <UploadModal 
              activeImg = {activeImg} 
              setActiveImg = {setActiveImg} 
              formModalDisplay = {formModalDisplay}
              setFormModalDisplay = {setFormModalDisplay} 
              yoffset = {yoffset}
              setPhotos = {setPhotos}/>

        </>
    )

}


export default Home; 