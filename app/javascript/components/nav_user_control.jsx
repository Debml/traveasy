import React from 'react'

export default class UserControl extends React.Component {
    render() {
        return (
            this.props.loggedIn ? 
            (
                <nav className="mdl-navigation">
                    <p className="mdl-navigation__link" id="username">David</p>
                    <div id="ttLogout" className="icon material-icons logoutIcon">exit_to_app</div>
                    <div className="mdl-tooltip mdl-tooltip--large" htmlFor="ttLogout">Logout</div>
                </nav>
            ) : ( null )
        );
    }
}