import React from 'react';
import Progressbar from 'react-circular-progressbar';
import cd from "classnames";
import 'react-circular-progressbar/dist/styles.css';
import  './progressbar.css'
class InvestmentReturns extends React.Component {
    render() {
        return (
            
                <div className="main-row row">
                    {this.props.ReturnsData.map((d, i) =>
                        <div className="main-col col-md-4" key={`investment-${i}`}>
                            <div className="dashboard-common-box-section">
                                <div className="dashboard-common-box-section-header">
                                    <span className="dashboard-common-box-section-title">{d.type}</span>
                                </div>
                                <div className="dashboard-common-box-section-content">
                                    <div className="dashboard-common-box-section-content-inner">
                                        <div className="dashboard-common-box-section-table">
                                            <div className="dashboard-common-box-chart">
                                                  <div style={{display:'inline-block',width:'115px'}}>
                                                       <Progressbar background strokeWidth={2} className={cd('progressbar-color', 'progressbar-trail', 'progressbar-background', { 'progressbar-text-green': d.percentage>=0 }, {'progressbar-text-red':true})} percentage={d.percentage} />
                                                  </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
               
    
        )
    }
}
export default InvestmentReturns;
