import React from "react";
// import ReactEcharts from 'echarts-for-react';
// import echarts from "echarts";


const ChartStyle =
    {
        height: '366px',
        width: '104%%',
        marginLeft: '-38px',
        top: '-51px'
    }

class SubChart extends React.Component {
    render() {
        return (
            <div className="main-row row">
                <div className="main-col">
                    <div className="dashboard-section1-chart-box2">
                        <div className="dashboard-section1-chart-box2-chart">
                            <img src="/assets/img/dashboard-chart-img2.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default SubChart;
