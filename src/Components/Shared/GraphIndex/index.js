import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import CurrencyConstants from "../../../Constants/Currency"
import {DashboardActions} from '../../../Actions';
import {I18n} from 'react-redux-i18n';
import $ from 'jquery';
import Utils from '../../../Utils';
import './_graphIndex.css';

class GraphZoomBut extends Component {
	handleClick(e){
		var start = this.props.start
		var end   = this.props.end
		this.props.handleClick(e, start, end)
	}
	render() {
		return (
			<div className="graph-zoom-but" onClick={this.handleClick.bind(this)} >
				{this.props.text}
			</div>
		);
	}
}

class ZoomButs extends Component {
	render() {
		return (
			<div className="zoom-buts">
				<GraphZoomBut handleClick={this.props.handleClick} text={I18n.t('day')}   end={100} start={96.6} />
				<GraphZoomBut handleClick={this.props.handleClick} text={I18n.t('week')}   end={100} start={80} />
				<GraphZoomBut handleClick={this.props.handleClick} text={I18n.t('month')} end={100} start={0} />
			</div>
		);
	}
}

class GraphIndex extends Component {
	constructor(props) {
		super(props);

		let currencyIndex = 1;
		if(localStorage.getItem("currency")) {
			currencyIndex = localStorage.getItem("currency");
		}
		this.state = {
			left: '5%',
			right: '5%',
			start: 0,
			end: 100,
			currency: CurrencyConstants[currencyIndex]
		};

		this.onEvents = {
		}
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
		this.props.getChartData(this.props.type.toLowerCase())
	}

	handleResize = () => {
		this.setState({
			left: (window.innerWidth >= 768) ? '5%' : '30',
			right: (window.innerWidth >= 768) ? '5%' : '20'
		})
	}

	getOption = (xs, ys, rate) => {
		xs = xs.map(price => Utils.cutOff(price * rate, 2))
		let min = (xs.length === 0) ? 0 : Math.min.apply(null, xs)
		let max = (xs.length === 0) ? 1 : Math.max.apply(null, xs)
		if(this.state.start > 0) {
			let tmp = xs.slice((-1) * parseInt(xs.length - xs.length / 100 * this.state.start, 10))
			min = Math.min.apply(null, tmp)
			max = Math.max.apply(null, tmp)
		}

		return {
			color: '#B48E48',
			grid: {
				left: this.state.left,
				right: this.state.right,
				bottom: 80
			},
			tooltip : {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					animation: false,
					label: {
						backgroundColor: '#505765'
					}
				},
				position: function (pt, params) {
		          let tooltipWidth = 152;
		          let offsetLeft = $(".echarts-for-react")[0].offsetLeft;
		          let curLeft = pt[0];

		          if(window.innerWidth < tooltipWidth + offsetLeft + curLeft) {
		            curLeft -= tooltipWidth;
		          }

		          return [curLeft, '10%'];
				}
			},
			dataZoom: [
				{
					show: true,
					realtime: true,
					start: this.state.start,
					end: this.state.end,
					axisLine: { lineStyle: { color: 'white' } },
					textStyle: {color:"white"},
				},
				{
					type: 'inside',
					textStyle: {color:"white"},
					realtime: true,
					start: 65,
					end: 45,
					axisLine: { lineStyle: { color: 'white' } }
				}
			],
			xAxis : [
				{
					type: 'category',
					boundaryGap: false,
					data: ys,
					axisLine: { lineStyle: { color: 'white' } }
				}
			],
			yAxis: [
				{
					name: this.props.type,
					type: 'value',
					min: Math.round(min * rate, 10),
					max: Math.round(max * rate, 10),
					position: 'left',
					axisLine: { lineStyle: { color: 'white' } }
				}
			],
			series: [
				{
					name:'BNX ' + I18n.t('pris'),
					type:'line',
					smooth: true,
					stack: '总量',
					lineStyle: {normal: {color:"#B48E48", opacity:"1"}},
					data: xs,
				}
			]
		};
	};

	handleClick(e, start, end){
		this.setState({start : start})
		this.setState({end : end})
	}

	render() {
		let xs = []
		let ys = []
		let rate = 1
		if(this.props.chartData && this.props.chartData[this.props.type.toLowerCase()]) {
			xs = this.props.chartData[this.props.type.toLowerCase()].graph_data.map(obj => obj.close.toFixed(3))
			ys = this.props.chartData[this.props.type.toLowerCase()].graph_data.map(obj => Utils.toDateTime(obj.time))
		}
		if(this.props.moneyData) {
			rate = this.props.moneyData[`${this.props.type}_to_EUR_rate`]
		}

		return (
			<div className="graph-index">
				<ZoomButs handleClick={this.handleClick}/>
				<ReactEcharts
					option={this.getOption(xs, ys, rate)} onEvents={this.onEvents}
					style={{height: '400px', width: '100%',}}
					className='react_for_echarts' />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        error: state.DashboardReducer.error,
		chartData: {
			bnx: state.DashboardReducer.chartDataBNX,
			eth: state.DashboardReducer.chartDataETH,
			btc: state.DashboardReducer.chartDataBTC,
			ltc: state.DashboardReducer.chartDataLTC,
			bch: state.DashboardReducer.chartDataBCH,
			xrp: state.DashboardReducer.chartDataXRP
		}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getChartData: (type) => {
            dispatch(DashboardActions.getChartData(type));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphIndex);
