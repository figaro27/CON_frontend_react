import React from 'react'
import {I18n} from 'react-redux-i18n';
import LoginLogo from './img/Logo1.svg'
import Modal from 'react-responsive-modal'
import './Login.css'

const classNames = {
    'overlay': 'terms-modal'
}

const iframeStyling = {
    height: '500px',
    width: '320px',
};

const loginBlockStyling = {
    'maxWidth': '575px'
};

class LoginNemID extends React.Component
{
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            isChecked: false,
            isFirstPage: true
        }
    }

    hideModal = () => {
        this.setState({
            isOpen: false
        });
    }

    toggleCheckboxChange = () => {
        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    componentDidMount = () => {
        setTimeout(function() {
            this.setState({
                isOpen: true
            });
        }.bind(this), 3000)
    }

    clickHere = () => {
        this.setState({
            isFirstPage: false
        })
    }

    goBack = () => {
        this.setState({
            isFirstPage: true
        })
    }

    render()
    {
        const url = this.props.auth.generateAuthorizeUrl();

        return(
            <section className="main-login-sec">
                <div className="login-main-wrapper">
                    <div className={`login-block ${(this.state.isFirstPage === true) ? '' : 'second'}`} style={loginBlockStyling}>
                        <div className="logo-login">
                            <img alt="" src={LoginLogo}/>
                            {/*<h2 className="splash-login-title">{I18n.t('login.text1')}</h2>*/}
                        </div>
                        <h2 className="login-title">{(localStorage.getItem('first_cookie')) ? I18n.t('login.text1') : I18n.t('login.text18')}</h2>
                        <div className="login-panel">
                            {
                                (this.state.isFirstPage === true) ?
                                <div>
                                    <p className="header">Har du problemer med at logge ind? <span className="click-here" onClick={this.clickHere}>Klik her</span></p>
                                    <iframe id="iframe-wrapper" src={url} style={iframeStyling} className="nemid_iframe" title="nemid" allowFullScreen="true" scrolling="no" frameBorder="0"></iframe>
                                    <div className="forgot-block">
                                        <p>{I18n.t('login.text2')} <a href="https://crm.blockchainnordic.dk" target="_blank" rel="noopener noreferrer" className="links">{I18n.t('FAQ')}</a></p>
                                        <p> <a href="https://blockchainnordic.dk" target="_blank" rel="noopener noreferrer" className="links">{I18n.t('Go back')}</a></p>
                                    </div>
                                </div>
                                :
                                <div className="second-page">
                                    <h2>Problemer med Login</h2>
                                    <h3>Safari på telefon</h3>
                                    <p>
                                        Følgende indstilling skal være deaktiveret<br/>
                                        for at kunne tilgå Safari fra dit IOS device:<br/>
                                        Indstillinger -> Safari ->Undgå sporing ml. websteder
                                    </p>
                                    <h3>Safari på computer</h3>
                                    <p>
                                        Følgende indstilling skal være deaktiveret<br/>
                                        for at kunne tilgå Safari fra dit IOS device:<br/>
                                        Indstillinger -> Privat -> Bloker cookies<br/>
                                        samt:<br/>
                                        Indstillinger -> Privat -> Undgå sporing ml. websteder
                                    </p>
                                    <div className="click-here" onClick={this.goBack}>tilbage til login</div>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <Modal
                    open={this.state.isOpen}
                    onClose={this.hideModal}
                    little
                    classNames={classNames}
                    closeOnEsc={false}
                    showCloseIcon={false}
                    closeOnOverlayClick={false}>

                    <h3>BLOCKCHAIN NORDIC<br/>NEMID LOGIN</h3>
                    <p>
                        <b>{I18n.t('login.text3')}</b><br/>
                        {I18n.t('login.text4')}
                        <br/><br/><b>1.)	{I18n.t('login.text5')}</b><br/>
                        {I18n.t('login.text6')}
                        <br/><br/><b>2.)	{I18n.t('login.text7')}</b><br/>
                        {I18n.t('login.text8')}
                        <br/><br/><b>3.)	{I18n.t('login.text9')}:</b><br/>
                        {I18n.t('login.text10')}<br/>
                        <br/><b>4.)    {I18n.t('login.text12')}</b>
                        <br/>{I18n.t('login.text13')}<br/>
                        <br/>
                    </p>
                    <p className="chek-box">
                        <label>
                        <input type="checkbox" className="form-check-input" checked={this.state.isChecked} onChange={this.toggleCheckboxChange}/><span><b>{I18n.t('login.text15')}</b><b>
                        <a href="https://www.blockchainnordic.dk/page/juridisk-privatlivsdata" target="_blank" rel="noopener noreferrer">{I18n.t('privacy_policy').toLowerCase()}</a> {I18n.t('and')} <a href="https://www.blockchainnordic.dk/page/terms-conditions" target="_blank" rel="noopener noreferrer">{I18n.t('login.text14')}.</a></b></span>
                        <br/><br/><span className="text-center">{I18n.t('login.text16')}<br/></span></label>
                    </p>
                    <button className="btn btn-agree" onClick={this.hideModal} disabled={!this.state.isChecked}>{I18n.t('login.text11')}</button>
                </Modal>
            </section>
        )
    }
}

export default LoginNemID;
