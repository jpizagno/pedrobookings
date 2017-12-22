import React from 'react';
import ReactDOM from 'react-dom';
import BookingList from './BookingList.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BookingList />, div);
});
