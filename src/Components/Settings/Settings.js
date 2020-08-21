import React from "react";
import './Settings.css';
import CurrencyConstants from "../../Constants/Currency"
// import Utils from '../../Utils';

class Settings extends React.Component {
    constructor(props) {
        super(props);

        let currencyIndex = 1;
        if(localStorage.getItem("currency")) {
            currencyIndex = localStorage.getItem("currency");
        }

        this.state = {
            currency: currencyIndex
        };

        this.onChangeCurrency = this.onChangeCurrency.bind(this)
    }

    onChangeCurrency(e) {
        let val = e.target.value;
        this.setState({
            currency: val
        });

        localStorage.setItem("currency", val);
        // Utils.getTopBar().updateCurrencyValues(val);
    }

    render() {
        let currencies = [];
        CurrencyConstants.forEach((cu, index) => {
            currencies.push(
                <option key={`cu-${index}`} value={index}>{cu.label}</option>
            );
        });

        return (
            <div className="main-content-section-inner">
                <div className="terms-of-service-wrapper">
                    <div className="main-row row">
                        <div className="main-col">
                            <div className="common-title4">Indstillinger</div>
                        </div>
                    </div>
                    <div className="main-row row">
                        <div className="main-col">
                            <div className="terms-of-service-content-box">
                                <div className="terms-of-service-text common-text1">
                                    <h2>Generelle indstilliger</h2>
                                    <br></br>
                                    <b>Standard valuta</b><br></br>
                                    <select className="currency-selector" value={this.state.currency} onChange={this.onChangeCurrency}>
                                        {currencies}
                                    </select><br></br>

                                    <div className="social-btns">
                                        <a className="btn facebook" href=""><i className="fa fa-facebook"></i></a>
                                        <a className="btn twitter" href=""><i className="fa fa-twitter"></i></a>
                                        <a className="btn google" href=""><i className="fa fa-google"></i></a>
                                        <a className="btn dribbble" href=""><i className="fa fa-dribbble"></i></a>
                                        <a className="btn skype" href=""><i className="fa fa-skype"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings;
