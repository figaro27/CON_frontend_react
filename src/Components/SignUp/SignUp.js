import React from "react";
import LoginLogo from './img/Logo1.svg'

class SignUp extends React.Component
{

    render()
    {
        return(
            <section   className="main-login-sec">
            <div className="login-main-wrapper">
                <div className="login-block register-block">
                    <div className="logo-login">
                        <img alt="logo" src={LoginLogo}/>
                    </div>
                    <div  className="login-panel">
                        <h2  className="login-title">Opret en konto</h2>
                        <form>
                            <h3 className="msg-title">Du skal logge ind eller tilmelde dig, inden du fortsætter</h3>
                            <div className="form-group">
                                <input type="text"  className="form-control input-login" placeholder="Fulde navn"/>
                                <input type="text"  className="form-control input-login" placeholder="Email"/>
                                <input type="date"  className="form-control input-login" placeholder="Fødselsdag"/>
                            </div>
                            <div className="form-group">
                                <input type="password"  className="form-control input-login" placeholder="Adgangskode"/>
                                <input type="password"  className="form-control input-login" placeholder="Gentag adgangskode"/>
                            </div>
                            <div className="form-group terms-block">
                                <div className="chek-box">
                                    <label>
                                        <input type="checkbox"  className="form-check-input" value=""/><span >Jeg har læst og accepterer vilkårene <a href="/page/terms-and-conditions">T&S</a>, samt <a href="/page/juridisk-og-privatlivsdata">privatlivsdata.</a></span>

                                    </label>
                                </div>
                            </div>
                            <div className="form-group btn-col">
                                <button className="btn btn-submit">Log ind</button>
                            </div>
                        </form>
                        <div className="forgot-block">
                        <p>Mangler du en konto? <a href="" className="links"> Opret en konto</a></p>
                        <p>Glemt din adgangskode? <a href="" className="links">Nulstil din adgangskode</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
    }

}
export default SignUp;
