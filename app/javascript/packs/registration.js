import React from 'react';
import { render } from 'react-dom';
import Registration from '../components/user_registration';

render(<Registration/>, document.getElementById("registration_form_container").appendChild(document.createElement('div')))