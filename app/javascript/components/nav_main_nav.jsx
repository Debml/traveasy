import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import SiteLinks from './nav_site_links'

export default class MainNav extends React.Component {
    constructor(props) {
        super(props);
        
        this.logOut = this.logOut.bind(this);
    }
    
    logOut() {
        let that = this;
        
        axios({
            method: 'GET',
            url: '/users/sign_out',
            headers: {
                'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
            }
        })
        .then(function(){
            that.props.handleLogout(null);
        })
    }
    
    render() {
        return (
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">Traveasy</span>
                    
                    <div className="mdl-layout-spacer"></div>
                    
                    <nav className="mdl-navigation mdl-layout--large-screen-only">
                        <a className="mdl-navigation__link">Checklists</a>
                        <a className="mdl-navigation__link">Trips</a>
                    </nav>
                    
                    <nav className="mdl-navigation">
                        <p className="mdl-navigation__link">{this.props.user.email}</p>
                        <div id="log_out-icon" className="material-icons icon-clickable" onClick={this.logOut}>exit_to_app</div>
                        <div className="mdl-tooltip mdl-tooltip--large" htmlFor="log_out-icon">Logout</div>
                    </nav>
                </div>
            </header>
        );
    }
}

MainNav.propTypes = {}