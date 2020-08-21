import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { hide, success, error } from 'react-notification-system-redux';
import PropTypes from 'prop-types';
import LoadingOverlay from '../Shared/LoadingOverlay';
import './BuySell.css';
import GraphIndex from '../Shared/GraphIndex';
import BNXModal from './BNXModal';
import TopTables from './TopTables';
import AccountBalances from './AccountBalances';
import Utils from '../../Utils'
import { DashboardActions, ProfileActions, CommonActions, MoneyActions } from '../../Actions';
import swal from 'sweetalert';

class BuySell extends React.Component {
	constructor (props, context) {
		super(props, context)

		this.state = {
			toBNX: '',
			from: '',
			toEuro: '',
			sendingRequest: false,
			type: 'BUY',
			bnxType: 'ETH',
			isOpenedModal: true,
			subtotal: 0,
			fee: 0,
			receive: 0
		}
	}

	updateSubTotalAndApprox = (value) => {
		if(typeof value === 'undefined') {
			value = this.state.from
		}
		let subtotal = 0
		let receive = 0
		let fee = 0
		let rate = 1

		if(this.props.type === 'BNX') {
			if(this.props.moneyData) {
				rate = this.props.moneyData.BNX_to_EUR_rate / this.props.moneyData[`${this.state.bnxType}_to_EUR_rate`]
				if(this.state.bnxType === 'BTC') {
					rate = 1 / rate
				}
			}
		}else {
			if(this.props.moneyData) {
				rate = this.props.moneyData[`${this.props.type}_to_EUR_rate`]
			}
		}

		if(this.state.type === 'BUY') {
			subtotal = value * 0.99
			receive = subtotal / rate

			if(this.props.type === 'BNX' && this.state.bnxType === 'ETH') {
				receive /= 10
			}
		}else {
			subtotal = value * rate
			if(this.props.type === 'BNX' && this.state.bnxType === 'ETH') {
				subtotal *= 10
			}

			fee = subtotal * 0.01
			receive = subtotal - fee
		}

		this.setState({
			from: value,
			subtotal: subtotal,
			fee: fee,
			receive: receive
		})

		setTimeout(this.updateSubTotalAndApprox, 1500);
	}

	handleChange = (event) => {
		let value = event.target.value

		this.updateSubTotalAndApprox(value)
	}

	selectTab = (tabName) => {
		this.setState({
			type: tabName
		})
		this.setEmptyValues()
	}

	componentDidMount = () => {
		this.props.getChartData("BNX");
		this.props.getChartData("ETH");
		this.props.getChartData("BTC");
		this.props.getChartData("LTC");
		this.props.getChartData("BCH");
		this.props.getChartData("XRP");

		this.props.getMoneyBackend({cb:null})
		this.getTopList(this.props)
		this.updateSubTotalAndApprox(this.state.from)
	}

	sendNotificationEmail = (type, amount) => {
		this.props.sendNotificationEmail({
			data: {
				lang: (localStorage.getItem('lang') === 'en') ? 0 : 1,
				type: type.toLowerCase(),
				amount: amount
			}
		})
	}

	showErrorMessage = (code) => {
		this.context.store.dispatch(hide(`notification${code}`));
		this.setState({
			sendingRequest: false
		})
		this.context.store.dispatch(error({
				uid: `notification${code}`,
				title: I18n.t(`notifications.title${code}`, {'from': this.state.from}),
				message: I18n.t(`notifications.message${code}`, {'amount': this.state.from}),
				position: 'tr',
				autoDismiss: 7,
				action: { label: I18n.t(`notifications.button${code}`) }
			}));

		this.showSwalOverlay("error")
	}

	handleBuy = () => {
		let _this = this
		if(this.props.type === 'BNX' && this.state.isOpenedModal === true) {
			return false
		}

		Utils.openPageLoadingNotification()

		this.setState({
			sendingRequest: true
		})

		this.context.store.dispatch(hide('notification6'));
		this.context.store.dispatch(hide('notification7'));
		this.context.store.dispatch(hide('notification8'));
		this.context.store.dispatch(hide('notification9'));
		this.context.store.dispatch(hide('notification10'));

		let type = this.state.type
		this.props.getProfileInfo({
			cb: (res) => {
				if(_this.props.profileError) {
					// get profile error
					_this.setState({
						sendingRequest: false
					})
				}else {
					if(res.pid && res.name && res.date_of_birth && res.address && res.postal_code && res.email && res.phone_number) {
						this.props.buyMoney({
							data: {
								coinType: _this.props.type,
								bnxType: _this.state.bnxType,
								type: type,
								from: _this.state.from
							},
							cb: (res) => {
								if(type === 'BUY') {
									if(_this.props.error === null) {
										if(res.signal === 200) {
											let buysellResult = Object.assign({}, res)
											_this.sendNotificationEmail(type, _this.state.from) // this amount should be replaced to result BNX later
											_this.setState({
												sendingRequest: false,
												from: ''
											})													

											let fromUnit = buysellResult.cross.substr(0, 3)
											let toUnit = buysellResult.cross.substr(3, 3)
											let fromAmount = Utils.cutOff(buysellResult.exchanged, (fromUnit === "eur") ? 2 : 6)
											let toAmount = Utils.cutOff(buysellResult.recieved, (toUnit === "eur") ? 2 : 6)
											_this.context.store.dispatch(success({
												uid: 'notification6',
												title: I18n.t('notifications.title6', {
													'fromAmount': fromAmount, 
													'fromUnit': (_this.props.type === "BNX") ? 'BNX' : 'EUR', 
													'toAmount': toAmount,
													'toUnit': (_this.props.type === "BNX") ? _this.state.bnxType : _this.props.type
												}),
												message: I18n.t('notifications.message6', {
													'amount': fromAmount, 
													'received': toAmount,
													'fromUnit': fromUnit.toUpperCase(),
													'toUnit': toUnit.toUpperCase()
												}),
												position: 'tr',
												autoDismiss: 10,
												action: { label: I18n.t('notifications.button6') }
											}));

											this.showSwalOverlay("success")

											_this.getTopList(_this.props)
											_this.props.getMoneyBackend({
												cb: (res) => {}
											})
										}else if(res.signal === 405 || res.signal === 406 || res.signal === 407) {
											_this.showErrorMessage(res.signal)
										}else {
											_this.setState({
												sendingRequest: false
											})
											_this.context.store.dispatch(error({
												uid: 'notification7',
												title: I18n.t('notifications.title7'),
												message: I18n.t('notifications.message7'),
												position: 'tr',
												autoDismiss: 7,
												action: { label: I18n.t('notifications.button7') }
											}));

											this.showSwalOverlay("error")
										}
									}else {
										_this.setState({
											sendingRequest: false
										})
										_this.context.store.dispatch(error({
											uid: 'notification8',
											title: I18n.t('notifications.title8'),
											message: I18n.t('notifications.message8'),
											position: 'tr',
											autoDismiss: 7,
											action: { label: I18n.t('notifications.button8') }
										}));

										this.showSwalOverlay("error")
									}
								}else {
									if(_this.props.error === null) {
										if(res.signal === 200) {
											let buysellResult = Object.assign({}, res)
											_this.sendNotificationEmail(type, _this.state.from)
											_this.setState({
												sendingRequest: false,
												from: ''
											})

											let fromUnit = buysellResult.cross.substr(0, 3)
											let toUnit = buysellResult.cross.substr(3, 3)
											let fromAmount = Utils.cutOff(buysellResult.exchanged, (fromUnit === "eur") ? 2 : 6)
											_this.context.store.dispatch(success({
												uid: 'notification9',
												title: I18n.t('notifications.title9', {'amount': fromAmount, 'unit': (_this.props.type === "BNX") ? _this.state.bnxType : _this.props.type}),
												message: I18n.t('notifications.message9', {
													'amount': fromAmount, 
													'received': Utils.cutOff(buysellResult.recieved, (toUnit === "eur") ? 2 : 6),
													'fromUnit': fromUnit.toUpperCase(),
													'toUnit': toUnit.toUpperCase()
												}),														
												position: 'tr',
												autoDismiss: 10,
												action: { label: I18n.t('notifications.button9') }
											}));

											this.showSwalOverlay("success")

											_this.getTopList(_this.props)
											_this.props.getMoneyBackend({
												cb: (res) => {}
											})
										}else if(res.signal === 405 || res.signal === 406 || res.signal === 407) {
											_this.showErrorMessage(res.signal)
										}else {
											_this.setState({
												sendingRequest: false
											})
											this.context.store.dispatch(error({
												uid: 'notification10',
												title: I18n.t('notifications.title10'),
												message: I18n.t('notifications.message10'),
												position: 'tr',
												autoDismiss: 7,
												action: { label: I18n.t('notifications.button10') }
											}));

											this.showSwalOverlay("error")
										}
									}else {
										this.setState({
											sendingRequest: false
										})
										this.context.store.dispatch(error({
											uid: 'notification10',
											title: I18n.t('notifications.title10'),
											message: I18n.t('notifications.message10'),
											position: 'tr',
											autoDismiss: 7,
											action: { label: I18n.t('notifications.button10') }
										}));

										this.showSwalOverlay("error")
									}
								}
							}
						})
					}else {
						// Account informaiton all are not field yet.
						_this.setState({
							sendingRequest: false
						})

						_this.context.store.dispatch(error({
							uid: 'notification15',
							title: I18n.t('notifications.title15'),
							message: I18n.t('notifications.message15'),
							position: 'tr',
							autoDismiss: 7,
							action: { label: I18n.t('notifications.button15') }
						}));
					}
				}
			}
		})
	}

	renderChart = (props) => {
		props.getChartData(props.type.toLowerCase())
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.type !== this.props.type) {
			this.renderChart(nextProps)
			this.setEmptyValues()
			this.getTopList(nextProps)
		}
	}

	showSwalOverlay = (type) => {
		swal({
			icon: type,
			className: 'only-icon',
			buttons: false
		});		
		setTimeout(function() {
			swal.close();
		}, 2000);		
	}

	setEmptyValues = () => {
		this.setState({
			from: '',
			subtotal: '',
			fee: 0,
			receive: 0
		})
	}

	getTopList = (props) => {
		if(props.type !== "BNX") {
			this.props.getOrderBook({
				data: {
					type: props.type
				},
				cb: null
			})
		}
	}

	selectBNXOption = (opt) => {
		this.setEmptyValues()
		this.setState({
			bnxType: opt,
			isOpenedModal: false
		},() => {
			this.getTopList(this.props)
		})
	}

	getAvailableAmount = () => {
		let availableAmount = 0
		if(this.props.moneyData) {
			if(this.props.type === "BNX") {
				if(this.state.type === "BUY") {
					availableAmount = this.props.moneyData.BNX_balance
				}else {
					availableAmount = (this.state.bnxType === "ETH") ? this.props.moneyData.ETH_balance : this.props.moneyData.BTC_balance
				}
			}else {
				availableAmount = (this.state.type === "BUY") ? this.props.moneyData.EUR_balance : this.props.moneyData[`${this.props.type}_balance`]
			}
		}

		return Utils.cutOff(availableAmount, (this.state.type === "SELL" || this.props.type === "BNX") ? 6 : 2)
	}

	render() {
		let buysellType = (this.props.type === "BNX") ? this.state.bnxType : this.props.type
		let bnx_eur = (this.props.type === "BNX") ? "BNX" : "EUR"
		let inputUnit = (this.state.type === "BUY") ? bnx_eur : buysellType
		let outputUnit = (this.state.type === "BUY") ? buysellType : bnx_eur
		let dirPrefix = (this.props.type === "BNX") ? `bnxto${this.state.bnxType.toLowerCase()}` : `eur${this.props.type.toLowerCase()}`
		let iconPrefix = (this.props.type === "BNX") ? `${this.state.bnxType.toLowerCase()}tobnx` : `${this.props.type.toLowerCase()}eur`

		return (
			<div className="main-content-section-inner" id="buysell-page">
				<LoadingOverlay
					show={this.state.sendingRequest}
					message={I18n.t('please_wait')}
				/>
				{ (this.props.type === 'BNX' && this.state.isOpenedModal === true) ? <BNXModal selectType={this.selectBNXOption} data={this.props.moneyData}></BNXModal>: null }
				<div className="buy-sell-wrapper">
					<div className="main-row row">
						<div className="col-lg-7 col-md-12">
							<div className="buy-sell-chart-box1">
								<div className="buy-sell-chart-box1-header">
									<h2 className="common-title3 uppercase text-align-center">
									{
										(this.props.type === 'BNX') ? `${this.state.bnxType} / BNX` : `${this.props.type} / EUR`
									}
									</h2>
								</div>
								<div className="buy-sell-chart-box1-chart">
									<GraphIndex type={this.props.type} />
								</div>
							</div>

							<AccountBalances data={this.props.moneyData}></AccountBalances>
						</div>

						<div className="col-lg-5 col-md-12">
							<div className="tabs-link">
								<div className={`tab ${(this.state.type === 'BUY' ? 'active' : '')}`} onClick={()=>this.selectTab('BUY')}>
									<img src={`/assets/img/iconpack/${dirPrefix}/${dirPrefix}${(this.state.type === 'BUY' ? 'white' : 'gold')}.png`} alt=""/>
									<span>Buy {buysellType}</span>
								</div>
								<div className={`tab ${(this.state.type === 'SELL' ? 'active' : '')}`} onClick={()=>this.selectTab('SELL')}>
									<img src={`/assets/img/iconpack/${dirPrefix}/${iconPrefix}${(this.state.type === 'SELL' ? 'white' : 'gold')}.png`} alt=""/>
									<span>Sell {buysellType}</span>
								</div>
								<div className="or">OR</div>
							</div>
							<div className="tab-content">
								<div className="available">
									Available: <span className="value">{this.getAvailableAmount()} {inputUnit}</span>
								</div>
								<div className="operation">
									<div className="wrapper">
										<label>
											I Want To {(this.state.type === "BUY") ? 'Spend:' : 'Sell:'}
											<div className="placeholder">{inputUnit}</div>
											<input type="text" maxLength="25" placeholder={(this.state.type === "BUY" && this.props.type !== 'BNX') ? '0.00' : '0.000000'} value={this.state.from} onChange={this.handleChange.bind(this)}/>
										</label>
										<p>
											<span>Subtotal:</span>
											<span className="value">{Utils.cutOff(this.state.subtotal, (this.props.type === 'BNX') ? 6 : 2)} {(this.props.type === 'BNX') ? 'BNX' : 'EUR'}</span>
										</p>
										<p>
											<span>Fee:</span>
											<span className="value">1% {(this.props.type !== 'BNX' && this.state.type === "SELL") ? `≈ ${Utils.cutOff(this.state.fee, 2)} €` : null}</span>
										</p>
										<p>
											<span>Approx {outputUnit} to receive:</span>
											<span className="value">{Utils.cutOff(this.state.receive, (outputUnit === "EUR") ? 2 : 6)} {(outputUnit === "EUR") ? '€' : null}</span>
										</p>
										<button className="btn btn-update" onClick={this.handleBuy}>{this.state.type} {buysellType}</button>
									</div>
								</div>
								{
									(this.props.type !== "BNX") ? <TopTables type={buysellType} data={this.props.bookData}></TopTables> : null
								}
							</div>
						</div>
					</div>

					<div className="main-row row">
						<div className="main-col">
							<div className="buy-sell-down-text">
								<p>
								{I18n.t('buy_sell.text1')}<br/>
								{I18n.t('buy_sell.text2')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

BuySell.contextTypes = {
	store: PropTypes.object,
	router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		moneyData: state.CommonReducer.moneyData,
		payoutResult: state.MoneyReducer.resultData,
		bookData: {
			eth: state.MoneyReducer.bookDataETH,
			btc: state.MoneyReducer.bookDataBTC,
			ltc: state.MoneyReducer.bookDataLTC,
			bch: state.MoneyReducer.bookDataBCH,
			xrp: state.MoneyReducer.bookDataXRP
		},
		chartData: {
			bnx: state.DashboardReducer.chartDataBNX,
			eth: state.DashboardReducer.chartDataETH,
			btc: state.DashboardReducer.chartDataBTC,
			ltc: state.DashboardReducer.chartDataLTC,
			bch: state.DashboardReducer.chartDataBCH,
			xrp: state.DashboardReducer.chartDataXRP
		},
		error: state.MoneyReducer.error,
		commonError: state.CommonReducer.error,
		profileData: state.ProfileReducer.profileData,
		profileError: state.ProfileReducer.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getChartData: (type) => {
			dispatch(DashboardActions.getChartData(type));
		},
		buyMoney: (req) => {
			dispatch(MoneyActions.buyMoney(req.data, req.cb));
		},
		getMoneyBackend: (req) => {
			dispatch(CommonActions.getMoneyBackend(req.cb));
		},
		sendNotificationEmail: (req) => {
			dispatch(CommonActions.sendNotificationEmail(req.data));
		},
		getProfileInfo: (req) => {
			dispatch(ProfileActions.getProfileInfo(req.cb));
		},
		getOrderBook: (req) => {
			dispatch(MoneyActions.getOrderBook(req.data, req.cb));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BuySell);
