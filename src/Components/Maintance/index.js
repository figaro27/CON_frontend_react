import React from "react";
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';
import './_maintance.css';

class Maintance extends React.Component {
	componentDidMount = () => {
		
	}

	render() {
		return (
			<div className="main-content-section-inner">
				<div className="maintance-page">
					<h3>{I18n.t('maintance.title')}</h3>
					<p>{I18n.t('maintance.text1')}</p>
					<p>{I18n.t('maintance.text2')}</p>
				</div>
			</div>
		)
	}
}

Maintance.contextTypes = {
	store: PropTypes.object,
	router: PropTypes.object.isRequired
};

export default Maintance;