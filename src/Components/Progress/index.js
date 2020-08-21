import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Line } from 'rc-progress'
import { I18n } from 'react-redux-i18n';
import { success, hide } from 'react-notification-system-redux';
import AnimatedNumber from 'react-animated-number';
import { CommonActions, MoneyActions } from '../../Actions';
import './_progress.css';
import swal from 'sweetalert'

const SUCCESS_PROCESS = 19
class Progress extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			step: 0
		};
	}

	updateStep  = () => {
		this.props.moneyProcess({
			cb: (res) => {
				console.log(res)
				let step = 0
				if(this.props.error === null) {
					step = parseInt(res.process, 10)
					this.setState({
						step: step
					})
				}

				if (step < SUCCESS_PROCESS) {
					setTimeout(this.updateStep, 10000)
				}

				if (step >= SUCCESS_PROCESS) {
					if(localStorage.getItem('started_deposit')) {
						localStorage.removeItem('started_deposit')
						this.context.store.dispatch(hide('notification4'));
						this.context.store.dispatch(success({
							uid: 'notification4',
							title: I18n.t('notifications.title4'),
							message: I18n.t('notifications.message4'),
							position: 'tr',
							autoDismiss: 7,
							action: {
								label: I18n.t('notifications.button4')
							}
						}));

                        this.props.sendNotificationEmail({
                            data: {
                                lang: (localStorage.getItem('lang') === 'en') ? 0 : 1,
                                type: 'deposit',
                                amount: localStorage.getItem('deposit_amount')
                            }
                        })
					}

					swal({
						icon: "success",
						className: 'only-icon',
						buttons: false
					});	
					setTimeout(function() {
						swal.close();
					}, 1500);										
				}
			}
		})
	}

	componentDidMount = () => {
		this.updateStep()		
	}

	render() {
		/*
			step 1 = green card
			step 2 = green EURO
			step 3~18 = green ETH
			step 19 = green BNX
		*/		

		let step = this.state.step
		let percent = 100 / SUCCESS_PROCESS * step
		if(percent > 100) {
			percent = 100
		}

		if(step >= 3 && step <=18){
			step = 3
		}else if(step === 19) {
			step = 4
		}
		
		return (
			<div className="main-content-section-inner">
				<div className="progress-page">
					{
						(step === 0) ?
							<div className="bar">
								<img src="/assets/img/progress/CARD.gif" alt="" />
								<img src="/assets/img/progress/Arrow.gif" alt="" />
								<img src="/assets/img/progress/Euro.gif" alt="" />
								<img src="/assets/img/progress/Arrow.gif" alt="" />
								<img src="/assets/img/progress/Ethereum.gif" alt="" />
								<img src="/assets/img/progress/Arrow.gif" alt="" />
								<img src="/assets/img/progress/BNX.gif" alt="" />
							</div>
						: (step === 1) ?
							<div className="bar">
								<img src="/assets/img/progress/CARD.svg" alt="" />
								<img src="/assets/img/progress/Arrow.gif" alt="" />
								<img src="/assets/img/progress/Euro.gif" alt="" />
								<img src="/assets/img/progress/Arrow.gif" alt="" />
								<img src="/assets/img/progress/Ethereum.gif" alt="" />
								<img src="/assets/img/progress/Arrow.gif" alt="" />
								<img src="/assets/img/progress/BNX.gif" alt="" />
							</div>
						: (step === 2) ?
							<div className="bar">
								<img src="/assets/img/progress/CARD.svg" alt="" />
								<img src="/assets/img/progress/Arrow_green.gif" alt="" />
								<img src="/assets/img/progress/Euro.svg" alt="" />
								<img src="/assets/img/progress/Arrow.gif" alt="" />
								<img src="/assets/img/progress/Ethereum.gif" alt="" />
								<img src="/assets/img/progress/Arrow.gif" alt="" />
								<img src="/assets/img/progress/BNX.gif" alt="" />
							</div>
						: (step === 3) ?
							<div className="bar">
								<img src="/assets/img/progress/CARD.svg" alt="" />
								<img src="/assets/img/progress/Arrow_green.gif" alt="" />
								<img src="/assets/img/progress/Euro.svg" alt="" />
								<img src="/assets/img/progress/Arrow_green.gif" alt="" />
								<img src="/assets/img/progress/Ethereum.svg" alt="" />
								<img src="/assets/img/progress/Arrow.gif" alt="" />
								<img src="/assets/img/progress/BNX.gif" alt="" />
							</div>
						: (step === 4) ?
							<div className="bar">
								<img src="/assets/img/progress/CARD.svg" alt="" />
								<img src="/assets/img/progress/Arrow_green.gif" alt="" />
								<img src="/assets/img/progress/Euro.svg" alt="" />
								<img src="/assets/img/progress/Arrow_green.gif" alt="" />
								<img src="/assets/img/progress/Ethereum.svg" alt="" />
								<img src="/assets/img/progress/Arrow_green.gif" alt="" />
								<img src="/assets/img/progress/BNX.svg" alt="" />
							</div>
						: null
					}
					<Line percent={percent} strokeWidth="2" trailWidth="2" strokeColor="#008000" />
					<div className="label">
						<AnimatedNumber component="text" value={percent}
							style={{
								transition: '0.8s ease-out',
								fontSize: 14,
								transitionProperty:
									'background-color, color, opacity'
							}}
							duration={1000}
							formatValue={n => `${n.toFixed(2)}%`}/>
					</div>
					<div className="msg">
						<img src={`/assets/img/progress/${step}.svg`}  alt="" />
						<p>{I18n.t('progress.text1')}</p>
						<b>{I18n.t('progress.text2')}</b>
					</div>
				</div>
			</div>
		)
	}
}

Progress.contextTypes = {
	store: PropTypes.object,
	router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		resultData: state.MoneyReducer.resultData,
		error: state.MoneyReducer.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
        sendNotificationEmail: (req) => {
            dispatch(CommonActions.sendNotificationEmail(req.data));
        },
		moneyProcess: (req) => {
			dispatch(MoneyActions.moneyProcess(req.cb));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
