import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SignIn from '../components/user_sign_in';

storiesOf('SignIn', module)
  .add('with text', () => (
    <SignIn></SignIn>
  )); 