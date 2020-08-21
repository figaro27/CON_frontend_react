import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactTelephoneInput from 'react-telephone-input'
import './_continue.css'
import 'react-telephone-input/css/default.css'
import { ProfileActions } from '../../Actions'

class Continue extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        	address: '',
            country: 'Danmark',
            city: '',
            postcode: '',
            number: '',
            email: ''
        };
    }

    componentDidMount = () => {
    	localStorage.removeItem('past_filled')
		if(this.props.auth.isPastFilled() === true) {
			window.location.href = '/'
		}
    }

	handleTelChange = (telNumber, selectedCountry) => {
		this.setState({
			number: telNumber
		});
	}

	handleInputBlur = (telNumber, selectedCountry) => {

	}

	handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		this.setState({
			[name]: value
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();

		this.props.updateProfile({
			data: {
				address: this.state.address,
				postal_code: this.state.postcode,
				phone_number: this.state.number,
				email: this.state.email
			},
			cb: (res) => {
				if(this.props.error === null) {
					localStorage.setItem('past_filled', 1)
					window.location.href = '/'
				}
			}
		})
	}

	render () {
		return (
			<div className="continue-page">
				<div className="wrapper">
					<div className="block">
						<form onSubmit={this.handleSubmit}>
							<h3>Hello! Thank you for choosing us!</h3>
							<div className="form-group">
								<label htmlFor="address">Address*</label>
								<input type="text" className="form-control" id="address" placeholder="Street name and house number" value={this.state.address} name="address" onChange={this.handleInputChange} required/>
							</div>

							<div className="form-group info">
								<p>Please insert your street name and house number in this box. The information given should be identical with the information stated on your social security card.</p>
							</div>

							<div className="form-group">
								<label htmlFor="postcode" style={{display: 'block'}}>Postcode and City*</label>
								<input type="text" className="form-control postcode" id="postcode" placeholder="Postcode" value={this.state.postcode} name="postcode" onChange={this.handleInputChange} required/>
								<input type="text" className="form-control city" id="city" placeholder="City" value={this.state.city} name="city" onChange={this.handleInputChange} required/>
								<div className="clearfix"></div>
							</div>

							<div className="form-group">
								<label htmlFor="country">Country</label>
								<input type="text" className="form-control" id="country" value={this.state.country} readOnly/>
							</div>

							<div className="form-group">
								<label htmlFor="mobilenumber">Mobile number*</label>
								<input type="text" className="fake-number" value={this.state.number} required/>
								<ReactTelephoneInput
									defaultCountry="dk"
									preferredCountries={['dk']}
									flagsImagePath='/assets/img/flags.png'
									onChange={this.handleTelChange}
									required
									onBlur={this.handleInputBlur}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="email">Email*</label>
								<input type="email" className="form-control" id="email" placeholder="email@email.com" value={this.state.email} name="email" onChange={this.handleInputChange} required/>
							</div>

							<button type="submit" className="btn btn-update">Continue</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

Continue.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Continue);
