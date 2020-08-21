import React from "react";
import { connect } from 'react-redux';
import {I18n} from 'react-redux-i18n';
import Utils from '../../Utils'
import TooltipItem from './TooltipItem'
import { ProfileActions } from '../../Actions';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';
import './Reporting.css';

const REPORTING_PAGE_SIZE = 10
class Reporting extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			searchStr: '',
			pageNo: 1,
			orderType: true,
			sortIndex: 8,
			tableHeight: 0
		};
		this.renderThumb = this.renderThumb.bind(this);
	}

	renderThumb({ style, ...props }) {
		// const { top } = this.state;
		const thumbStyle = {
			backgroundColor: `black`
		};
		return (
			<div
				style={{ ...style, ...thumbStyle }}
				{...props} />
		);
	}	

	componentDidMount() {
		console.log('componentDidMount')
		this.props.getProfileLogs({
			cb: ()=> {
				this.setState({
					loading: false
				})
			}
		})

		let _this = this
		$(document).ready(function() {
			window.addEventListener('resize', _this.handleResize);
			_this.handleResize();
		})
	}

	handleResize = () => {
		// this.setState({
		// 	isDesktop: (window.innerWidth >= 768) ? true: false
		// })

		let tableHeight = window.innerHeight - $("#top-bar").height() - 200 - 57
		this.setState({
			tableHeight: tableHeight
		})
	}	

	handleChange = (event) => {
		let value = event.target.value
		this.setState({
			searchStr: value,
			pageNo: 1
		})
	}

	handleNextPage = () => {
		this.setState({
			pageNo: this.state.pageNo + 1
		})
	}

	handlePrevPage = () => {
		this.setState({
			pageNo: this.state.pageNo - 1
		})
	}

	getSortClassName = (idx) => {
		return (this.state.sortIndex === idx) ? ((this.state.orderType === true) ? 'sort-down' : 'sort-up') : ''
	}

	handleSort = (idx) => {
		let orderType = true
		if(this.state.sortIndex !== idx) {
			orderType = true
		}else {
			orderType = !this.state.orderType
		}

		this.setState({
			pageNo: 1,
			sortIndex: idx,
			orderType: orderType
		})
	}

	render() {
		let rows = []
		let _this = this
		let cnt = 0
		let all = 0
		let showCurrentPage = ''
		let showNextPage = ''
		let showPrevPage = ''
		let arrPairs = []

		if(this.props.logsData) {
			let str = _this.state.searchStr.toLowerCase()
			let logsData = this.props.logsData

			if(_this.state.sortIndex > 0) {
				logsData.sort(function(a, b) {
					switch(_this.state.sortIndex) {
						case 1:
							return (_this.state.orderType === false) ? (a.currency_cross).localeCompare(b.currency_cross) : (b.currency_cross).localeCompare(a.currency_cross)

						case 2:
							return (_this.state.orderType === false) ? a.rate - b.rate : b.rate - a.rate

						case 3:
							return (_this.state.orderType === false) ? a.amount - b.amount : b.amount - a.amount

						case 4:
							return (_this.state.orderType === false) ? a.euro_amount - b.euro_amount : b.euro_amount - a.euro_amount

						case 5:
							return (_this.state.orderType === false) ? a.total_fee - b.total_fee : b.total_fee - a.total_fee

						case 6:
							return (_this.state.orderType === false) ? (a.euro_amount - a.total_fee) - (b.euro_amount - b.total_fee) : (b.euro_amount - b.total_fee) - (a.euro_amount - a.total_fee)

						case 7:
							return (_this.state.orderType === false) ? a.amount_recieved - b.amount_recieved : b.amount_recieved - a.amount_recieved

						case 8:
							return (_this.state.orderType === false) ? (a.time_stamp).localeCompare(b.time_stamp) : (b.time_stamp).localeCompare(a.time_stamp)

						case 9:
							return (_this.state.orderType === false) ? (a.ip).localeCompare(b.ip) : (b.ip).localeCompare(a.ip)
						default:
							break;
					}
					return true;
				})
			}

			logsData.forEach(function(entry, index) {
				let fromCoin 		= entry.currency_cross.substr(0, 3).toLowerCase()
				let toCoin 			= entry.currency_cross.substr(3, 3).toLowerCase()
				// if (fromCoin === "eur") {
				// 	let nfromCoin = "€";
				// } else {
				// 	let nfromCoin = fromCoin.toUpperCase();
				// 	console.log(nfromCoin)
				// }
				// if (toCoin == "eur") {let ntoCoin = "€"} else {let ntoCoin = toCoin.toUpperCase()}
				let subtotal 		= `${Utils.cutOff(entry.euro_amount - entry.total_fee, 2)} €`
				let amount 			= `${Utils.cutOff(entry.amount, 2)} ${fromCoin.toUpperCase()}`
				let rate 				= `1 ${fromCoin.toUpperCase()} ⇢ ${Utils.cutOff(entry.rate, 6)} ${toCoin.toUpperCase()}`
				let price 			= `1 ${fromCoin.toUpperCase()} ⇆ ${Utils.cutOff(entry.euro_amount / entry.amount, 6)} €` // Eur amount / amount
				let total_fee 	= `${Utils.cutOff(entry.total_fee, 4)} €`
				let received 		= `${Utils.cutOff(entry.amount_recieved, 6)} ${toCoin.toUpperCase()}`
				let pairs 			= `${fromCoin.toUpperCase()} ⇢ ${toCoin.toUpperCase()}`
				let icon = null
				if(fromCoin === "bnx" || toCoin === "bnx") {
					let dir = `${fromCoin}to${toCoin}`
					if(toCoin === "bnx") {
						dir = `${toCoin}to${fromCoin}`
					}
					icon = <img src={`/assets/img/iconpack/${dir}/${fromCoin}to${toCoin}gold.png`} alt={pairs} />
				}else {
					let dir = `${fromCoin}${toCoin}`
					if(toCoin === "eur") {
						dir = `${toCoin}${fromCoin}`
					}
					icon = <img src={`/assets/img/iconpack/${dir}/${fromCoin}${toCoin}gold.png`} alt={pairs} />
				}

				if(pairs.toLowerCase().search(str) >= 0 ||
					rate.search(str) >= 0 ||
					amount.search(str) >= 0 ||
					price.search(str) >= 0 ||
					total_fee.search(str) >= 0 ||
					subtotal.search(str) >= 0 ||
					received.search(str) >= 0 ||
					entry.time_stamp.search(str) >= 0 ||
					entry.ip.search(str) >= 0) {

					if(all >= (_this.state.pageNo-1)*REPORTING_PAGE_SIZE && all < _this.state.pageNo*REPORTING_PAGE_SIZE) {
						arrPairs[cnt] = pairs
						rows.push(
							<tr key={`history-${entry.time_stamp}-${cnt}`}>
								<td className="text-center" style={{width: '10%'}}>
									<TooltipItem key={cnt} icon={icon} text={pairs} id={cnt} />
								</td>
								<td className="text-center" style={{width: '12%'}}>{price}</td>
								<td className="text-center" style={{width: '12%'}}>{rate}</td>
								<td className="text-center" style={{width: '6%'}}>{amount}</td>
								<td className="text-center" style={{width: '6%'}}>{total_fee}</td>
								<td className="text-center" style={{width: '8%'}}>{subtotal}</td>
								<td className="text-center" style={{width: '10%'}}>{received}</td>
								<td className="text-center" style={{width: '12%'}}>{Utils.formatDate(entry.time_stamp)}</td>
								<td className="text-center" style={{width: '10%'}}>{entry.ip}</td>
							</tr>)
						cnt++
					}
					all++
				}
			})

			if(cnt > 0) {
				showCurrentPage = <div className="shows-from">{I18n.t('shows_from')} {(this.state.pageNo-1)*REPORTING_PAGE_SIZE+1}-{(this.state.pageNo-1)*REPORTING_PAGE_SIZE+cnt}</div>
			}

			if(cnt > 0 && this.state.pageNo > 1 ) {
				showPrevPage = <div className="prev-page" onClick={this.handlePrevPage}>&lt; {I18n.t('prev_page')} {(this.state.pageNo-2)*REPORTING_PAGE_SIZE+1}-{(this.state.pageNo-1)*REPORTING_PAGE_SIZE}</div>
			}

			if(cnt > 0 && all > this.state.pageNo * REPORTING_PAGE_SIZE ) {
				let end = (all > (this.state.pageNo+1) * REPORTING_PAGE_SIZE) ? (this.state.pageNo+1)*REPORTING_PAGE_SIZE : all
				showNextPage = <div className="next-page" onClick={this.handleNextPage}>{I18n.t('next_page')} {this.state.pageNo*REPORTING_PAGE_SIZE+1}-{end} ></div>
			}
		}

		return (
			<div className="main-content-section-inner">
				<div className="reporting-block">
					<div className="table-responsive">
						<input type="text" placeholder="SEARCH REPORTING HERE" value={this.state.searchStr} onChange={this.handleChange.bind(this)} />
						<div className="tbl-header">
							<table className="table-dark">
								<thead>
									<tr>
										<th style={{width: '10%'}} className={this.getSortClassName(1)} onClick={()=>this.handleSort(1)}>{I18n.t('valutakryds')}</th>
										<th style={{width: '12%'}} className={this.getSortClassName(4)} onClick={()=>this.handleSort(4)}>€ {I18n.t('rate')}</th>
										<th style={{width: '12%'}} className={this.getSortClassName(2)} onClick={()=>this.handleSort(2)}>{I18n.t('exchange_rate')}</th>
										<th style={{width: '6%'}} className={this.getSortClassName(3)} onClick={()=>this.handleSort(3)}>{I18n.t('amount')}</th>
										<th style={{width: '6%'}} className={this.getSortClassName(5)} onClick={()=>this.handleSort(5)}>{I18n.t('fee')}</th>
										<th style={{width: '8%'}} className={this.getSortClassName(6)} onClick={()=>this.handleSort(6)}>{I18n.t('subtotal')}</th>
										<th style={{width: '10%'}} className={this.getSortClassName(7)} onClick={()=>this.handleSort(7)}>{I18n.t('received')}</th>
										<th style={{width: '12%'}} className={this.getSortClassName(8)} onClick={()=>this.handleSort(8)}>{I18n.t('timestamp')}</th>
										<th style={{width: '10%'}} className={this.getSortClassName(9)} onClick={()=>this.handleSort(9)}>IP-{I18n.t('address')}</th>
									</tr>
								</thead>
							</table>
						</div>
						<div className="tbl-body">
							<Scrollbars renderThumbVertical={this.renderThumb} style={{height: this.state.tableHeight}} autoHide>
								<table className="table-dark">
									<tbody>
										{rows}
									</tbody>
								</table>
							</Scrollbars>
						</div>
						{(this.state.loading === true) ? <div className="loader">{I18n.t('loading')} ...</div> : null}

						{
							(this.state.loading === false) ?
							<div className="pagination-block">
								{showCurrentPage}
								{showPrevPage}
								{showNextPage}
							</div>
							: null
						}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		resultData: state.CommonReducer.resultData,
		error: state.ProfileReducer.error,
		logsData: state.ProfileReducer.logsData
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getProfileLogs: (req) => {
			dispatch(ProfileActions.getProfileLogs(req.cb));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Reporting);
