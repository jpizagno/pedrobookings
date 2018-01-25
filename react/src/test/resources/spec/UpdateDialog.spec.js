
define([
  "react",
  "jsx!UpdateDialog"
], function(
  React,
  UpdateDialog
) {
  
  var TestUtils = React.addons.TestUtils;

  var render = function(props) {
    var element = React.createElement(UpdateDialog, props);
    return TestUtils.renderIntoDocument(element);
  };

  describe("UpdateDialog.jsx test.... ", function() {

    var myManager = {name:  'manager name'};

    var myHref = { href: "http://localhost:8092/api/bookings/4" };
    var myLinks = {self: myHref};
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
        manager: myManager,
        _links: myLinks
      };
      var myBooking = {entity: myEntity};

    beforeEach(function() {
      this.booking = myBooking
    });

    it("H2 title says 'Update a booking' ", function() {
      var component = render({
        booking: this.booking ,	
        attributes: []
      });

      var h2 = TestUtils.findRenderedDOMComponentWithTag(component, "h2");
      
      expect(h2.getDOMNode().textContent).toEqual("Update a booking")
    });

  });
  
});