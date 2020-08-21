import React, {Component} from 'react';
import './LoadingOverlay.css';

class LoadingOverlay extends Component {
  render() {
    if (!this.props) {
      return null;
    }else{
      let overlayClass = (this.props.show) ? 'loading-overlay show' : 'loading-overlay';

      return (
        <div className={overlayClass}>
          <div className="ui-ios-overlay ios-overlay-show">
              <span className="title"> 
                {this.props.message}
              </span> 
              <div className="spinner">
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              </div>
          </div>
        </div>
      );
    }
  }
}

export default LoadingOverlay;
