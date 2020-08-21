import React, {Component} from "react";
import Slider from 'react-rangeslider'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';
import { error, hide } from 'react-notification-system-redux';
import { MoneyActions } from '../../Actions';
import Utils from '../../Utils'
import 'react-rangeslider/lib/index.css'
import './Invest.css'
import Visa from './img/visa.svg'

const DIGITAL_TYPES = [
	{
		unit: "ETH",
		label: "ETHEREUM"
	}, 
	{
		unit: "LTC",
		label: "LITECOIN"
	},
	{
		unit: "BTC",
		label: "BITCOIN"
	},
		{
		unit: "BCH",
		label: "BITCOIN CASH"
	},
		{
		unit: "XRP",
		label: "RIPPLE"
	}
]
class Invest extends Component
{
	constructor (props, context) {
		super(props, context)

		this.state = {
			price: 500,
			priceBNX : 0,
			type: 1,
			subType: 2
		}
	}

	handleBuy = () => {
		Utils.openPageLoadingNotification();
		this.context.store.dispatch(hide('notification5'));
		localStorage.removeItem('started_deposit')

		this.props.quickPayment({
			data: {
				type: (this.state.type === 1) ? 'bnx' : DIGITAL_TYPES[this.state.subType].unit.toLowerCase(),
				amount: this.state.price
			},
			cb: (res) => {
				if(this.props.payoutError === null) {
					// this.context.router.history.push('/progress');
					window.location.href = res
					localStorage.setItem('started_deposit', 1)
					localStorage.getItem('deposit_amount', this.calculateBNX().toFixed(2))
				}else {
					this.context.store.dispatch(error({
						uid: 'notification5',
						title: I18n.t('notifications.title5'),
						message: I18n.t('notifications.message5'),
						position: 'tr',
						autoDismiss: 7,
						action: { label: I18n.t('notifications.button5') }
					}));
				}
			}
		})
	}

	handleChange = price => {
		this.setState({
			price: price
		})
	}

	componentDidMount(){
	}

	formatTooltip = price => {
		return Utils.cutOff(price, 2)
	}

	onCopy = (index) => {
		let obj = document.getElementById("copy-val");
		obj.select();
		document.execCommand('copy');
		window.getSelection().removeAllRanges();
	}

	calculateBNX = () => {
		let priceBNX = 0
		let res = this.props.moneyData

		if(this.state.type === 1) {
			if(res && res.BNX_to_EUR_rate !== 0) {
				priceBNX = this.state.price  / res.BNX_to_EUR_rate
			}
		}else  {
			let idx = `${DIGITAL_TYPES[this.state.subType].unit}_to_EUR_rate`
			if(res && res[idx] !== 0) {	
				priceBNX = this.state.price / res[idx]
			}
		}

		return priceBNX;
	}

	selectTab = (type) => {
		this.setState({
			type: type
		})

		if(type === 1) {
			this.setState({
				subType: 2
			})
		}		
	}

	selectSubTab = (type) => {
		this.setState({
			subType: type
		})
	}	

	render() {
		const { price } = this.state
		let _this = this
		let rows = []
		let dirPrefix = `eur${DIGITAL_TYPES[this.state.subType].unit.toLowerCase()}`

		DIGITAL_TYPES.forEach(function(entry, index) {
			rows.push(
				<div key={`digital-type-${index}`} className={`digital-tab-item ${(index === 4) ? 'last' : ''} ${(_this.state.subType === index) ? 'active' : ''}`} onClick={()=> _this.selectSubTab(index)}>{entry.unit}</div>
			)
		});

		return (
			<div className="invest-page">
				<div className="wrapper">
					<div className='slider'>
						<div className="tab">
							<div className={`tab-item pull-left ${(this.state.type === 1) ? 'active' : ''}`} onClick={()=> this.selectTab(1)}>
								<div className="item-wrapper">
									<img src="/assets/img/icon/white_logo.svg" alt="" />
								</div>
								<label>BNX INDEX</label>
							</div>
							<div className={`tab-item pull-right ${(this.state.type === 2) ? 'active' : ''}`} onClick={()=> this.selectTab(2)}>
								<div className="item-wrapper">
									<img src={`/assets/img/iconpack/${dirPrefix}/${dirPrefix}white.png`} alt=""/>
								</div>
								<label>Digital Assets</label>
							</div>
							<div className="clearfix"></div>
						</div>
						{	(this.state.type === 2) ?
							<div className="digital-tabs">
								{rows}
								<div className="clearfix"></div>
							</div>
							: null
						}
						<div className="overskiftETH">
							<p>{I18n.t('invest.text1', {unit: (this.state.type === 1) ? 'BNX' : DIGITAL_TYPES[this.state.subType].label})}</p>
						</div>
						<Slider
							min={100}
							max={10000}
							step={50}
							value={+price.toFixed(2)}
							defaultValue={500}
							format={this.formatTooltip}
							onChange={this.handleChange}
						/>
						<center>
							<p>{I18n.t('invest.text6')} : 1.45% ≈ {Utils.cutOff(price * 0.0145, 2)} €</p>
							<p>{I18n.t('invest.text2')} : 7.5% ≈ {Utils.cutOff(price * 0.075, 2)} €</p>
							<p>{I18n.t('invest.text3', {bnx: this.calculateBNX().toFixed(2), price: price, unit: ((this.state.type === 1) ? 'BNX' : DIGITAL_TYPES[this.state.subType].unit)})}</p>
							<p>{I18n.t('invest.text4')}</p>
						</center>
						<button className="btn btn-normal" onClick={this.handleBuy}>{I18n.t('invest.text5')} <b> {price * 0.925} €</b></button>
						<center>
							<img alt="" className="visa" src={Visa}/>
							<img alt="" className="mobilepay" src="https://payment.quickpay.net/assets/v2/images/brands/mobilepay.svg"/>
						</center>
					</div>
				</div>
			</div>

		)
	}
}

Invest.contextTypes = {
	store: PropTypes.object,
	router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		moneyData: state.CommonReducer.moneyData,
		error: state.CommonReducer.error,
		payoutError: state.MoneyReducer.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		quickPayment: (req) => {
			dispatch(MoneyActions.quickPayment(req.data, req.cb));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Invest);
