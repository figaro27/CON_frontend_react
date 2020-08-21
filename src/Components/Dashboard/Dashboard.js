import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {I18n} from 'react-redux-i18n';
import './Dashboard.css'
// import InvestmentReturns from './InvestmentssReturns/InvestmentReturns';
import TraddingHistroy from './TradingHistory/TradingHistory';
import BlockChainNews from './BlockChainNews/BlockChainNews';
import 'react-circular-progressbar/dist/styles.css';
import './InvestmentssReturns/progressbar.css'
import swal from 'sweetalert';
import GraphIndex from '../Shared/GraphIndex';
import { CommonActions, DashboardActions, ProfileActions } from '../../Actions';
import { success, hide } from 'react-notification-system-redux';
import axios from 'axios';
import Utils from '../../Utils';

const arrCoins = [
    {id: 1, name: 'bitcoin'},
    {id: 1027, name: 'ethereum'},
    {id: 1765, name: 'eos'},
    {id: 52, name: 'ripple'},
    {id: 328, name: 'monero'},
    {id: 1214, name: 'lisk'},
    {id: 2099, name: 'iconic'},
    {id: 1684, name: 'qtum'}
]

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progressData1: null,
            progressData2: null,
            traddingHistoryData: [],
            newsList: [],
            coin: null,
            bitcoinRate: 1,
            ethereumRate: 1,
            eosRate: 1,
            rippleRate: 1,
            moneroRate: 1,
            liskRate: 1,
            iconicRate: 1,
            qtumRate: 1
        };

        this.deleteHistory = this.deleteHistory.bind(this);
    }

    componentWillMount() {
        let currentPath = this.context.router.route.location.pathname
        let lang = currentPath.split('/')[1]
        if(lang === '') {
            window.location.href = '/en'
        }
    }

    componentDidMount(){
        let _this = this;
        this.props.getDashboard({
            cb: (res) => {

            }
        })

        this.props.getProfileLogs({
            cb: (res) => {
                if(_this.props.profileError === null && res !== null) {
                    _this.setState({
                        traddingHistoryData: res.slice(0, 10)
                    })
                }
            }
        })

        this.props.getNewsLatest()
        this.props.getChartData("BNX");
        this.props.getChartData("ETH");
        this.props.getChartData("BTC");
        this.props.getChartData("LTC");
        this.props.getChartData("BCH");
        this.props.getChartData("XRP");

        if(localStorage.getItem('loggedin_first')) {
            localStorage.removeItem('loggedin_first');

            this.props.getProfileInfo({
                cb: (res) => {
                    if(res.is_loggedin === false) {
                        this.dispatchCreatedAccount()
                        this.props.sendNotificationEmail({
                            data: {
                                lang: (localStorage.getItem('lang') === 'en') ? 0 : 1,
                                type: 'welcome'
                            }
                        })
                    }
                }
            })
        }

        // coin rates
        arrCoins.forEach(function(item) {
            let state = _this.state
            if(localStorage.getItem(`rate-${item.name}`)) {
                state[`${item.name}Rate`] =  localStorage.getItem(`rate-${item.name}`)
                _this.setState(state)
            }

            axios.get(`https://api.coinmarketcap.com/v2/ticker/${item.id}/?convert=EUR`).then(function (res) {
                let state = _this.state
                state[`${item.name}Rate`] = res.data.data.quotes.EUR.price
                _this.setState(state)
                localStorage.setItem(`rate-${item.name}`, res.data.data.quotes.EUR.price)
            })
        })
    }

    dispatchCreatedAccount = () => {
        this.context.store.dispatch(hide('notification1'));
        this.context.store.dispatch(success({
            uid: 'notification1',
            title: I18n.t('notifications.title1'),
            message: I18n.t('notifications.message1'),
            position: 'tr',
            autoDismiss: 7,
            action: {
                label: I18n.t('notifications.button1'),
                callback: () => {
                    this.context.router.history.push('/updateprofile');
                }
            }
        }));
    }

    deleteHistory(history, index) {
        let _this = this;
        swal({
            title: I18n.t('are_you_sure'),
            text: I18n.t('delete_history_success'),
            icon: "warning",
            buttons: [I18n.t('no'), I18n.t('yes')],
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.props.deleteHistory({
                    data: {id: history.id},
                    cb: (res) => {
                        if(this.props.error === null) {
                            let data = _this.state.traddingHistoryData;
                            data.splice(index, 1);
                            _this.setState({
                                traddingHistoryData: data
                            });
                        }
                    }
                })
            }
        });
    }

    coinHoverHandler = () => {
        // this.setState({
        //     coin: null
        // })
    }

    coinClickHandler = (item) => {
        this.setState({
            coin: item
        })
    }

    render() {
        const BNX_struktur = [
             {img: 'Qtum.svg', title: I18n.t('structures.qtum'), name: 'Qtum', url: 'https://qtum.org/'},
             {img: 'Icon.svg', title: I18n.t('structures.icon'), name: 'Iconic', url: 'https://icon.foundation/'},
             {img: 'Lisk.svg', title: I18n.t('structures.lisk'), name: 'Lisk', url: 'https://lisk.io/'},
             {img: 'EOS.svg', title: I18n.t('structures.eos'), name: 'EOS', url: 'https://eos.io/'},
             {img: 'ETH.svg', title: I18n.t('structures.eth'), name: 'Ethereum', url: 'https://www.ethereum.org/'},
             {img: 'Bitcoin.svg', title: I18n.t('structures.bitcoin'), name: 'Bitcoin', url: 'https://www.bitcoin.com/'},
             {img: 'Ripple.svg', title: I18n.t('structures.ripple'), name: 'Ripple', url: 'https://ripple.com/'},
             {img: 'Monero.svg', title: I18n.t('structures.monero'), name: 'Monero', url: 'https://getmonero.org/'}
        ]

        return (
            <div className="main-content-section-inner">
                <div className="main-row row">
                    <div className="main-col dashboard-section1-left">
                        <div className="dashboard-section1-chart-box1">
                            <div className="dashboard-section1-chart-box1-title">
                                <h2 className="dashboard-title text-align-center">Blockchain Nordic Index (BNX)</h2>
                            </div>
                            <div className="dashboard-section1-chart-box1-chart">
                                {
                                    (this.props.dashboardResult && this.props.dashboardResult.returnList) ?
                                    <div className="GraphIndex_indecies">
                                        <div className="GraphIndex_index GraphIndex_index_left">
                                            <div>
                                                <p className="GraphIndex_index_time">1D Return</p>
                                                <p className="GraphIndex_index_price">{Utils.cutOff(this.props.dashboardResult.returnList[0].returnValue * 100, 2)}%</p>
                                            </div>
                                        </div>
                                        <div className="GraphIndex_index">
                                            <div>
                                                <p className="GraphIndex_index_time">1W Return</p>
                                                <p className="GraphIndex_index_price">{Utils.cutOff(this.props.dashboardResult.returnList[1].returnValue * 100, 2)}%</p>
                                            </div>
                                        </div>
                                        <div className="GraphIndex_index GraphIndex_index_left">
                                            <div>
                                                <p className="GraphIndex_index_time">1M Return</p>
                                                <p className="GraphIndex_index_price">{Utils.cutOff(this.props.dashboardResult.returnList[3].returnValue * 100, 2)}%</p>
                                            </div>
                                        </div>
                                        <div className="GraphIndex_index">
                                            <div>
                                                <p className="GraphIndex_index_time">ALL TIME</p>
                                                <p className="GraphIndex_index_price">{Utils.cutOff(this.props.dashboardResult.returnList[2].returnValue * 100, 2)}%</p>
                                            </div>
                                        </div>
                                    </div> : null
                                }

                                <GraphIndex type="BNX" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main-row row">
                    <div className="main-col col-md-6">
                        <TraddingHistroy HistoryData={this.state.traddingHistoryData} deleteHistory={this.deleteHistory}/>
                    </div>
                    <div className="main-col col-md-6">
                        <BlockChainNews NewsList={this.props.newsData} />
                    </div>
                </div>
                <div className="main-row row dashboard-box">
                    <div className="main-col col-md-12">
                        <div className="box-header">Index {I18n.t('struktur')}</div>
                        <div className="box-content">
                            {
                                BNX_struktur.map((item) => (
                                    <div key={`struktur_${item.img}`} className="struktur" onMouseEnter={this.coinHoverHandler} onClick={()=>this.coinClickHandler(item)}>
                                        <div className="wrapper">
                                            <img src={`/assets/img/struktur/${item.img}`} alt=""/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="coin-hover-area">
                    <div className="wrapper">
                        {
                            (this.state.coin === null) ?
                            'click a coin for more info'
                            :
                            (
                                <div>
                                    <h3>{this.state.coin.name}</h3>
                                    <p>{this.state.coin.title}</p>
                                    <p className="rate">Rate = {Utils.cutOff(this.state[`${this.state.coin.name.toLowerCase()}Rate`], 2)} €</p>
                                    <a className="coin-url" href={this.state.coin.url} target="_blank">{this.state.coin.url}</a>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        resultData: state.DashboardReducer.resultData,
        dashboardResult: state.DashboardReducer.dashboardResult,
        error: state.DashboardReducer.error,
        profileError: state.ProfileReducer.error,
        newsData: state.DashboardReducer.newsData,
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
        getDashboard: (req) => {
            dispatch(DashboardActions.getDashboard(req.cb));
        },
        getChartData: (type) => {
            dispatch(DashboardActions.getChartData(type));
        },
        // getHistoryLatest: (req) => {
        //     dispatch(DashboardActions.getHistoryLatest(req.cb));
        // },
        getProfileLogs: (req) => {
            dispatch(ProfileActions.getProfileLogs(req.cb));
        },
        getNewsLatest: (req) => {
            dispatch(DashboardActions.getNewsLatest());
        },
        deleteHistory: (req) => {
            dispatch(DashboardActions.deleteHistory(req.data, req.cb));
        },
        sendNotificationEmail: (req) => {
            dispatch(CommonActions.sendNotificationEmail(req.data));
        },
        getProfileInfo: (req) => {
            dispatch(ProfileActions.getProfileInfo(req.cb));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
