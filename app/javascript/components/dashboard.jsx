import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import MainNav from '../components/nav_main_nav';
import ChecklistIndex from '../components/checklist_index';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="mdl-layout mdl-layout--no-desktop-drawer-button mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
                <MainNav user={this.props.user} handleLogout={this.props.handleLogout}/>
                <ChecklistIndex/>
            </div>
        );
    }
}

Dashboard.propTypes = {}