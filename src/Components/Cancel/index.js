import React, {Component} from "react";
import PropTypes from 'prop-types';
import { Line } from 'rc-progress'
import { I18n } from 'react-redux-i18n';
import { info, hide } from 'react-notification-system-redux';
import '../Progress/_progress.css';

class Cancel extends Component
{
	componentDidMount = () => {
		this.context.store.dispatch(hide('notification13'));
		localStorage.removeItem('deposit_success')
		this.context.store.dispatch(info({
			uid: 'notification13',
			title: I18n.t('notifications.title13'),
			message: I18n.t('notifications.message13'),
			position: 'tr',
			autoDismiss: 7,
			action: {
				label: I18n.t('notifications.button13')
			}
		})); 		
	}

    render() {
        return (
			<div className="main-content-section-inner">
				<div className="progress-page">
					<div className="bar">
						<img src="/assets/img/progress/CARD.gif" alt="" />
						<img src="/assets/img/progress/Arrow.gif" alt="" />
						<img src="/assets/img/progress/Euro.gif" alt="" />
						<img src="/assets/img/progress/Arrow.gif" alt="" />
						<img src="/assets/img/progress/Ethereum.gif" alt="" />
						<img src="/assets/img/progress/Arrow.gif" alt="" />
						<img src="/assets/img/progress/BNX.gif" alt="" />
					</div>

					<Line percent={0} strokeWidth="2" trailWidth="2" strokeColor="#008000" />
					<div className="label">0.00%</div>                    
					<div className="msg">
						<img src="/assets/img/progress/paymentcanceled.svg" alt="" />
					</div>
				</div>
			</div>
        )
    }
}

Cancel.contextTypes = {
	store: PropTypes.object
};

export default Cancel;