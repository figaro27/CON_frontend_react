import React from "react";
import { Tooltip } from 'reactstrap';

class TooltipItem extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			tooltipOpen: false
		};
	}

	toggle() {
		this.setState({
			tooltipOpen: !this.state.tooltipOpen
		});
	}

	render() {
	return (
		<div>
			<div id={`icon${this.props.id}`}>{this.props.icon}</div>
			<Tooltip placement="bottom" isOpen={this.state.tooltipOpen} autohide={false} target={`icon${this.props.id}`} toggle={this.toggle}>
				{this.props.text}
			</Tooltip>			
		</div>
	);
	}
}

export default TooltipItem;