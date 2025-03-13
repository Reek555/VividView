import '../styles/form.css'
import axios from 'axios';
import { useState } from 'react'
import Loader from '../components/loader';





const url = import.meta.env.VITE_BASE_URL // special way to access envirenment variales in vite



export default function Form () {
    const [password, setPassword] = useState('')
    const [loaderDisplay, setLoaderDis] = useState('none')


    const register = window.location.pathname == '/register'; 


    function submitHandler (e) {

      e.preventDefault()
      setLoaderDis('block')

      let data = {}

      let elems = document.getElementsByClassName('field'); 

      for (let elem of elems) {
        let k = elem.name; 
        let v = elem.value; 

        data[k] = v;
      }


      axios({
        method: 'post',
        url: url + (register? '/register': '/login'),
        data: data
      })
      .then (
        res => {
          localStorage.setItem('token', res.data.token);
          location.replace('/');
        }
      )
      .catch((err) => {
        setLoaderDis('none')
        if (!register) {   //in case the user enters wrong email or address
          alert(err.response.data)
        }
      })

    }



    return (
        <>
        <Loader top = {'279px'} visibility={loaderDisplay} />
        <div id = 'form-container'>
        <form id = 'sign-form' onSubmit={ (e) => submitHandler(e)}>
            <h1>{register? 'Register': 'Login'}</h1>
            <p>{register? 'Please fill in this form to create an account.':
             'please fill in this form to login in into your account.'}</p>
            <hr></hr>


            {register?
            <>
            <label htmlFor="name"><b>Name</b></label>
            <input type="text" placeholder="Enter Name" name="name" className='field' pattern = '[^\s]{4,}' title = '4 charachters at least, no white space!' required/>
            </>
            : null}

            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" className='field'
                   pattern = '^[^\s@]+@[^\s@]+\.[^\s@]+$' 
                   title = 'invalid email!' required/>

            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" 
                   className='field'
                   placeholder="Enter Password" 
                   name="password"  
                   pattern = '.{6,}' title = 'at least 6 charachters!' 
                   value = {password} 
                   onChange={(e) => setPassword(e.target.value)} required/>

            {register?
            <>
            <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
            <input type="password" placeholder="Repeat Password" name="psw-repeat" 
                   pattern = {password} title = "passwords don't match!" required/>
            </>
            :null}


            <hr></hr>
            
            <button type="submit" className="registerbtn" >{register? 'Register': 'Login'}</button>
            

            <div className="below-form">
              {register?
              <p>Already have an account? <a href="/login">Sign in</a>.</p>
              :
              <p>You don't have and account? <a href="/register">Sign up</a>.</p>
              }
            </div>

      </form>
      </div>
      </>

    )

}


