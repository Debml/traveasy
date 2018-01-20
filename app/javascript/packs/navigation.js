import React from 'react';
import { render } from 'react-dom';
import MainNav from '../components/nav_main_nav';

render(<MainNav loggedIn = {false}/>, document.body.appendChild(document.createElement('div')))