import React from 'react';
import Utils from '../../Utils';

class TopTables extends React.Component {
	render() {
		return (
			<div className="tables">
				<div className="row">
					<div className="col-md-6 top-buyers">
						<h3>TOP 7 BUYERS</h3>
						<table>
							<thead>
								<tr>
									<th>Price (EUR)</th>
									<th>Amount ({this.props.type})</th>
									<th>Value (EUR)</th>
								</tr>
							</thead>
							<tbody>
							{
								(this.props.data[this.props.type.toLowerCase()]) ?
								this.props.data[this.props.type.toLowerCase()].buyers.map((entry, i) => (
									<tr key={`top-buyers-${i}`}>
										<td>{Utils.cutOff(entry[0], 2)}</td>
										<td>{Utils.cutOff(entry[1], 6)}</td>
										<td>{Utils.cutOff(entry[0] * entry[1], 2)}</td>
									</tr>	
								)) : null
							}
							</tbody>
						</table>
					</div>
					<div className="col-md-6 top-sellers">
						<h3>TOP 7 SELLERS</h3>
						<table>
							<thead>
								<tr>
									<th>Price (EUR)</th>
									<th>Amount ({this.props.type})</th>
									<th>Value (EUR)</th>
								</tr>
							</thead>
							<tbody>
							{
								(this.props.data[this.props.type.toLowerCase()]) ?
								this.props.data[this.props.type.toLowerCase()].sellers.map((entry, i) => (
									<tr key={`top-buyers-${i}`}>
										<td>{Utils.cutOff(entry[0], 2)}</td>
										<td>{Utils.cutOff(entry[1], 6)}</td>
										<td>{Utils.cutOff(entry[0] * entry[1], 2)}</td>
									</tr>	
								)) : null
							}
							</tbody>
						</table>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
					{
						(typeof this.props.data[this.props.type.toLowerCase()] === 'undefined') ? <center><img className="orderbook-loading" src="/loading.svg" alt=""/></center> : null
					}	
					</div>
				</div>			
			</div>
		)
	}
}

export default TopTables;
