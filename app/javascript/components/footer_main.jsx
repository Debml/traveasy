import React from 'react'

export default class MainFooter extends React.Component {
    render() {
        return (
            <footer className="mdl-mini-footer footer">
                <div className="mdl-mini-footer__left-section">
                    <div className="mdl-logo">Traveasy</div>
                    <ul className="mdl-mini-footer__link-list">
                        <li><a href="index.php">Home</a></li>
                        <li><a href="about.php">About Us</a></li>
                        <li><a href="contact.php">Contact Us</a></li>
                    </ul>
                </div>
            </footer>
        );
    }
}