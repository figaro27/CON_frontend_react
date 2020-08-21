import React from 'react';
import { Link } from "react-router-dom";
class SmallScreen extends React.Component
{
    changeLang = () => {
        let lang = (localStorage.getItem('lang') === 'en') ? 'da' : 'en'
        localStorage.setItem('lang', lang)
        window.location.reload()
    }
        
    render()
    {
        return(
            <div className="small-screen-header" id="small-screen-header">
            <div className="small-screen-header-inner">
                <div className="small-screen-header-logo">
                    <Link  to='/' ><img src='/assets/img/icon/logo.svg' alt="" /></Link>
                </div>
                <img className="lang-link" src={`/assets/img/${(localStorage.getItem('lang') === 'en') ? 'da' : 'en'}.svg`} alt={(localStorage.getItem('lang') === 'en') ? 'Danish' : 'English'} onClick={this.changeLang}/>
                <button className="c-hamburger c-hamburger--htx mob-menu-click"><span>toggle menu</span></button>
            </div>
        </div>
        )
    }
}
export default SmallScreen;
