import React from 'react';
import { connect } from 'react-redux';
import {I18n} from 'react-redux-i18n';
import swal from 'sweetalert';
import Utils from '../../Utils'
import { CommonActions, ProfileActions } from '../../Actions';
import './contactus.css'

class ContactUs extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			message: ''
		}
	}

	handleChange = (event) => {
		this.setState({message: event.target.value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		Utils.openPageLoadingNotification()

		if(this.props.profileData) {
			this.handleSendEmail(this.props.profileData)
		}else {
			this.props.getProfileInfo({
				cb: (res) => {
					if(this.props.profileError === null) {
						this.handleSendEmail(res)
					}
				}
			})
		}
	}

	handleSendEmail = (res) => {
		this.props.sendEmail({
			data: {
				"subject": "Kontakt os - BACKEND",
				"name": res.name,
				"email": (res.email) ? res.email : "noreply@blockchainnordic.dk",
				"phone": (res.phone_number) ? res.phone_number : "",
				"message": this.state.message
			},
			cb: () => {
				if(this.props.error === null) {
					swal({
						title: I18n.t('contactus.text5'),
						text: I18n.t('contactus.text6'),
						icon: "success"
					});

					this.setState({
						message: ''
					})
				}
			}
		})
	}

	componentDidMount = () => {
		Utils.openPageLoadingNotification();
	}

	render() {
		return (
			<div className="main-content-section-inner">
				<div className="contact-us-wrapper">
					<div className="main-row row">
						<div className="main-col">
							<div className="common-title4">{I18n.t('contact_us')}</div>
						</div>
					</div>
					<div className="main-row row">
						<div className="main-col">
							<div className="contact-us-content-box">
								<div className="contact-us-text common-text1">
									<p>
										<h4>{I18n.t('contactus.text1')}</h4><br></br>
										{I18n.t('contactus.text2')}
									</p>
								</div>
								<div className="contact-us-form">
									<form onSubmit={this.handleSubmit}>
										<div className="contact-us-form-row">
											<div className="contact-us-form-filed">
												<textarea className="contact-message-filed" placeholder={I18n.t('contactus.text3')} data-gramm="false" required value={this.state.message} onChange={this.handleChange}></textarea>
											</div>
										</div>
										<div className="contact-us-form-row">
											<div className="contact-submit-buttn">
												<button className="contact-submit-btn smooth" type="submit">{I18n.t('contactus.text4')}</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		resultData: state.CommonReducer.resultData,
		error: state.CommonReducer.error,
		profileData: state.ProfileReducer.profileData,
		profileError: state.ProfileReducer.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getProfileInfo: (req) => {
			dispatch(ProfileActions.getProfileInfo(req.cb));
		},
		sendEmail: (req) => {
			dispatch(CommonActions.sendEmail(req.data, req.cb))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
