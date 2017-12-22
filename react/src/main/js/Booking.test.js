import React from 'react';
import ReactDOM from 'react-dom';
import Booking from './Booking.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Booking />, div);
});
