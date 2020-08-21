import React from 'react'
import LoginIcon from '../Login/img/Logo1.svg'
import './Logout.css'

class Logout extends React.Component
{
    render()
    {
        return(
            <section className="main-login-sec">
            <div className="login-main-wrapper">
                <div className="login-block">
                    <div className="logo-login">
                        <img alt="icon" src={LoginIcon}/>
                    </div>
                    <div className="login-panel">
                        <h2 className="login-title">Du er blevet logget ud</h2>
                        <div className="verify-block">
                            <p>Vi håber du kommer snart tilbage.</p>
                            <a href="/login-nemid/"  className="links"> Gå tilbage til login</a>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        )
    }
}

export default Logout;
