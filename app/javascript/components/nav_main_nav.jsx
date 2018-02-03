import React from 'react'
import axios from 'axios'

import SiteLinks from './nav_site_links'
import UserControl from './nav_user_control'

export default class MainNav extends React.Component {
    constructor() {
        super();
        
        this.state = {
            user: null,
            loggedIn: false
        }
    }
    
    componentDidMount() {
        let that = this
        axios({
            method: 'GET',
            url: '/users/get_current_user',
            headers: {
                'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
            }
        })
        .then(function(response){
            if (response.data.user) {
                that.setState({
                    user: response.data.user,
                    loggedIn: true
                })
            }
            else {
                that.setState({
                    user: null,
                    loggedIn: false
                })
            }
        })
    }
    
    signOut() {
        let that = this
        
        axios({
            method: 'GET',
            url: '/users/sign_out',
            headers: {
                'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
            }
        })
        .then(function(response){
            console.log("mainlogout")
            that.setState({
                user: null,
                loggedIn: false
            })
            console.log("postlogout")
        })
    }
    
    render() {
        return (
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title home">Traveasy</span>
                    
                    <div className="mdl-layout-spacer"></div>
                    
                    {/*Hide links in small screens and show the drawer menu instead*/}
                    <nav className="mdl-layout--large-screen-only">
                        <SiteLinks loggedIn = {this.state.loggedIn}/>
                    </nav>
                    
                    <UserControl loggedIn = {this.state.loggedIn} user = {this.state.user} logout = {this.signOut}/>
                    
                </div>
            </header>
        );
    }
}