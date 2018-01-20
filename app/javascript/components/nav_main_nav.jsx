import React from 'react'
import SiteLinks from './nav_site_links'
import UserControl from './nav_user_control'
import Drawer from './nav_drawer';

export default class MainNav extends React.Component {
    render() {
        return (
            <div className="mdl-layout mdl-layout--no-desktop-drawer-button mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title home">Traveasy</span>
                        
                        <div className="mdl-layout-spacer"></div>
                        
                        {/*Hide links in small screens and show the drawer menu instead*/}
                        <nav className="mdl-layout--large-screen-only">
                            <SiteLinks loggedIn = {this.props.loggedIn}/>
                        </nav>
                        
                        <UserControl loggedIn = {this.props.loggedIn}/>
                        
                    </div>
                </header>
                <Drawer loggedIn = {this.props.loggedIn}/>
            </div>
        );
    }
}