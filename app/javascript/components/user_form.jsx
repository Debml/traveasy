import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class UserForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            sign_up: false,
            show_password: false,
            name: {validated: false, error: false, error_message: ""},
            email: {validated: false, error: false, error_message: ""},
            password: {validated: false, error: false, error_message: ""},
            submittable: false
        };
        
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
        this.handleSubmitButton = this.handleSubmitButton.bind(this);
        
        this.validateName = this.validateName.bind(this);
        this.revalidateName = this.revalidateName.bind(this);
        
        this.validateEmail = this.validateEmail.bind(this);
        this.revalidateEmail = this.revalidateEmail.bind(this)
        
        this.validatePassword = this.validatePassword.bind(this);
        this.revalidatePassword = this.revalidatePassword.bind(this)
        
        this.getIconDecorator = this.getIconDecorator.bind(this);
        this.getBorderDecorator = this.getBorderDecorator.bind(this);
    }
    
    validateName() {
        const name_value = document.getElementById("name").value;
        var name = {validated: true, error: false, error_message: ""};
        var re = /^[a-zA-Z0-9 .'-]+$/; //only allow letters from a-z (low and uppercase), space, dot, hyphen and apostrophe
        var is_valid = true;
        
        if (name_value.length == 0) {
            name = {validated: true, error: true, error_message: "Everyone has a name, what's yours?"}
            is_valid = false;
        }
        else if (!new RegExp(re).test(name_value)) {
            name = {validated: true, error: true, error_message: "Let's stick to regular characters, please"}
            is_valid = false;
        }
        
        this.setState({name});
        return is_valid;
    }
    
    revalidateName() {
        //only validate if it was already validated once
        if (!this.state.name.validated)
            return
            
        this.validateName()
    }
    
    validateEmail() {
        const email_value = document.getElementById("email").value;
        var email = {validated: true, error: false, error_message: ""};
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var is_valid = true;
        
        if (email_value.length == 0) {
            email = {validated: true, error: true, error_message: "Please type a valid email"}
            is_valid = false;
        }
        else if (!new RegExp(re).test(email_value)) {
            email = {validated: true, error: true, error_message: "Please type a valid email"}
            is_valid = false;
        }
        
        this.setState({email});
        return is_valid;
    }
    
    revalidateEmail() {
        //only validate if it was already validated once
        if (!this.state.email.validated)
            return
            
        this.validateEmail()
    }
    
    validatePassword() {
        const password_value = document.getElementById("password").value;
        var password = {validated: true, error: false, error_message: ""};
        var is_valid = true;
        
        if (password_value.length == 0) {
            password = {validated: true, error: true, error_message: "Password must be at least 6 characters long"};
            is_valid = false;
        }
        else if (password_value.length < 6) {
            password = {validated: true, error: true, error_message: "Password must be at least 6 characters long"};
            is_valid = false;
        }
        
        this.setState({password});
        return is_valid;
    }
    
    revalidatePassword() {
        //only validate if it was already validated once
        if (!this.state.password.validated)
            return
            
        this.validatePassword()
    }
    
    getIconDecorator(input_attribute) {
        if (input_attribute.validated && input_attribute.error)
            return "user-form__input-icon_error"
        else if (input_attribute.validated && !input_attribute.error)
            return "user-form__input-icon_success"
        else
            return ""
    }
    
    getBorderDecorator(input_attribute) {
        if (input_attribute.validated && input_attribute.error)
            return "user-form__input_error"
        else if (input_attribute.validated && !input_attribute.error)
            return "user-form__input_success"
        else
            return ""
    }
    
    toggleForm() {this.setState({sign_up: !this.state.sign_up})}
    
    toggleShowPassword() {this.setState({show_password: !this.state.show_password})}
    
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
        .then(function(response) {
            if (response.data.success) {
                that.props.handleUser(response.data.user)
            }
        })
        .catch(function(error) {
            const error_data = error.response.data
            
            if (error_data.culprit == "email") {
                const email = {validated: true, error: true, error_message: error_data.message}
                that.setState({email});
            }
            
            if (error_data.culprit == "password") {
                const password = {validated: true, error: true, error_message: error_data.message}
                that.setState({password});
            }
        })
    }
    
    signUp() {
        let that = this

        axios({
            method: 'POST',
            url: '/users/sign_up',
            data: {user: {
                email: document.getElementById("email").value,
                name: document.getElementById("name").value,
                password: document.getElementById("password").value,
                password_confirmation: document.getElementById("password").value //there is no 'confirm password' field (we let the user take a look at it)
            }},
            headers: {
                'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
            }
        })
        .then(function(response){
            if (response.data.success) {
                that.props.handleUser(response.data.user)
            }
        })
        .catch(function(error) {
            const error_data = error.response.data
            
            if (error_data.culprit == "name") {
                const name = {validated: true, error: true, error_message: error_data.message}
                that.setState({name});
            }
            
            if (error_data.culprit == "email") {
                const email = {validated: true, error: true, error_message: error_data.message}
                that.setState({email});
            }
            
            if (error_data.culprit == "password") {
                const password = {validated: true, error: true, error_message: error_data.message}
                that.setState({password});
            }
        })
    }
    
    handleSubmitButton() {
        const validName = this.state.sign_up ? this.validateName() : true; //name shouldn't be validated in the sign in form
        const validEmail = this.validateEmail()
        const validPassword = this.validatePassword()
        
        if (validName && validEmail && validPassword) {
            if (this.state.sign_up)
                this.signUp()
            else
                this.signIn()
        }
    }
    
    render() {
        return (
            <form className="user-form">
                <h3 className="user-form__title">{this.state.sign_up? "Sign up":"Sign in"}</h3>
                
                {this.state.sign_up && <div className="user-form__input-container">
                    <i className={`material-icons user-form__input-icon ${this.getIconDecorator(this.state.name)}`}>person</i>
                    <input className={`mdl-textfield__input user-form__input ${this.getBorderDecorator(this.state.name)}`} type="text" id="name" placeholder="Name"
                    onChange={this.revalidateName}
                    onBlur={this.validateName}/>
                    {this.state.name.error && <div className="user-form__input-error_message">{this.state.name.error_message}</div>}
                </div>}
                
                <div className="user-form__input-container">
                    <i className={`material-icons user-form__input-icon ${this.getIconDecorator(this.state.email)}`}>email</i>
                    <input className={`mdl-textfield__input user-form__input ${this.getBorderDecorator(this.state.email)}`} type="text" id="email" placeholder="Email" 
                    onChange={this.revalidateEmail}
                    onBlur={this.validateEmail}/>
                    {this.state.email.error && <div className="user-form__input-error_message">{this.state.email.error_message}</div>}
                </div>
                
                <div className="user-form__input-container">
                    <i className={`material-icons user-form__input-icon ${this.getIconDecorator(this.state.password)}`}>lock</i>
                    <input 
                        className={`mdl-textfield__input user-form__input user-form__showable_password ${this.getBorderDecorator(this.state.password)}`} 
                        type={this.state.show_password? "text":"password"} 
                        id="password" placeholder="Password"
                        onChange={this.revalidatePassword}
                        onBlur={this.validatePassword}
                    />
                    <i className={`material-icons user-form__input-icon_right ${this.getBorderDecorator(this.state.password)}`} onMouseEnter={this.toggleShowPassword} onMouseLeave={this.toggleShowPassword}>remove_red_eye</i>
                    {this.state.password.error && <div className="user-form__input-error_message">{this.state.password.error_message}</div>}
                </div>

                <button 
                    type="button" 
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored user-form__button" onClick={this.handleSubmitButton}>
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