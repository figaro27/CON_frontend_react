import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import {I18n} from 'react-redux-i18n';
import TooltipItem from '../../Reporting/TooltipItem'
import Utils from '../../../Utils'

class TraddingHistroy extends React.Component {
	constructor(props) {
		super(props)
		this.state = { top: 0 }
		this.renderThumb = this.renderThumb.bind(this);
	}

	renderThumb({ style, ...props }) {
		const thumbStyle = {
			backgroundColor: `black`
		};
		return (
			<div
				style={{ ...style, ...thumbStyle }}
				{...props} />
		);
	}

	render() {
		let rows = []
		this.props.HistoryData.sort(function(a, b) {
			return (b.time_stamp).localeCompare(a.time_stamp)
		})

		if(this.props.HistoryData.length > 0) {
			let cnt = 0
			this.props.HistoryData.forEach(function(entry, index) {
				let fromCoin = entry.currency_cross.substr(0, 3).toLowerCase()
				let toCoin = entry.currency_cross.substr(3, 3).toLowerCase()
				let subtotal = `${Utils.cutOff(entry.euro_amount - entry.total_fee, 2)} €`
				let amount = `${Utils.cutOff(entry.amount, 2)} ${fromCoin.toUpperCase()}`
				let rate = `${amount} ⇢ ${Utils.cutOff(entry.euro_amount, 2)} ${toCoin.toUpperCase()}`
				let price = `${Utils.cutOff(entry.rate, 2)} € ⇆ 1 ${fromCoin.toUpperCase()}`
				let total_fee = `${Utils.cutOff(entry.total_fee, 2)} €`
				let received = `${Utils.cutOff(entry.amount_recieved, 2)} ${toCoin.toUpperCase()}`
				let pairs = `${fromCoin.toUpperCase()} / ${toCoin.toUpperCase()}`
				let icon = null
				if(fromCoin === "bnx" || toCoin === "bnx") {
					let dir = `${fromCoin}to${toCoin}`
					if(toCoin === "bnx") {
						dir = `${toCoin}to${fromCoin}`
					}
					icon = <img src={`/assets/img/iconpack/${dir}/${fromCoin}to${toCoin}white.png`} alt={pairs} />
				}else {
					let dir = `${fromCoin}${toCoin}`
					if(toCoin === "eur") {
						dir = `${toCoin}${fromCoin}`
					}
					icon = <img src={`/assets/img/iconpack/${dir}/${fromCoin}${toCoin}white.png`} alt={pairs} />
				}

				rows.push(
					<tr key={`history-${entry.created}-${index}`}>
						<td style={{width: '15%'}} className="text-center">
							<TooltipItem key={cnt} icon={icon} text={pairs} id={cnt} />
						</td>
						<td style={{width: '25%'}}className="text-center">{rate}</td>
						<td style={{width: '15%'}} className="text-center">{price}</td>
						<td style={{width: '10%'}} className="text-center">{total_fee}</td>
						<td style={{width: '10%'}} className="text-center">{subtotal}</td>
						<td style={{width: '10%'}} className="text-center">{received}</td>
						<td style={{width: '15%'}} className="text-center">{Utils.formatDate(entry.time_stamp)}</td>
					</tr>)

				cnt++
			})
		}

		return (
			<div className="dashboard-common-box-section">
				<div className="dashboard-common-box-section-header">
					<span className="dashboard-common-box-section-title">{I18n.t('reporting')}</span>
				</div>
				<div className="dashboard-common-box-section-content no-padding">
					<div className="dashboard-common-box-section-content-inner custom-scrool-min-width-480">
						<div className="dashboard-trading-table-wrapper">
							<div className="tbl-header">
								<div className="dashboard-trading-table-scrool">
									<table className="dashboard-trading-table" >
										<thead>
											<tr>
												<th style={{width: '15%'}}>{I18n.t('valutakryds')}</th>
												<th style={{width: '25%'}}>{I18n.t('exchange_rate')}</th>
												<th style={{width: '15%'}}>{I18n.t('pris')} (€)</th>
												<th style={{width: '10%'}}>{I18n.t('fee')}</th>
												<th style={{width: '10%'}}>{I18n.t('subtotal')}</th>
												<th style={{width: '10%'}}>{I18n.t('received')}</th>
												<th style={{width: '15%'}}>{I18n.t('timestamp')}</th>
											</tr>
										</thead>
									</table>
								</div>
							</div>
							<div className="tbl-body">
								<Scrollbars renderThumbVertical={this.renderThumb} style={{height:270}} autoHide>
									<div className="dashboard-trading-table-scrool">
										<table className="dashboard-trading-table">
											<tbody>
												{rows}
											</tbody>
										</table>
									</div>
								</Scrollbars>
							</div>
						</div>
					</div>
				</div>
			</div>

	)

	}
}
export default TraddingHistroy;
