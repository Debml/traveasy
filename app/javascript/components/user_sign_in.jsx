import React from 'react'
import axios from 'axios'

export default class SignIn extends React.Component {
    signIn() {
        axios({
            method: 'POST',
            url: '/users/sign_in',
            data: {user: {
                email: document.getElementById("username").value,
                password: document.getElementById("password").value,
            }},
            headers: {
                'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
            }
        })
        .then(function(response){
            console.log("logged_in")
        })
    }
    
    render() {
        return(
            <form className="coloredBorder">
                <h3>Log In</h3>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" id="username"/>
                    <label className="mdl-textfield__label" htmlFor="username">Username</label>
                </div><br/>

                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="password" id="password"/>
                    <label className="mdl-textfield__label" htmlFor="password">Password</label>
                </div><br/>

                <button onClick={this.signIn.bind(this)} type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="loginButton">
                Login
                </button>
            </form>
        );
    }
}

