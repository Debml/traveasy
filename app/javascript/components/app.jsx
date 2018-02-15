import React from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import axios from 'axios'

import UserForm from '../components/user_form';
import Dashboard from '../components/dashboard'

export default class App extends React.Component {
    constructor() {
        super();
        
        this.state = {
            user: null,
            loggedIn: false,
            processing: false
        }
        
        this.setUser = this.setUser.bind(this);
        this.checkUser = this.checkUser.bind(this);
    }
    
    componentWillMount() {
        this.setState({processing: true}, this.checkUser())
    }
    
    setUser(user) {
        if (user) {
            this.setState({
                user: user,
                loggedIn: true,
                processing: false
            })
        }
        else {
            this.setState({
                user: null,
                loggedIn: false,
                processing: false
            })
        }
    }
    
    checkUser() {
        let that = this;
        
        axios({
            method: 'GET',
            url: '/users/get_current_user',
            headers: {
                'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
            }
        })
        .then(function(response){
            that.setUser(response.data.user)
        })
    }
    
    render() {
        return (
            !this.state.processing && 
            <Switch>
                <Route exact path="/" render={() => (this.state.loggedIn ? <Redirect to="/dashboard"/> : <UserForm handleUser={this.setUser}/>)}/>
                <Route exact path="/dashboard" render={() => (this.state.loggedIn ? <Dashboard user={this.state.user} handleLogout={this.setUser}/> : <Redirect to="/"/>)}/>
                <Route render={() => <Redirect to="/"/>} />
            </Switch>
        );
    }
}