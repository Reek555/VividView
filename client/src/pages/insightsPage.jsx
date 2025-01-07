import axios from 'axios';
import { useState, useEffect } from 'react';

const url = import.meta.env.VITE_BASE_URL // special way to access envirenment variales in vite


export default function InsightsPage () {
    const [doc, setDoc] = useState({})

    useEffect(() => {
        axios.get(`${url}/insights`)
        .then (
            (res) => setDoc(res.data)
        )
        .catch (
            (e) => {
                location.replace('/nopage')
            } 
        )
    }, [])


    return <p style = {{marginTop: 148, textAlign: "center"}}>Total visits = {doc["total-visits"]} </p>

    

}