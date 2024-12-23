import Images from "../components/images"
import UploadModal from "../components/uploadModal";
import { useState, useEffect, useRef} from 'react'
import axios from 'axios';

const url = import.meta.env.VITE_BASE_URL // special way to access envirenment variales in vite


export default function UploadsPage ({user, yoffset, setYoffset}) {


    const[formModalDisplay, setFormModalDisplay] = useState('none');
    const [activeImg, setActiveImg] = useState({likes: [], caption: ''});
    const [photos, setPhotos] = useState();

    useEffect(() => {
      axios.get(url + '/photos/all')
      .then((result) => {
      
      let results = result.data.reverse()
      results = results.filter(i => i.op == user.id) 
      if (Object.keys(results).length == 0 ){
        return setPhotos()
      }
      setPhotos(results); 
      })
  }, [user]) //why user? app > UploadPage > images ... app returns before user/user.id is set, even if we the user is set later useEffect[] only renders at the beginning; 


    return (

        photos? 
        <div  style = {{marginTop: 50, minWidth: 600} }>
            <Images 
              user = {user}
              yoffset = {yoffset}
              setYoffset = {setYoffset}
              setFormModalDisplay = {setFormModalDisplay} 
              activeImg = {activeImg} 
              setActiveImg = {setActiveImg}
              photos = {photos} />
            
            <UploadModal 
              activeImg = {activeImg} 
              setActiveImg = {setActiveImg} 
              formModalDisplay = {formModalDisplay}
              setFormModalDisplay = {setFormModalDisplay} 
              yoffset = {yoffset}
              setPhotos = {setPhotos}/>

        </div>
        :
        <div style = {{textAlign: 'center', marginTop: 299}} >
          Nothing to show!
        </div>
    )

        

}