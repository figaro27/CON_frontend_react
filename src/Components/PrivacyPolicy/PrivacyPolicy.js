import React from "react";
import {I18n} from 'react-redux-i18n';
import './PrivacyPolicy.css';

class PrivacyPolicy extends React.Component {

    render() {
        return (
            <div class="main-content-section-inner">
                <div class="terms-of-service-wrapper">
                    <div class="main-row row">
                        <div class="main-col">
                            <div class="common-title4">{I18n.t('privacy_policy')}</div>
                        </div>
                    </div>
                    <div class="main-row row">
                        <div class="main-col">
                            <div class="terms-of-service-content-box">
                                <div class="terms-of-service-text common-text1">
                                    <p>
                                        <b>{I18n.t('privacypolicy.text1')}</b><br></br>
                                        {I18n.t('privacypolicy.text2')}<br></br>
                                        {I18n.t('privacypolicy.text3')}<br/>
                                        {I18n.t('privacypolicy.text4')}<br/>
                                        {I18n.t('privacypolicy.text5')}<br/>
                                        {I18n.t('privacypolicy.text6')}<br/>
                                        {I18n.t('privacypolicy.text7')}<br/>
                                        {I18n.t('privacypolicy.text8')}<br/>
									</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PrivacyPolicy;
