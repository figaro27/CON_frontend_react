import React from 'react';
import Utils from '../../Utils'

class BNXModal extends React.Component {
	render() {
		let ETH_balance = 0
		let BTC_balance = 0
		if(this.props.data) {
			ETH_balance = this.props.data.ETH_balance
			BTC_balance = this.props.data.BTC_balance
		}

		return (
			<div className="bnx-modal">
				<div className="modal-wrapper">
					<h3>Choose your BNX currency pair</h3>
					<div className="bnx-option" onClick={()=>this.props.selectType('ETH')}>
						<img src="/assets/img/cryptocurrency/eth.png" alt="" />
						<p>
							<span>ETH/BNX</span>
							<span className="balance">Balance {Utils.cutOff(ETH_balance, 6)} ETH</span>
						</p>
						<i className="fa fa-angle-right pull-right"></i>
					</div>
					<div className="bnx-option" onClick={()=>this.props.selectType('BTC')}>
						<img src="/assets/img/cryptocurrency/btc.png" alt="" />
						<p>
							<span>BTC/BNX</span>
							<span className="balance">Balance {Utils.cutOff(BTC_balance, 6)} BTC</span>
						</p>
						<i className="fa fa-angle-right pull-right"></i>
					</div>						
				</div>
			</div>
		)
	}
}


export default BNXModal;
