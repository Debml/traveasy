import React from 'react'
import axios from 'axios'

export default class SignIn extends React.Component {
    signIn() {
        axios({
            method: 'POST',
            url: '/users/sign_in',
            data: {user: {
                email: document.getElementById("email").value,
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
            <form className="sign_in-form">
                <h3 className="sign_in-form__title">Sign in</h3>
                
                <div className="sign_in-form__input-container">
                    <i className="material-icons sign_in-form__input-icon">email</i>
                    <input className="mdl-textfield__input sign_in-form__input" type="text" id="email" placeholder="Email"/>
                </div>

                <div className="sign_in-form__input-container">
                    <i className="material-icons sign_in-form__input-icon">lock</i>
                    <input className="mdl-textfield__input sign_in-form__input" type="password" id="password" placeholder="Password"/>
                </div>

                <button onClick={this.signIn.bind(this)} type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored sign_in-form__button" id="sign_in-button">
                    Sign in
                </button>
                
                <div className="sign_in-form__sign_up-container">Not registered? <span className="sign_in-form__sign_up-button">Sign up</span></div>
            </form>
        );
    }
}

