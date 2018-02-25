
import React from 'react';
import ReactDOM from 'react-dom';
import Booking from './Booking';

it('Booking.js test....', () => {

  var myManager = {name:  'manager name'};

  var myHref = { href: "http://localhost:8092/api/bookings/4" };
  var myLinks = {self: myHref};
  var myEntity = {
      kreuzfahrt: 100	,						
      flug:  100 , 
      hotel:  100 , 
      versicherung:  100 , 
      total:  100 , 
      dayDeparture:  1 ,  
      monthDeparture:  12 , 
      yearDeparture:  1900 , 
      surname:  'test' , 
      firstName:  'first' , 
      bookingNumber:  'abcd' , 	
      storno:  0 , 
      comment:  'comment' , 
      bookingDate :  '2018-01-14', 
      manager: myManager,
      _links: myLinks
    };
    var myBooking = {entity: myEntity};

  beforeEach(function() {
    this.text = "Test 123456",
    this.booking = myBooking
  });

  it("Booking Button says 'Delete' ", function() {
    var component = render({
      text: this.text , 
      booking: this.booking ,	
      attributes: []
    });

    var button = TestUtils.findRenderedDOMComponentWithClass(component, "btn btn-delete btn3d");

    expect(button.getDOMNode().textContent).toEqual("Delete");
  });

});
  