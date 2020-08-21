import React from "react";
import moment from "moment";
import {connect} from 'react-redux';
import './History.css';
import {DashboardActions} from '../../Actions';

class History extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            historiesList: []
        };
    }

    componentDidMount(){
        this.props.getHistoryAll({
            cb: (res) => {        
                if(this.props.error === null) {
                    this.setState({
                        historiesList: res
                    })
                }
            }
        })
    }

    render() {
        let historiesList = []
        this.state.historiesList.forEach((history, idx) => {
            let info = (history.status === "COMPLETED") ? 'green' : 'red'
            historiesList.push(
                <tr key={`history-${idx}`}>
                    <td>{moment(history.date).format("DD/MM/YYYY - HH.mm.ss")}</td>
                    <td  className="text-center">{(history.type === "buy_fund") ? "Bought" : "Sold"}</td>
                    <td  className="text-center">{history.amount_spent} {(history.type === "buy_fund") ? "ETH" : "BNX"}</td>
                    <td  className="text-center">${history.equity_value}</td>
                    <td  className="text-center">{history.exchange_rate} ETH/BNX</td>
                    <td  className="text-center">{history.fee} ETH</td>
                    <td  className="text-center">{history.amount_received} {(history.type === "buy_fund") ? "BNX" : "ETH"}</td>
                    <td  className={`text-right history-status ${info}`}> {history.status.toLowerCase()} </td>
                </tr>
            )
        })

        return (
            <div  className="main-content-section-inner">
                <div className="history-block">
                    <div  className="table-responsive">
                        <table  className="table-dark history-table">
                            <thead>
                                <tr >
                                    <th>Timestamp</th>
                                    <th  className="text-center">ORDERTYPE</th>
                                    <th  className="text-center">Amount</th>
                                    <th  className="text-center">Equity value</th>
                                    <th  className="text-center">Exchange rate</th>
                                    <th  className="text-center">Fee</th>
                                    <th  className="text-center">Amount Received</th>
                                    <th  className="text-right">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historiesList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        resultData: state.DashboardReducer.resultData,
        error: state.DashboardReducer.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHistoryLatest: (req) => {
            dispatch(DashboardActions.getHistoryAll(req.cb));   
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);