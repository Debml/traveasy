import React from 'react'

export default class SiteLinks extends React.Component {
    render() {
        return (
            <nav className="mdl-navigation">
                <a className="mdl-navigation__link">Checklists</a>
                <a className="mdl-navigation__link">Trips</a>
            </nav>
        );
    }
}