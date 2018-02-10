import React from 'react';
import { render } from 'react-dom';
import UserForm from '../components/user_form';

render(<UserForm/>, document.getElementById("user_form_container").appendChild(document.createElement('div')))