import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { success, error, hide } from 'react-notification-system-redux';
import './UpdateProfile.css'
import Utils from '../../Utils'
import { ProfileActions } from '../../Actions';

class UpdateProfile extends React.Component {
	constructor(props) {
		super(props);

		this.blocking = false;

		this.state = {
			pid: '',
			name: '',
			date_of_birth: '',
			postal_code: '',
			address: '',
			email: '',
			phone_number: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		Utils.openPageLoadingNotification(); 
		if(this.props.profileData) {
			this.setProfileData(this.props.profileData)
		}else {
			this.props.getProfileInfo({
				cb: (data) => {
					if(this.props.error === null) {
						this.setProfileData(data)                    
					}
				}        
			})
		}
	}

	setProfileData = (data) => {
		this.setState({
			pid: data.pid,
			name: data.name,
			date_of_birth: data.date_of_birth,
			postal_code: !!data.postal_code ? data.postal_code : '',
			address: !!data.address ? data.address : '',
			email: !!data.email ? data.email : '',
			phone_number: !!data.phone_number ? data.phone_number : ''
		});  
	}

	handleSubmit(event) {
		event.preventDefault();
		Utils.openPageLoadingNotification();   

		// Prevent double tapping
		if (this.blocking) return;
		this.blocking = true;

		this.context.store.dispatch(hide('notification2'));
		this.context.store.dispatch(hide('notification3'));
		this.props.updateProfile({
	        data: {
	            postal_code: !!this.state.postal_code ? parseInt(this.state.postal_code, 10) : null,
	            address: this.state.address,
	            email: this.state.email,
	            phone_number: this.state.phone_number
	        },			
			cb: () => {
				if(this.props.error === null) {
					this.blocking = false;
					this.props.getProfileInfo({
						cb: null
					}) //update this.props.profileData

					this.context.store.dispatch(success({
						uid: 'notification2',
						title: I18n.t('notifications.title2'),
						message: I18n.t('notifications.message2'),
						position: 'tr',
						autoDismiss: 7,
						action: {
							label: I18n.t('notifications.button2'),
							callback: () => {
								this.context.router.history.push('/invest');
							}
						}
					}));                    
				}else {
					this.context.store.dispatch(error({
						uid: 'notification3',
						title: I18n.t('notifications.title3'),
						message: I18n.t('notifications.message3'),
						position: 'tr',
						autoDismiss: 7,
						action: {
							label: I18n.t('notifications.button3'),
							callback: () => {
								this.context.router.history.push('/updateprofile');
							}
						}
					}));                    
				}
			}
		})
	}

	handleInputChange(event) {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		this.setState({
			[name]: value
		});
	}

	render() {
		return (
			<div className="main-content-section-inner">
				<div className="profile-panel profile_update">
					<br />
					<div className="warning">
						<h1>{I18n.t('konto')}</h1>
						<svg className="user" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
						<g><path d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M789.6,848.7c-46.5-1.7-144.9-17.2-187.9-113.6c-11.4-25.6-12.6-46.8,0-61c15-17,33.8-62.7,40.7-101.7c2.8-15.5,40.2-20.8,40.7-61c18.4-20.1-0.1-56.3,0-81.4c0.2-62.3,6.9-121.8-20.4-162.8c-80.7-121.3-242.1-120.2-325.5,0c-25.6,36.8-20.5,100.2-20.4,162.8c0,25.7-21.7,60.1,0,81.4c0,40.4,35.6,39,40.7,61c9.1,39.6,20.3,81.5,40.7,101.7c19.9,19.9,9,34.6,0,61c-29.3,86.1-132.5,112-180.3,119.5c-104.2-83-171.1-211-171.1-354.6c0-250.3,203-453.3,453.3-453.3c250.3,0,453.2,202.9,453.2,453.3C953.3,640.2,889.6,765.6,789.6,848.7z"/></g></svg>
						<p className="text-center">{I18n.t('welcome_account')}</p>
					</div>
					<form onSubmit={this.handleSubmit}>
						{/* Readonly fields */}
						<div className="form-group">
							<input type="text" className="form-control" value={this.state.pid} readOnly placeholder={`BNX ${I18n.t('konto_nummer')}`} />
						</div>
						<div className="form-group">
							<input type="text" className="form-control" value={this.state.name} readOnly placeholder={I18n.t('full_name')} />
						</div>
						<div className="form-group">
							<input type="text" className="form-control" value={this.state.date_of_birth} readOnly placeholder={I18n.t('birthday')} />
						</div>

						{/* Writable fields */}
						<div className="form-group">
							<input type="text" className="form-control" value={this.state.address} name="address" onChange={this.handleInputChange} placeholder={I18n.t('address')} />
						</div>
						<div className="form-group">
							<input type="number" className="form-control" value={this.state.postal_code} name="postal_code" onChange={this.handleInputChange} placeholder={I18n.t('zip_city')} />
						</div>
						<div className="form-group">
							<input type="text" className="form-control" value={this.state.email} name="email" onChange={this.handleInputChange} placeholder="Email" />
						</div>
						<div className="form-group">
							<input type="text" className="form-control" value={this.state.phone_number} name="phone_number" onChange={this.handleInputChange} placeholder={I18n.t('mobile_number')} />
						</div>
						<div className="form-group">
							<button className="btn btn-update">{I18n.t('refresh')}</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

UpdateProfile.contextTypes = {
	store: PropTypes.object,
	router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		resultData: state.CommonReducer.resultData,
		profileData: state.ProfileReducer.profileData,
		error: state.ProfileReducer.error
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);