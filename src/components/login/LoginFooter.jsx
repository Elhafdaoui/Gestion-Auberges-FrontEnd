import React from 'react';
import "./LoginFooter.css"
import { Link } from 'react-router-dom';
const LoginFooter = () => {
    
    return (
        <>

            <footer>
        <div className='waves'>
            <div className='wave' id="wave1"></div>
            <div className='wave' id="wave2"></div>
            <div className='wave' id="wave3"></div>
            <div className='wave' id="wave4"></div>
        </div>

            <ul className='social_icon'>
               <li><Link to="#"><ion-icon name="logo-facebook"></ion-icon></Link></li>
               <li><Link to="#"><ion-icon name="logo-instagram"></ion-icon></Link></li>
               <li><Link to="#"><ion-icon name="logo-twitter"></ion-icon></Link></li>
               <li><Link to="#"><ion-icon name="logo-twitch"></ion-icon></Link></li> 
                <li><a href="https://www.linkedin.com/in/zakaria-el-hafdaoui-4b6469165/"><ion-icon name="logo-linkedin"></ion-icon></a></li> 
            </ul>

            <ul className='menu'>
                <li><Link to="signup">Inscription</Link></li>
                <li><Link to="#">Authentification</Link></li>
                <li><Link to="dashboard">Authentifiez-vous pour accéder au Dashboard</Link></li>
            </ul>

            <p>Tous droits réservés - Gestion Auberge &#169;{new Date().getFullYear()}  </p>
            </footer>

        
        </>
    );
};

export default LoginFooter;