import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Notifications from 'react-notification-system-redux';

import SideBar from '../Elements/Menu/SideBar';
import Footer from '../Elements/Footer/Footer';
import TopBar from '../Components/Shared/TopBar';
import SmallScreen from '../Components/Shared/SmallScreen';
import $ from 'jquery';

class AdminLayout extends React.Component {
	constructor(props)
	{
		super(props)
		this.state = {
			top: 0,
			isMobile: false,
			marginTop: 76
		};
		this.renderThumb = this.renderThumb.bind(this);
		this.handleResize = this.handleResize.bind(this);
	}

	handleResize() {
		setTimeout(function() {
			let marginTop = document.getElementById('top-bar').offsetHeight;
			this.setState({
				marginTop: marginTop
			});

			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		}.bind(this), 300)
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);

		$(".sidebar-menu-list li, .mob-menu-click").click(function () {
			if ($(window).width() <= 1199) {
				if($(this).hasClass("has-submenu") === false) {
					$(".sidebar").animate({
						width: "toggle"
					});
				}
			}
		});


		if ($(window).width() <= 767) {
			this.setState({ isMobile: true })
		}
		$(".sidebar-menu-list li").click(function () {
			$(".c-hamburger").removeClass("is-active");
		});

		this.handleResize();
	}

	renderThumb({ style, ...props }) {
		// const { top } = this.state;
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
		const {notifications} = this.props;

		return (
			<div className='main-parent-wrapper' id='admin-layout'>
				<SmallScreen />
				<div className="main-wrapper small-screen-header-margin">
					<SideBar auth={this.props.auth} />
					<div className="main-content-wrapper">
						<TopBar auth={this.props.auth}/>
						<div className="main-content-section" style={{'marginTop': this.state.marginTop}}>
							{this.props.children}
						</div>
						<Footer />
					</div>
				</div>
				<Notifications notifications={notifications} />
			</div>
		)
	}
}

AdminLayout.contextTypes = {
	store: PropTypes.object,
	router: PropTypes.object.isRequired
};

AdminLayout.propTypes = {
	notifications: PropTypes.array
};

export default connect(
	state => ({ notifications: state.notifications })
)(AdminLayout);
