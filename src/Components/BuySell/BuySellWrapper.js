import React from 'react';
import PropTypes from 'prop-types';
import BuySell from './BuySell';

class BuySellWrapper extends React.Component {
	render() {
        let type = this.props.match.params.type

		return (
			<BuySell type={type.toUpperCase()}></BuySell>
		)
	}
}

BuySellWrapper.contextTypes = {
    router: PropTypes.object.isRequired
};

export default BuySellWrapper;
