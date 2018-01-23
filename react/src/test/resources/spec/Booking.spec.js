
define([
  "react",
  "jsx!Booking"
], function(
  React,
  Booking
) {
  
  var TestUtils = React.addons.TestUtils;

  var render = function(props) {
    var element = React.createElement(Booking, props);
    return TestUtils.renderIntoDocument(element);
  };

  describe("Booking.jsx test.... ", function() {

    var myManager = {name:  'manager name'};

    var myEntity = {
        kreuzfahrt: 100	,						
        flug:  100 , 
        hotel:  100 , 
        versicherung:  100 , 
        total:  100 , 
        dayDeparture:  01 ,  
        monthDeparture:  12 , 
        yearDeparture:  1900 , 
        surname:  'test' , 
        firstName:  'first' , 
        bookingNumber:  'abcd' , 	
        storno:  0 , 
        comment:  'comment' , 
        bookingDate :  '2018-01-14', 
        manager: myManager
      };

      var myBooking = {entity: myEntity};

    beforeEach(function() {
      this.text = "Test 123456",
      this.booking = myBooking
    });

    it("Booking Button says 'Delete' ", function() {
      var component = render({
        text: this.text , 
        booking: this.booking							
      });

      var button = TestUtils.findRenderedDOMComponentWithTag(component, "button");

      expect(button.getDOMNode().textContent).toEqual("Delete");
    });

  });
  
});