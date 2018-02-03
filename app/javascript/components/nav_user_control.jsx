import React from 'react'
import axios from 'axios'

export default class UserControl extends React.Component {
    asignOut() {
        axios({
            method: 'GET',
            url: '/users/sign_out',
            headers: {
                'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
            }
        })
        .then(function(response){
            console.log("signed out")
        })
    }
    
    render() {
        return (
            this.props.loggedIn ? 
            (
                <nav className="mdl-navigation">
                    <p className="mdl-navigation__link" id="username">{this.props.user.email}</p>
                    <div onClick={this.props.logout.bind(this)} id="ttLogout" className="icon material-icons logoutIcon">exit_to_app</div>
                    <div className="mdl-tooltip mdl-tooltip--large" htmlFor="ttLogout">Logout</div>
                </nav>
            ) : ( null )
        );
    }
}