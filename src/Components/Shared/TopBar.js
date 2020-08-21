import React, {Component} from "react";
import {connect} from 'react-redux';
import CurrencyConstants from "../../Constants/Currency"
import {CommonActions} from '../../Actions';
import {I18n} from 'react-redux-i18n';
import { Tooltip } from 'reactstrap';
import Utils from '../../Utils';

let currencyIndex = 1;
class TopBar extends Component
{
	constructor(props) {
		super(props);

		if(localStorage.getItem("currency")) {
			currencyIndex = localStorage.getItem("currency");
		}

		this.state = {
			currency: CurrencyConstants[currencyIndex],
			tooltipOpen1: false,
			tooltipOpen2: false,
			tooltipOpen3: false,
			tooltipOpen4: false,
			tooltipOpen6: false,
			tooltipOpen7: false,
			tooltipOpen8: false,
			tooltipOpen9: false,
			tooltipOpen10: false,
			tooltipOpen11: false,
			tooltipOpen12: false,
			isDesktop: true
		};
	}

	componentWillMount() {
		this.updateMoneyData()
		setInterval(this.updateMoneyData, 20000)
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	}

	handleResize = () => {
		this.setState({
			isDesktop: (window.innerWidth >= 768) ? true: false
		})
	}	

	updateMoneyData = () => {
		this.props.getMoneyBackend({
			cb: (res)=> {
				if(res.status === 401 && res.error === "Unauthorized") {
					this.props.auth.logout();
					window.location.href = '/login-nemid'
				}
			}
		});
	}

	changeLang = () => {
		let lang = (localStorage.getItem('lang') === 'en') ? 'da' : 'en'
		localStorage.setItem('lang', lang)
	   	let currentPath = window.location.href.slice(0, window.location.href.length-2)
        window.location.href = currentPath + lang
	}

	toggle = (num) => {
		let idx = `tooltipOpen${num}`
		let state = this.state
		state[idx] = !state[idx]
		this.setState(state);
	}

	render() {
		if(this.props.moneyData) {

		}

		let ETH_balance = (this.props.moneyData) ? this.props.moneyData.ETH_balance : 0
		let BTC_balance = (this.props.moneyData) ? this.props.moneyData.BTC_balance : 0
		let EUR_profit = (this.props.moneyData) ? this.props.moneyData.EUR_profit : 0
		let returnValue = (this.props.moneyData) ? this.props.moneyData.return : 0
		let BNX_to_EUR_rate = (this.props.moneyData) ? this.props.moneyData.BNX_to_EUR_rate : 0
		let TOTAL_balance = (this.props.moneyData) ? this.props.moneyData.total_EUR_balance : 0
		let EUR_balance = (this.props.moneyData) ? this.props.moneyData.EUR_balance : 0
		let BCH_balance = (this.props.moneyData) ? this.props.moneyData.BCH_balance : 0
		let LTC_balance = (this.props.moneyData) ? this.props.moneyData.LTC_balance : 0
		let XRP_balance = (this.props.moneyData) ? this.props.moneyData.XRP_balance : 0
		let BNX_balance = (this.props.moneyData) ? this.props.moneyData.BNX_balance : 0

		let secondRow = [];
		secondRow.push(
			<div key="top-bar-table-cell1" className="top-bar-table-cell">
				<span className="top-bar-title">EUR {I18n.t('balance')}</span>
				<div className="top-bar-value"><span id="EUR_balance">€ {Utils.cutOff(EUR_balance, 2)}</span></div>
				<Tooltip placement="bottom" isOpen={this.state.tooltipOpen7} autohide={false} target="EUR_balance" toggle={()=>this.toggle(7)}>
					{I18n.t('tooltip.EUR_balance')}
				</Tooltip>					
			</div>
		);
		secondRow.push(
			<div key="top-bar-table-cell2" className="top-bar-table-cell">
				<span className="top-bar-title">BNX {I18n.t('balance')}</span>
				<div className="top-bar-value"><span id="BNX_balance">{Utils.cutOff(BNX_balance, 6)}</span></div>
				<Tooltip placement="bottom" isOpen={this.state.tooltipOpen6} autohide={false} target="BNX_balance" toggle={()=>this.toggle(6)}>
					{I18n.t('tooltip.BNX_balance')}
				</Tooltip>	
			</div>		
		);
		secondRow.push(
			<div key="top-bar-table-cell3" className="top-bar-table-cell">
				<span className="top-bar-title">BTC {I18n.t('balance')}</span>
				<div className="top-bar-value"><span id="BTC_balance">{Utils.cutOff(BTC_balance, 6)}</span></div>
				<Tooltip placement="bottom" isOpen={this.state.tooltipOpen8} autohide={false} target="BTC_balance" toggle={()=>this.toggle(8)}>
					{I18n.t('tooltip.BTC_balance')}
				</Tooltip>	
			</div>
		);
		secondRow.push(
			<div key="top-bar-table-cell4" className="top-bar-table-cell">
				<span className="top-bar-title">ETH {I18n.t('balance')}</span>
				<div className="top-bar-value"><span id="ETH_balance">{Utils.cutOff(ETH_balance, 6)}</span></div>
				<Tooltip placement="bottom" isOpen={this.state.tooltipOpen9} autohide={false} target="ETH_balance" toggle={()=>this.toggle(9)}>
					{I18n.t('tooltip.ETH_balance')}
				</Tooltip>	
			</div>		
		);
		secondRow.push(
			<div key="top-bar-table-cell5" className="top-bar-table-cell">
				<span className="top-bar-title">BCH {I18n.t('balance')}</span>
				<div className="top-bar-value"><span id="BCH_balance">{Utils.cutOff(BCH_balance, 6)}</span></div>
				<Tooltip placement="bottom" isOpen={this.state.tooltipOpen10} autohide={false} target="BCH_balance" toggle={()=>this.toggle(10)}>
					{I18n.t('tooltip.BCH_balance')}
				</Tooltip>		
			</div>	
		);
		secondRow.push(
			<div key="top-bar-table-cell6" className="top-bar-table-cell">
				<span className="top-bar-title">LTC {I18n.t('balance')}</span>
				<div className="top-bar-value"><span id="LTC_balance">{Utils.cutOff(LTC_balance, 6)}</span></div>
				<Tooltip placement="bottom" isOpen={this.state.tooltipOpen11} autohide={false} target="LTC_balance" toggle={()=>this.toggle(11)}>
					{I18n.t('tooltip.LTC_balance')}
				</Tooltip>	
			</div>
		);
		secondRow.push(
			<div key="top-bar-table-cell7" className="top-bar-table-cell">
				<span className="top-bar-title">XRP {I18n.t('balance')}</span>
				<div className="top-bar-value"><span id="XRP_balance">{Utils.cutOff(XRP_balance, 6)}</span></div>
				<Tooltip placement="bottom" isOpen={this.state.tooltipOpen12} autohide={false} target="XRP_balance" toggle={()=>this.toggle(12)}>
					{I18n.t('tooltip.XRP_balance')}
				</Tooltip>						
			</div>
		);

		return(
			<div className="top-bar-wrapper" id="top-bar">
				<div className="top-bar-table">
					<div className="top-bar-table-cell">
						<span className="top-bar-title">{I18n.t('konto_balance')}</span>
						<div className="top-bar-value"><span id="konto_balance">€ {Utils.cutOff(TOTAL_balance, 2)}</span></div>
					</div>
					<Tooltip placement="bottom" isOpen={this.state.tooltipOpen1} autohide={false} target="konto_balance" toggle={()=>this.toggle(1)}>
						{I18n.t('tooltip.konto_balance')}
					</Tooltip>

					<div className="top-bar-table-cell ">
						<span className="top-bar-title">BNX {I18n.t('pris')}</span>
						<div className="top-bar-value"><span id="pris">€ {Utils.cutOff(BNX_to_EUR_rate, 2)}</span></div>
					</div>
					<Tooltip placement="bottom" isOpen={this.state.tooltipOpen2} autohide={false} target="pris" toggle={()=>this.toggle(2)}>
						{I18n.t('tooltip.pris')}
					</Tooltip>

					<div className="top-bar-table-cell">
						<span className="top-bar-title">{I18n.t('afkast')}</span>
						<div className="top-bar-value"><span id="afkast">{Utils.cutOff(returnValue*100, 2)}%</span></div>
					</div>
					<Tooltip placement="bottom" isOpen={this.state.tooltipOpen3} autohide={false} target="afkast" toggle={()=>this.toggle(3)}>
						{I18n.t('tooltip.afkast')}
					</Tooltip>

					<div className="top-bar-table-cell" style={{position: 'relative'}}>
						<img className="topbar-lang" src={`/assets/img/${(localStorage.getItem('lang') === 'en') ? 'da' : 'en'}.svg`} alt={(localStorage.getItem('lang') === 'en') ? 'Danish' : 'English'} onClick={this.changeLang}/>
						<span className="top-bar-title">{I18n.t('profit')} | {I18n.t('tab')}</span>
						<div className="top-bar-value"><span id="profit_tab">€ {Utils.cutOff(EUR_profit, 2)}</span></div>
					</div>
					<Tooltip placement="bottom" isOpen={this.state.tooltipOpen4} autohide={false} target="profit_tab" toggle={()=>this.toggle(4)}>
						{I18n.t('tooltip.profit_tab')}
					</Tooltip>	
					{(this.state.isDesktop === false) ? secondRow : null}
				</div>
				{
					(this.state.isDesktop === true) ?
					<div className="top-bar-table one-row">
						{secondRow}
					</div> : null
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		moneyData: state.CommonReducer.moneyData,
		error: state.CommonReducer.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getMoneyBackend: (req) => {
			dispatch(CommonActions.getMoneyBackend(req.cb));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
