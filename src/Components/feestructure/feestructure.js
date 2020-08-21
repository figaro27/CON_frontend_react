import React from "react";
import {I18n} from 'react-redux-i18n';
import './feestructure.css';

class TermsService extends React.Component {

    render() {
        return (
            <div class="main-content-section-inner">
                <div class="terms-of-service-wrapper">
                    <div class="main-row row">
                        <div class="main-col">
                            <div class="common-title4">{I18n.t('fee_structure')}</div>
                        </div>
                    </div>
                    <div class="main-row row">
                        <div class="main-col">
                            <div class="terms-of-service-content-box">
                                <div class="terms-of-service-text common-text1">
                                    <p>
                                        <b>{I18n.t('feestructure.text1')}
                                            <li>{I18n.t('feestructure.text2')}: 6.5%</li>
                                            <li>{I18n.t('feestructure.text3')}: 1%</li>
                                            <li>{I18n.t('feestructure.text4')}: 20%</li>
                                        </b>
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

export default TermsService;
