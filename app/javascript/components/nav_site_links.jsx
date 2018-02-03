import React from 'react'

export default class SiteLinks extends React.Component {
    render() {
        return (
            !this.props.loggedIn ? 
            (
                <nav className="mdl-navigation">
                    <a className="mdl-navigation__link" href="about.php">About Us</a>
                    <a className="mdl-navigation__link" href="contact.php">Contact Us</a>
                    <a className="mdl-navigation__link" href="/users/sign_up">Sign Up</a>
                    <a className="mdl-navigation__link" href="/users/sign_in">Login</a> 
                </nav>

            ) : (
                <nav className="mdl-navigation">
                    <a className="mdl-navigation__link" href="checklists.php">My Checklists</a>
                    <a className="mdl-navigation__link" href="trips.php">My Trips</a>
                    <a className="mdl-navigation__link" href="about.php">About</a>
                    <a className="mdl-navigation__link" href="contact.php">Contact Us</a>
                </nav>
            )
        );
    }
}