import React from "react";
import MenuItems from "../Menu/MenuItem";
import SidebarBottom from "./SidebarBottom";
import { Link } from "react-router-dom";
import ScrollBars from 'react-custom-scrollbars';

class SideBar extends React.Component {
    render() {
        return (
            <aside className="sidebar">
                <div className="logo-table">
                    <div className="logo-table-cell">
                        <div className="logo">
                            <Link to='https://blockchainnordic.dk'><img className="logo" alt="logo" src='/assets/img/icon/logo.svg' /></Link>
                        </div>
                    </div>
                </div>
                <div className="sidebar-inner">
                    <div className='sidebar-inner-content'>
                        <ScrollBars style={{ height: '100%' }}>
                            <MenuItems/>
                        </ScrollBars>
                    </div>
                </div>
                <SidebarBottom auth={this.props.auth} />
            </aside>

        )
    }
}
export default SideBar;
