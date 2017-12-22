import React from 'react';
import ReactDOM from 'react-dom';
import CreateDialog from './CreateDialog.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateDialog />, div);
});
