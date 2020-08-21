import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { I18n } from 'react-redux-i18n';
import { success, error, hide } from 'react-notification-system-redux';
import { CommonActions, MoneyActions, ProfileActions } from '../../Actions';
import LoadingOverlay from '../Shared/LoadingOverlay';
import Utils from '../../Utils'
import './payout.css'

class payout extends React.Component {
	constructor (props, context) {
		super(props, context)

		this.state = {
			regNum: '',
			accountNum: '',
			sendingRequest: false
		}
	}

	handleChange(type, event) {
		let state = this.state;
		state[type] = event.target.value;

		if(state[type].length <= event.target.maxLength) {
			this.setState(state)
		}
	}

	onPayNow = (event) => {
		event.preventDefault();
		Utils.openPageLoadingNotification();
		this.setState({
			sendingRequest: true
		})

		this.context.store.dispatch(hide('notification11'));
		this.context.store.dispatch(hide('notification12'));

		if(this.props.profileData) {
			this.handlePay(this.props.profileData)
		}else {
			this.props.getProfileInfo({
				cb: (res) => {
					if(this.props.error === null) {
						this.handlePay(res)
					}else {
						this.setState({
							sendingRequest: false
						})
					}
				}
			})
		}
	}

	handlePay = (res) => {
		let _this = this;
		let amount = 0
		let moneyData = _this.props.moneyData
		if(moneyData) {
			amount = parseFloat(moneyData.EUR_BNX_balance) + parseFloat(moneyData.EUR_ETH_balance)
		}

		let message = `- Reg nummer: ${this.state.regNum}\n - Konto nummer: ${this.state.accountNum}\n - Konto balance: € ${Utils.cutOff(amount, 2)}\n`;
		this.props.sendEmail({
			data: {
				"subject": "Udbetaling",
				"name": res.name,
				"email": (res.email) ? res.email : "noreply@blockchainnordic.dk",
				"phone": (res.phone_number) ? res.phone_number : "",
				"message": message
			},
			cb: () => {
				if(this.props.error === null) {
					this.props.payout({
						data: {
							amount: amount
						},
						cb: (res) => {
							_this.setState({
								sendingRequest: false
							});
							if(res.status === "error") {
								this.context.store.dispatch(success({
									uid: 'notification11',
									title: I18n.t('notifications.title11', {amount: amount}),
									message: I18n.t('notifications.message11'),
									position: 'tr',
									autoDismiss: 7,
									action: {
										label: I18n.t('notifications.button11'),
										callback: () => {
											this.context.router.history.push('/');
										}
									}
								}));  
							}else {
								this.props.getMoneyBackend({
									cb: (res) => {
										this.context.store.dispatch(error({
											uid: 'notification12',
											title: I18n.t('notifications.title12'),
											message: I18n.t('notifications.message12'),
											position: 'tr',
											autoDismiss: 7,
											action: { label: I18n.t('notifications.button12') }
										}));       

										this.props.sendNotificationEmail({
											data: {
												lang: (localStorage.getItem('lang') === 'en') ? 0 : 1,
												type: 'withdrawal',
												reg: this.state.regNum,
												amount: amount,
												transaction_data: '1234567890',
												requested: '321654987',
												fee: '0.00',
												sent: '0.00'
											}
										})
									}
								})
							}
						}
					});
				}else {
					_this.setState({
						sendingRequest: false
					})
				}
			}
		});        
	}

	render() {
		return (
			<div className="main-content-section-inner">
				<LoadingOverlay
					show={this.state.sendingRequest}
					message={I18n.t('please_wait')}
				/>
				<div  className="login-verify-wrapper">
					<div  className="login-verify-block">
						<div  className="login-panel verify-panel">
							<h2>{I18n.t('pay_out.text1')}</h2>
							<form onSubmit={this.onPayNow}>
								<span> <center><b>{I18n.t('note')}:</b> {I18n.t('pay_out.text2')} {I18n.t('pay_out.text3')}<br></br></center></span>
								<br></br>
								<div  className="form-group">
									<input type="number" maxLength="4" className="form-control input-control" placeholder={I18n.t('reg_nummer')} value={this.state.regNum} onChange={this.handleChange.bind(this, 'regNum')} required/>
								</div>
								<div  className="form-group">
									<input type="number" maxLength="10" className="form-control input-control" placeholder={I18n.t('konto_nummer')} value={this.state.accountNum} onChange={this.handleChange.bind(this, 'accountNum')} required/>
								</div>
								<div  className="form-group terms-block">
									<div  className="chek-box">
										<label>
									<input type="checkbox" className="form-check-input" value="" /><span>{I18n.t('pay_out.text4')} <Link to='/termsservice' >{I18n.t('terms_service').toLowerCase()}</Link> {I18n.t('and')} <Link to='/privacypolicy'>{I18n.t('privacy_policy').toLowerCase()}.</Link></span>
										</label>
									</div>
								</div>
								<div  className="form-group btn-col">
									<button className="btn btn-verify">{I18n.t('pay_now')}</button>
								</div>
							</form>
							<div  className="text-block" fontWeight="bold">
								<center>{I18n.t('pay_out.text5')}<br></br></center>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

payout.contextTypes = {
	store: PropTypes.object,
	router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		moneyData: state.CommonReducer.moneyData,
		error: state.CommonReducer.error,
		payoutResult: state.MoneyReducer.resultData,
		profileData: state.ProfileReducer.profileData,
		payoutError: state.MoneyReducer.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		payout: (req) => {
			dispatch(MoneyActions.payout(req.data, req.cb));
		},
		getProfileInfo: (req) => {
			dispatch(ProfileActions.getProfileInfo(req.cb));
		},
        getMoneyBackend: (req) => {
            dispatch(CommonActions.getMoneyBackend(req.cb));
        },		
		sendEmail: (req) => {
			dispatch(CommonActions.sendEmail(req.data, req.cb))
		},        
		sendNotificationEmail: (req) => {
			dispatch(CommonActions.sendNotificationEmail(req.data));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(payout);
