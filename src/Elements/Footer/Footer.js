import React from 'react';
import { Link } from "react-router-dom";
import {I18n} from 'react-redux-i18n';

class Footer extends React.Component {
    render() {
        return (
            <footer className="custom-footer">
                <ul className="footer-link">
                    <li>
                        <Link to='/termsservice' className="smooth" >{I18n.t('terms_service')}</Link>
                    </li>
                    <li>
                        <Link to='/privacypolicy' className="smooth" >{I18n.t('privacy_policy')}</Link>
                    </li>
                    <li>
                        <Link to='/feestructure' className="smooth" >{I18n.t('fee_structure')}</Link>
                    </li>
                    <li>
                        <Link to='/contactus' className="smooth" >{I18n.t('contact_us')}</Link>
                    </li>
                    <li>
                        © Blockchain Nordic I {I18n.t('trading_platform')}
            </li>
                </ul>
            </footer>)
    }
}

export default Footer;
