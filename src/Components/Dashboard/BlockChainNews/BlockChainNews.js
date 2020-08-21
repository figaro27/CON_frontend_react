import React from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import {I18n} from 'react-redux-i18n';

class BlockChainNews extends React.Component {
    renderThumb = ({ style, ...props }) => {
        const thumbStyle = {
            backgroundColor: `rgb(68, 66, 66)`
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props} />
        );
    }
    render() {
        return (
            <div className="dashboard-common-box-section">
                <div className="dashboard-common-box-section-header">
                    <span className="dashboard-common-box-section-title">{I18n.t('nyheder')}</span>
                </div>
                <Scrollbars renderThumbVertical={this.renderThumb} style={{ height: 290 }} autoHide>
                    <div className="dashboard-common-box-section-content no-padding">
                        <div className="dsashboard-common-box-section-content-inner custom-scrool">
                            <ul className="dashboard-blockchain-news-list">

                            {(this.props.NewsList && this.props.NewsList.results) ? this.props.NewsList.results.map((d, i) =>
                                    <li key={`news${i}`}><a href={d.url} target="_blank">{d.title}</a></li>
                            ): null}
                            </ul>

                        </div>
                    </div>
                </Scrollbars>

            </div>
        )
    }
}
export default BlockChainNews;
