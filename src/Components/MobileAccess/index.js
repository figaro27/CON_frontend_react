import React from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode-react';
import speakeasy from 'speakeasy';
import { I18n } from 'react-redux-i18n';
import swal from 'sweetalert';
import { ProfileActions } from '../../Actions';
import './_mobileAccess.css';

class MobileAccess extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			code: '',
			userToken: '',
			confirmToken: '',
			two_factor_temp_secret: ''
		};
	}

	componentDidMount = () => {
		if(this.props.profileData) {
			this.generateSecret(this.props.profileData.pid)
		}else {
			this.props.getProfileInfo({
				cb: (res) => {
					if(this.props.profileError === null) {
						this.generateSecret(res.pid)
					}
				}
			})
		}        
	}

	generateSecret = (pid) => {
		let secret = speakeasy.generateSecret({
			name: pid
		})		

		this.setState({
			code: secret.otpauth_url,
			two_factor_temp_secret: secret.hex
		})
	}

	handleActivate = (event) => {
		event.preventDefault();

		let userToken = this.state.userToken
		let confirmToken = this.state.confirmToken
		let base32secret = this.state.two_factor_temp_secret

		if(userToken !== confirmToken) {
			swal({
				title: I18n.t('mobile_access.alert_title1'),
				text: I18n.t('mobile_access.alert_text1'),
				icon: "warning"
			});
		}

		let verified = speakeasy.totp.verify({ 
			secret: base32secret,
			encoding: 'hex',
			token: userToken 
		});

		console.log(verified)
		if(verified === true) {
			this.props.updateProfile({
		        data: {
		            secret: base32secret
		        },			
				cb: () => {
					if(this.props.profileError === null) {
						swal({
							title: I18n.t('mobile_access.alert_title2'),
							text: I18n.t('mobile_access.alert_text2'),
							icon: "success"
						})
					}
				}
			})
		}else {
			swal({
				title: I18n.t('mobile_access.alert_title3'),
				text: I18n.t('mobile_access.alert_text3'),
				icon: "error"
			});
		}
	}

	handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		this.setState({
			[name]: value
		});
	}	

	render() {
		return (
			<div className="mobile-access">
				<h3>{I18n.t('mobile_access.title')}</h3>
				<div className="wrapper">
					<form onSubmit={this.handleActivate}>
						<p>1.</p>
						<p>{I18n.t('mobile_access.text1')}</p>
						
						<p>2.</p>
						<p>{I18n.t('mobile_access.text2')}</p>

						<div className="qrcode">
							{(this.state.code) ? <QRCode value={this.state.code} /> : null}
						</div>

						<p>3.</p>
						<p>{I18n.t('mobile_access.text3')}</p>
						<p>4.</p>
						<p>{I18n.t('mobile_access.text4')}</p>
						<input type="text" className="form-control" placeholder={I18n.t('mobile_access.text5')} value={this.state.userToken} required name="userToken" onChange={this.handleInputChange}/>

						<p>5.</p>
						<p>{I18n.t('mobile_access.text6')}</p>
						<input type="text" className="form-control" placeholder={I18n.t('mobile_access.text7')} value={this.state.confirmToken} required name="confirmToken" onChange={this.handleInputChange}/>

						<button className="btn btn-activate">{I18n.t('mobile_access.button')}</button>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		profileData: state.ProfileReducer.profileData,
		profileError: state.ProfileReducer.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getProfileInfo: (req) => {
			dispatch(ProfileActions.getProfileInfo(req.cb)); 
		},
		updateProfile: (req) => {
			dispatch(ProfileActions.updateProfile(req.data, req.cb)); 
		}		
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileAccess);