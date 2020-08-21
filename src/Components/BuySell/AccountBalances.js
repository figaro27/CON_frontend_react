import React from 'react';
import Utils from '../../Utils';

class AccountBalances extends React.Component {
	render() {
		let BNX_balance = 0
		let ETH_balance = 0
		let BTC_balance = 0
		let EUR_balance = 0
		let LTC_balance = 0
		let BCH_balance = 0
		let XRP_balance = 0

		if(this.props.data) {
			BNX_balance = this.props.data.BNX_balance
			ETH_balance = this.props.data.ETH_balance
			BTC_balance = this.props.data.BTC_balance
			EUR_balance = this.props.data.EUR_balance
			LTC_balance = this.props.data.LTC_balance
			BCH_balance = this.props.data.BCH_balance
			XRP_balance = this.props.data.XRP_balance
		}

		return (
			<div className="account-balances">
				<div className="row">
					<div className="col-md-7">
						<div className="row">
							<div className="col-md-6 label">
								Account balance
							</div>
							<div className="col-md-6">
								<div className="balance-row">
									<span className="type">EUR</span>
									<span className="value">{Utils.cutOff(EUR_balance, 2)}</span>
								</div>
								<div className="balance-row">
									<span className="type">BTC</span>
									<span className="value">{Utils.cutOff(BTC_balance, 4)}</span>
								</div>								
								<div className="balance-row">
									<span className="type">LTC</span>
									<span className="value">{Utils.cutOff(LTC_balance, 4)}</span>
								</div>
								<div className="balance-row">
									<span className="type">BCH</span>
									<span className="value">{Utils.cutOff(BCH_balance, 4)}</span>
								</div>								
							</div>
							<div className="show-mobile">
								<div className="balance-row">
									<span className="type">BNX</span>
									<span className="value">{Utils.cutOff(BNX_balance, 4)}</span>
								</div>
								<div className="balance-row">
									<span className="type">XRP</span>
									<span className="value">{Utils.cutOff(XRP_balance, 4)}</span>
								</div>								
								<div className="balance-row">
									<span className="type">ETH</span>
									<span className="value">{Utils.cutOff(ETH_balance, 4)}</span>
								</div>								
							</div>
						</div>
					</div>
					<div className="col-md-5 hide-mobile">
						<div className="balance-row">
							<span className="type">BNX</span>
							<span className="value">{Utils.cutOff(BNX_balance, 4)}</span>
						</div>
						<div className="balance-row">
							<span className="type">XRP</span>
							<span className="value">{Utils.cutOff(XRP_balance, 4)}</span>
						</div>								
						<div className="balance-row">
							<span className="type">ETH</span>
							<span className="value">{Utils.cutOff(ETH_balance, 4)}</span>
						</div>					
					</div>
				</div>
			</div>	
		)
	}
}


export default AccountBalances;
