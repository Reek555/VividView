import { useState } from "react";
import axios from 'axios'
import '../styles/add.css'
import UploadModal from "./uploadModal";

const url = import.meta.env.VITE_BASE_URL // special way to access envirenment variales in vite


export default function Add ({user, yoffset, setYoffset, setFormModalDisplay, setY}) {


     
    function addClickHandler() {
        if (!user.id) {
            return window.location.href = '/login'; 
        }
        setYoffset(window.pageYOffset)
        document.body.classList.add('disable-scroll'); 
        setFormModalDisplay('block')
    } 

    return (
        <>
            <div id = 'btn-container' style = {{display: yoffset > 200? 'inline-block': 'none'}} >
                <button id ='add-btn' onClick={addClickHandler}>+</button>
            </div>
        </>
    )

}


