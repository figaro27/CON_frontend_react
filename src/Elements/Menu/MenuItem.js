import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';
import './menu.css';
import MenuConstants from '../../Constants/Menu';
import $ from 'jquery';

class MenuItem extends React.Component
{
	constructor (props, context) {
		super(props, context)

		this.state = {
			selected: '',
			expanded: false
		}
	}

	onClickMenuItem = (item, idx) => {
		//set scroll top
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		
		if(item.sub_menus) {						
			$('#' + idx).slideToggle(500)
			this.setState({
				expanded: !this.state.expanded
			})				
		}else {
			if(item.class) {
				$(".sub-menus").slideUp(500)
			}else {
				//BNX sub menus
				if(item.label === 'BNX') {
					let dom = document.getElementById("buysell-page");
					let internalInstance = dom[Object.keys(dom).find(key =>
						key.startsWith('__reactInternalInstance$'))];
					internalInstance.return.stateNode.setState({
						isOpenedModal: true
					})
				}
			}

			this.setState({
				selected: item.path
			})			
		}
	}

	componentDidMount = () => {
		let currentPath = this.context.router.route.location.pathname
		this.setState({
			selected: currentPath,
			expanded: (currentPath.split('/')[1] === 'buysell') ? true : false
		})
	}

	render() {
		let currentPath = this.context.router.route.location.pathname
		let basePath = currentPath.split('/')[1]
		let rows = []
		let sub_items = []

		MenuConstants.forEach((item, i) => {
			sub_items = []
			if(item.sub_menus) {
				item.sub_menus.forEach((item, i) => {
					let subPath = item.path.split('/')[2]
					sub_items.push(
						<li key={`submenu-${item.label}-${i}`}>
							<Link to={`${item.path}/${localStorage.getItem('lang')}`} onClick={()=>this.onClickMenuItem(item, i)} className={`smooth ${(this.state.selected === item.path) ? 'active': ''}`}>
								{<img alt="" className={item.class} src={`/assets/img/menu/${subPath}.svg`} />}
								<span className="sidebar-menu-list-text">{I18n.t(item.label)}</span>
							</Link>
						</li>		
					)
				})
			}

			if(item.sub_menus) {
				rows.push(
					<li key={`menu-${i}`} className={(this.state.expanded === true) ? 'expanded has-submenu': 'has-submenu'}>
						<a onClick={()=> this.onClickMenuItem(item, `submenu-${i}`)} className={`smooth ${(this.state.selected === item.path || item.base === basePath ) ? 'active': ''}`}>
							<img alt="" className={item.class} src={`/assets/img/icon/${item.icon}`} />
							<span className="sidebar-menu-list-text">{I18n.t(item.label)}</span>
							<span className="pull-right-container">
							  <i className="fa fa-angle-left pull-right"></i>
							</span> 
						</a>
						<ul key={`submenu-${i}`} id={`submenu-${i}`} className="sub-menus">
							{sub_items}
						</ul>
					</li>
				)
			}else {
				rows.push(
					<li key={`menu-${i}`}>
						<Link to={`${item.path}/${localStorage.getItem('lang')}`} onClick={()=> this.onClickMenuItem(item, `submenu-${i}`)} className={`smooth ${(this.state.selected === item.path) ? 'active': ''}`}>
							<img alt="" className={item.class} src={`/assets/img/icon/${item.icon}`} />
							<span className="sidebar-menu-list-text">{I18n.t(item.label)}</span>
						</Link>
					</li>
				)
			}
		})

		return(
			<div>
				<ul  className="sidebar-menu-list">
					{rows}
				</ul>
			</div>
		)
	}
}

MenuItem.contextTypes = {
	router: PropTypes.object.isRequired
};
export default MenuItem;
