import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ChecklistDetailedView from '../components/checklist_detailed_view';

storiesOf('ChecklistDetailedView', module)
  .add('Test', () => (
    <ChecklistDetailedView></ChecklistDetailedView>
  )); 