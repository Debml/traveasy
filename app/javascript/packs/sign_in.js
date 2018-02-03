import React from 'react';
import { render } from 'react-dom';
import SignIn from '../components/user_sign_in';

render(<SignIn/>, document.getElementById("sign_in_form_container").appendChild(document.createElement('div')))