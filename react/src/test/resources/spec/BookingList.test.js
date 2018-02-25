import React from 'react';
import ReactDOM from 'react-dom';
import BookingList from './BookingList';


it('BookingList.js test....', () => {

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
        this.bookings = [myBooking]
      });
  
      it("BookingList has table ", function() {
        var component = render({
          bookings: this.bookings ,	
          attributes: []
        });
  
        var rows = TestUtils.scryRenderedDOMComponentsWithTag( component, "tr");
        // 2 rows. 1 for header-titles and second for data in this.bookings
        expect(rows.length).toEqual(2);
      });

});