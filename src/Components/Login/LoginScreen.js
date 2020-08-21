import React from 'react'
import LoginLogo from './img/Logo1.svg'

class LoginScreen extends React.Component
{
    render()
    {
        return(
            <section   className="main-login-sec">
            <div  className="login-main-wrapper">
                <div  className="login-block">
                    <div  className="logo-login">
                            <img alt="logo" src={LoginLogo}/>
                    </div>
                    <div  className="login-panel">
                        <h2  className="login-title">Velkommen til trading platformen</h2>
                        <form>
                            <h3  className="msg-title">Du skal logge ind eller tilmeld dig, inden du fortsætter</h3>
                            <div  className="form-group">
                                <input type="text"  className="form-control input-control" placeholder="Email"/>
                            </div>
                            <div  className="form-group">
                                <input type="password"  className="form-control input-control" placeholder="Adgangskode"/>
                            </div>
                            <div  className="form-group btn-col">
                                <button  className="btn btn-submit">Log ind</button>
                            </div>
                        </form>
                        <div  className="forgot-block">
                            <p>Har du allerede en konto? <a href=""  className="links"> Opret en konto</a></p>
                            <p>Glemt din adgangskode? <a href=""  className="links">Reset din adgangskode</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}

export default LoginScreen;
