import React from 'react';
import {I18n} from 'react-redux-i18n';

class SidebarBottom extends React.Component
{
	constructor(props) {
		super(props);

		this.logout = this.logout.bind(this);
	}

	logout() {
		this.props.auth.logout();
	}

    render()
    {
        return(
            <div  className="sidebar-bottom-section">
            <ul  className="sidebar-menu-list">
				<li>
					<a className="smooth" href="">
						<img alt="" className="back" src="/assets/img/icon/back.svg" />
						<span className="sidebar-menu-list-text" onClick={this.logout}>{I18n.t('logout')}</span>
					</a>
				</li>
            </ul>
        </div>
        )
    }
}
export default SidebarBottom;
