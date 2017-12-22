import React from 'react';
import ReactDOM from 'react-dom';
import UpdateDialog from './UpdateDialog.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UpdateDialog />, div);
});
