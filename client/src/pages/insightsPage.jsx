import axios from 'axios';
import { useState, useEffect } from 'react';

const url = import.meta.env.VITE_BASE_URL // special way to access envirenment variales in vite


export default function InsightsPage () {
    const [val, setVal] = useState({})

    useEffect(() => {
        axios.get(`${url}/insights`)
        .then (
            (res) => setVal(res.data)
        )
    }, [])

    return <p style = {{marginTop: 148, textAlign: "center"}}>visits: {val.visits}</p>

}