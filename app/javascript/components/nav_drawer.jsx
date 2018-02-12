import React from 'react'
import SiteLinks from './nav_site_links'

export default class Drawer extends React.Component {
    render() {
        return (
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Traveasy</span>
                <nav className="mdl-navigation">
                    <a className="mdl-navigation__link">Checklists</a>
                    <a className="mdl-navigation__link">Trips</a>
                </nav>
            </div>
        );
    }
}