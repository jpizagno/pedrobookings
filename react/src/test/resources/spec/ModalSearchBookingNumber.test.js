import React from 'react';
import ReactDOM from 'react-dom';
import ModalSearchBookingNumber from './ModalSearchBookingNumber';

it('ModalSearchBookingNumber.js test....', () => {

  it("ModalSearchBookingNumber SearchText says 'booking number' ", function() {
    var component = render({
      modalFilterBookingNumber : true
    });

    var textBox = TestUtils.findRenderedDOMComponentWithClass(component, "booking_numeber_id");

    expect(textBox.getDOMNode().textContent).toEqual("booking number");
  });

});
  