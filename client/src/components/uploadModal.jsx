import { useState, useEffect } from 'react'
import '../styles/uploadModal.css'
import axios from 'axios'
import Loader from '../components/loader';

const url = import.meta.env.VITE_BASE_URL // special way to access envirenment variales in vite.


export default function UploadModal ({yoffset, formModalDisplay, setFormModalDisplay, activeImg, setActiveImg, setPhotos}) {


    function closeHandler() {
        setActiveImg({likes: [], caption: ''}) 
        setFormModalDisplay('none')
        document.body.classList.remove('disable-scroll'); 
        //window.scrollTo(0, y)
        window.scrollTo(0, yoffset)
    }

    async function submitHandler() {
        event.preventDefault()


        let form = document.getElementById('upload-form')
        const formData = new FormData(form);


        try {

            const response = await axios({
                method: activeImg.url? 'put': 'post',
                url: url + (activeImg.url? '/edit': '/upload'),
                data: activeImg.url? activeImg: formData, 
                })

            let photos = response.data.photos.reverse()
            setPhotos(photos)

            setFormModalDisplay('none')

            setActiveImg({likes: [], caption: ''}) 

            document.body.classList.remove('disable-scroll'); 
            window.scrollTo(0, yoffset)
            } 
        catch (e) {
            console.error(e);
        } 

    }


    function changeHandler(e) {
        let temp = {...activeImg}
        temp.caption = e.target.value
        setActiveImg(temp)

    }


    return (
        <>
        <div id = 'modal' style = {{display: formModalDisplay}}>
            <div id = 'white-space'>
                <span onClick = {closeHandler}  className = 'x-close x-close-second'>&times;</span>

                <form id = 'upload-form' onSubmit={submitHandler}>

                    <label style = {{fontSize:18}} htmlFor = 'avatar'>select a file: </label>
                    <input style = {{fontSize: 15}} type="file" name = 'avatar' accept = ".png, .jpg, .jpeg" required disabled = {Boolean(activeImg.url)}/>

                    <input value = {activeImg.caption} type="text" name='caption' placeholder="Enter a caption" autoComplete="off" maxLength={80} required  onChange={(e) => changeHandler(e)}/>

                    <button id = 'upload-btn' type = 'submit' >{activeImg.url? 'Edit': 'Upload'}</button>
                </form>
            </div> 
        </div>
        </>
    )


}