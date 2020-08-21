import React from 'react'
import LoginIcon from './img/Logo1.svg'
import ThankYouIcon from './img/thank-icon.png';



class ThankYouPage extends React.Component
{
    render()
    {
        return(
            <section  className="main-login-sec">
            <div className="login-main-wrapper">
                <div className="login-block">
                    <div className="logo-login">
                        <img alt="logo" src={LoginIcon}/>
                    </div>
                    <div className="login-panel">
                        <h2 className="login-title">Tak for din tilmelding</h2>
                        <div className="thanku-img">
                            <img alt="" src={ThankYouIcon}/>
                        </div>
                        <div className="verify-block">
                            <p>Vi har sendt en verifikations-email til<br/> <a href="">example@email.com</a><br/>Klik på linket for at bekræfte din Email</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}

export default ThankYouPage;
