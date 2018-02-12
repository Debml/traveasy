import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class UserForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            sign_up: false,
            show_password: false
        };
        
        this.toggleForm = this.toggleForm.bind(this)
        this.toggleShowPassword = this.toggleShowPassword.bind(this)
        this.signUp = this.signUp.bind(this)
        this.signIn = this.signIn.bind(this)
        this.handleSubmitButton = this.handleSubmitButton.bind(this)
    }
    
    toggleForm() {
        this.setState({sign_up: !this.state.sign_up})
    }
    
    toggleShowPassword() {
        this.setState({show_password: !this.state.show_password})
    }
    
    signIn() {
        let that = this
        
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
            that.props.handleUser({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            })
        })
    }
    
    signUp() {
        let that = this

        axios({
            method: 'POST',
            url: '/users',
            data: {user: {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                password_confirmation: document.getElementById("password").value
            }},
            headers: {
                'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
            }
        })
        .then(function(response){
            that.props.handleUser({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            })
        })
    }
    
    handleSubmitButton() {
        if (this.state.sign_up)
            this.signUp()
        else
            this.signIn()
    }
    
    render() {
        return (
            <form className="user-form">
                <h3 className="user-form__title">{this.state.sign_up? "Sign up":"Sign in"}</h3>
                
                {this.state.sign_up && <div className="user-form__input-container">
                    <i className="material-icons user-form__input-icon">person</i>
                    <input className="mdl-textfield__input user-form__input" type="text" id="name" placeholder="Name"/>
                </div>}
                
                <div className="user-form__input-container">
                    <i className="material-icons user-form__input-icon">email</i>
                    <input className="mdl-textfield__input user-form__input" type="text" id="email" placeholder="Email"/>
                </div>

                <div className="user-form__input-container">
                    <i className="material-icons user-form__input-icon">lock</i>
                    <input className="mdl-textfield__input user-form__input user-form__showable_password" type={this.state.show_password? "text":"password"} id="password" placeholder="Password"/>
                    <i className="material-icons user-form__input-icon__show-password" onMouseEnter={this.toggleShowPassword} onMouseLeave={this.toggleShowPassword}>remove_red_eye</i>
                </div>

                <button type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored user-form__button" onClick={this.handleSubmitButton}>
                    {this.state.sign_up? "Sign up":"Sign in"}
                </button>
                
                <div className="user-form__toggle-container">
                    {this.state.sign_up? "Already registered? ":"Not Registered? "} 
                    <span className="user-form__toggle-button" onClick={this.toggleForm}>{!this.state.sign_up? "Sign up":"Sign in"}</span>
                </div>
            </form>
        );
    }
}