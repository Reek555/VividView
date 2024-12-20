
import { useState } from 'react';
import '../styles/header.css'
import userIcon from '../assets/user.png'


function Header ({user, yoffset}) {

    const [userCard, setUserCard] = useState(false)



    let loggedIn = user.id; 

    function logoutHandler() {
      localStorage.clear()
      window.reload()
    }

    let FirstButton = loggedIn? 

                    {text: 'Uploads', link: '/uploads'}:
                    {text: 'Sign up', link: '/register'}

    let secondButton = loggedIn? 
                    {text: 'Log out ', link: '', handler: logoutHandler}:
                    {text: 'Log in ', link: '/login', handler: null}
    
    let headerTransparent = location.pathname == '/' && yoffset < 235 

    return (

      <header >
        <div id = 'header'  style = {{backgroundColor: headerTransparent? 'transparent': '#f1f1f1'}}>
          <a href = "/" id = 'logo' className='header-links'>VividView</a>
          <nav id = 'nav-items'>
            <a href="/" className='header-links'>Home</a>
            <a href='#' style = {{padding: '0px 28px'}} className='header-links'>GitHub</a>
            <a href='/contact' className='header-links'>Contact</a>
          </nav>
          <div id= 'profile'>          
            <i className="fa fa-user-o" onClick={ () => setUserCard(!userCard)}></i>
          </div>
        </div>

        <div id = 'drop-down' style = {{display: userCard? 'block': 'none'}}>
          <img src={userIcon} alt="" />

          <p style = {{fontWeight: 'bold', margin: "0px 0px 0px"}}>{loggedIn? user.name: 'Guest'}</p>
          <p style = {{color: "darkgray", margin: "0px 0px 25px", fontSize: 13}}>{loggedIn? user.email: ''}</p>
          <a href={FirstButton.link} className='header-links'>{FirstButton.text}</a>
          <a href={secondButton.link} onClick = {secondButton.handler}className='header-links'>{secondButton.text}</a>
        </div>

        


      </header>
    )

}

export default Header;