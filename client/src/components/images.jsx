import '../styles/images.css'
import { useState, useEffect, useRef} from 'react'
import pic4 from '../assets/words.jpeg'
import axios from 'axios'


const url = import.meta.env.VITE_BASE_URL // special way to access envirenment variales in vite



export default function Images ({user, filtered = false, yoffset, setYoffset,  setFormModalDisplay,  activeImg, setActiveImg, photos, setPhotos}) {
    const [imgModalDisplay, setImgModalDisplay] = useState('none')



    //sub components

    function ColumnImg ({photo}) {

        const [visible, setVisible] = useState(false)

        function imgClickHandler (photo) {
            setYoffset(window.pageYOffset)
            document.body.classList.add('disable-scroll'); 
            setActiveImg(photo)
            //console.log(activeImg)
            setImgModalDisplay('block')
        }
    
        function deleteHandler (photo) {
            let ok = confirm('are you sure?')
            console.log (ok)
            if (!ok) {
                return;
            }
    
            axios({
                method: 'delete',
                url: url + '/delete',
                data: photo
              })
              .then ( (res) => {
                setPhotos(res.data.photos )
              }
              )
        }
    
        function editClickHandler(photo) {
            setYoffset (window.pageYOffset)
            document.body.classList.add('disable-scroll'); 
            setActiveImg(photo)
            setFormModalDisplay('block'); 
        
        }


        return (
            <div className = 'img-container'  >
                <img 
                    src = {url + '/photos/' + photo.fileName} 
                    onClick={() => imgClickHandler(photo)}
                    style = {{width: '100%'}}
                ></img>

                <div className = 'ellipsis' onClick={() => setVisible(!visible)} style = {{display: user.id == photo.op? 'block': 'none'}} >            
                    <i className="fa fa-ellipsis-v" style = {{fontSize: 28}}></i>
                </div>

                <div className = 'ellipsis-buttons' style = {{display: visible? 'block': 'none'}} >
                    <button onClick={() => editClickHandler(photo)}>Edit</button>
                    <button onClick={() => deleteHandler(photo)} style = {{color: 'red'}}>Delete</button>
                </div>
            </div>
        )
    }

    function modal () {

        function closeHandler () {
            setActiveImg({likes: [], caption: ''})
            setImgModalDisplay('none')
            document.body.classList.remove('disable-scroll'); 
            window.scrollTo(0, yoffset)
    
        }
    
        function likeHandler () {

            //if the user is not logged in
            if (!user.id) {
                location.href = '/login'
            }

            let activeImage = {...activeImg}
    
            if (!activeImage.likes.includes(user.id)) {
    
                activeImage.likes.push(user.id); 
            }
            else {
                activeImage.likes = activeImage.likes.filter(i => i != user.id)
            }
    
            
    
            axios({
                method: 'put',
                url: url + '/like',
                data: activeImage, 
                })
            .then (
                (res) => {
                    //console.log(activeImage)
                    setActiveImg(activeImage)
    
                    //we need to updated photos state var to overwrite the previous array
                    //let updatedPhotos = [...photos]
                    //let indx = updatedPhotos.findIndex(i => i.fileName == activeImage.fileName);
                    //updatedPhotos[indx] = activeImage
                    //setPhotos(updatedPhotos)
    
                }
            )
    
    
        } 
        
        return (
            <div id = 'image-modal' style = {{display: imgModalDisplay}} >
    
                <span onClick = {closeHandler} className="x-close">&times;</span>
    
                <div id = 'modal-img-container'>            
                    <p id = 'caption'>{activeImg.caption}</p>
                    <img src = {url + '/photos/' + activeImg.fileName}></img>
                </div>
                <div id = 'like-container' >
                    <i onClick={likeHandler} className='fa fa-heart' id = 'like-icon' style = {{color: activeImg.likes.includes(user.id)? 'red': '#8b8b8b'}}></i>
                    <span id = 'like-counter'>{activeImg.likes.length}</span>
                </div>            
    
    
            </div>
        )
    
    }



    return (
        photos? 
        <>
        <div id = 'container'>
            <div className='column'>
                {photos
                 .slice(0, photos.length / 2)
                 .map((photo ) => <ColumnImg key = {photo.fileName} photo = {photo}/>)}
            </div>
                
            <div className='column'>
                { photos
                  .slice(photos.length / 2, photos.length)
                  .map ((photo) => <ColumnImg key = {photo.fileName} photo = {photo}/>)}
            </div>
        
        </div>

        {modal()}

        </>
        : null
    )

}





