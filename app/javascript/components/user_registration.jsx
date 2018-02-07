import React from 'react'
import axios from 'axios'

export default class Registration extends React.Component {
    
    registerUser() {
        axios({
            method: 'POST',
            url: '/users',
            data: {user: {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                password_confirmation: document.getElementById("password_confirmation").value
            }},
            headers: {
                'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
            }
        })
        .then(function(response){
            console.log("posted")
        })
    }
    
    render() {
        return (
            <form>
                <h3>Register</h3>
                <div id="tf-fName" className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" pattern="[A-Z, a-z, ]*" id="firstName"/>
                    <label className="mdl-textfield__label" htmlFor="firstName">First Name</label>
                    <span className="mdl-textfield__error">Letters and spaces only</span>
                </div><br/>
                
                <div id="tf-lName" className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" pattern="[A-Z, a-z, ]*" id="lastName"/>
                    <label className="mdl-textfield__label" htmlFor="lastName">Last Name</label>
                    <span className="mdl-textfield__error">Letters and spaces only</span>
                </div><br/>

                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" pattern="[A-Z, a-z, 0-9, #, -, _]*" id="username"/>
                    <label className="mdl-textfield__label" htmlFor="username">Username</label>
                    <span className="mdl-textfield__error">Letters, numbers, '#', '-' and '_' only</span>
                </div><br/>

                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="password" pattern="[A-Z, a-z, 0-9, #, -, _]*" id="password"/>
                    <label className="mdl-textfield__label" htmlFor="password">Password</label>
                    <span className="mdl-textfield__error">Letters, numbers, '#', '-' and '_' only</span>
                </div><br/>

                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="password" pattern="[A-Z, a-z, 0-9, #, -, _]*" id="password_confirmation"/>
                    <label className="mdl-textfield__label" htmlFor="password_confirmation">Confirm password</label>
                    <span className="mdl-textfield__error">Letters, numbers, '#', '-' and '_' only</span>
                </div><br/>

                <div id="tf-email" className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="email" id="email"/>
                    <label className="mdl-textfield__label" htmlFor="email">Email</label>
                    <span className="mdl-textfield__error">Please enter a valid email address</span>
                </div><br/>

                <button onClick={this.registerUser.bind(this)} type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent regButton" id="registerButton">
                Register
                </button>
            </form>
        );
    }
}