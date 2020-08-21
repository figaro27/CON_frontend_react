import React from 'react'
import LoginIcon from '../Login/img/Logo1.svg'
import './_timeout.css'

class Timeout extends React.Component
{
    render()
    {
        return(
            <section className="main-login-sec session-timeout">
                <div className="login-main-wrapper">
                    <div className="login-block">
                        <div className="logo-login">
                            <img alt="icon" src={LoginIcon}/>
                        </div>
                        <div className="login-panel">
                            <h2 className="login-title">You were logged out from <br/>BLOCKCHAINNORDIC</h2>
                            <div className="verify-block">
                                <p>Log back in <a href="/login-nemid/"  className="links"> here</a></p>                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Timeout;
