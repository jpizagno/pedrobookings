
function bookThisCruise() {
    var kreuzfahrt = $("#kreuzfahrt").val();  
    var flug = $("#flug").val();  
    var hotel = $("#hotel").val();        
    var versicherung = $("#versicherung").val();
    var total = kreuzfahrt*0.035 + flug*0.015 + hotel*0.015 + versicherung*0.015 ;
    var dayDeparture = $("#dayDeparture").val();
    var monthDeparture = $("#monthDeparture").val(); 
    var yearDeparture = $("#yearDeparture").val(); 
    var surname = $("#surname").val();     
    var firstname = $("#firstname").val();
    var bookingnumber = $("#bookingnumber").val();
    var storno = $("#storno").val(); 
    var bookingdate = $("#bookingdate").val(); 
    
    if (bookingdate.split("/").length >  1) {
        // user entered as DD/MM/YYYY
        var dateFields = bookingdate.split("/"); 
        var DD = dateFields[0];
        var MM = dateFields[1];
        var YYYY = dateFields[2];
        var bookingdate =  YYYY.concat("-",MM,"-",DD); // format YYYY-MM-DD
    }

   var myData={"kreuzfahrt":kreuzfahrt,"flug":flug,"hotel":hotel,"versicherung":versicherung,"total":total,"day_departure":dayDeparture,"month_departure":monthDeparture,"year_departure":yearDeparture,"surname":surname,"first_name":firstname,"booking_number":bookingnumber,"storno":storno,"booking_date":bookingdate};
     $.ajax({
        url : "insert_data.php",
        type: "POST",
        data : myData,
        success: function(data,status,xhr)
         {
            alert("inserted data");
         }
     });  
};

function getTotal() {
    var month = $("#month").val(); 
    var year = $("#year").val(); 

    
    var myData={"month":month,"year":year};

    $.ajax({
        url : "month_report.php",
        type: "POST",
        data : myData,
        dataType: 'json',
        success: function(data,status,xhr)
         {
             var total = data['total'];
             $("#total_report").val('total = '.concat(total,' Euro')); 
         }
     }); 
     
} ;

function login() {
    var user = $("#inputUser").val(); 
    var password = $("#inputPassword").val(); 
    
    var myData={"username":user,"password":password};
     $.ajax({
        url : "login.php",
        type: "POST",
        data : myData,
        success: function(data) {
            alert("ok");
         },
         error: function (data) {
            alert("login not correct");
            }
     }); 
};

function newbooking_ready() {    
    
    var dataTable = $('#dataTable').DataTable( {
            "processing": true,
            "serverSide": true,
            "ajax":{
                    url :"server-response.php", // json datasource
                    type: "post",  // method  , by default get
            }
    } );
    
    <!-- for selecting a row -->
    $('#dataTable tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            dataTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
    $('#deleteSelectedBooking').click( function () {
        //var $name = dataTable.row('.selected').data()[10];
        //alert($name);

        var bookingnumber = dataTable.row('.selected').data()[10];
        var kreuzfahrt = dataTable.row('.selected').data()[0];  

        myData = {"kreuzfahrt":kreuzfahrt,"booking_number":bookingnumber};
        $.ajax({
            url : "delete_data.php",
            type: "POST",
            data : myData,
            success: function(data,status,xhr)
             {
                alert("deleted booking");
             }
        }); 

        dataTable.row('.selected').remove().draw( false );

    } );

    <!-- unstorno a booking. i.e. set storno=0 -->
    $('#unStornoBooking').click( function () {
        var bookingnumber = dataTable.row('.selected').data()[10];
            var kreuzfahrt = dataTable.row('.selected').data()[0];  

            myData = {"kreuzfahrt":kreuzfahrt,"booking_number":bookingnumber,"storno":0};
            $.ajax({
                url : "storno.php",
                type: "POST",
                data : myData,
                success: function(data,status,xhr)
                 {
                    alert("UN storno booking");
                 }
            }); 

            dataTable.row('.selected').remove().draw( false );
    });

    <!-- storno a booking set storno=1 -->
    $('#stornoBooking').click( function () {
        var bookingnumber = dataTable.row('.selected').data()[10];
            var kreuzfahrt = dataTable.row('.selected').data()[0];  

            myData = {"kreuzfahrt":kreuzfahrt,"booking_number":bookingnumber,"storno":1};
            $.ajax({
                url : "storno.php",
                type: "POST",
                data : myData,
                success: function(data,status,xhr)
                 {
                    alert("storno booking");
                 }
            }); 

            dataTable.row('.selected').remove().draw( false );
    });

    <!-- clear all fields -->
    $('#clearFields').click( function () {
        $("#kreuzfahrt").val(''); 
        $("#flug").val('');  
        $("#hotel").val('');        
        $("#versicherung").val('');
        $("#total").val(''); 
        $("#dayDeparture").val('');
        $("#monthDeparture").val(''); 
        $("#yearDeparture").val(''); 
        $("#surname").val('');     
        $("#firstname").val('');
        $("#bookingnumber").val('');
        $("#storno").val(''); 
        $("#bookingdate").val('');

    });


    <!-- removes the default search textinput -->
    $("#dataTable_filter").css("display","none");

    $('.search-input-text').on( 'keyup click', function () {   // for text boxes
        var i =$(this).attr('data-column');  // getting column index
        var v =$(this).val();  // getting search input value
        dataTable.columns(i).search(v).draw();
    } );
    $('.search-input-select').on( 'change', function () {   // for select box
        var i =$(this).attr('data-column');
        var v =$(this).val();
        dataTable.columns(i).search(v).draw();
    } );
};
    
function report_ready() {
    var dataTable = $('#example').DataTable( {
            "processing": true,
            "serverSide": true,
            "ajax":{
                    url :"server-response.php", // json datasource
                    type: "post",  // method  , by default get
            }
    } );

    <!-- removes the default search textinput -->
    $("#example_filter").css("display","none");

    $('.search-input-text').on( 'keyup click', function () {   // for text boxes
        var i =$(this).attr('data-column');  // getting column index
        var v =$(this).val();  // getting search input value
        dataTable.columns(i).search(v).draw();
    } );
    $('.search-input-select').on( 'change', function () {   // for select box
        var i =$(this).attr('data-column');
        var v =$(this).val();
        dataTable.columns(i).search(v).draw();
    } );

};
    
function makePdf() {
    var month = $("#month").val(); 
    var year = $("#year").val(); 
    var filename = $("#filename").val(); 

    var myData={"month":month,"year":year,"filename":filename};

    $.ajax({
        url : "make_report.php",
        type: "POST",
        data : myData,
        success: function(data,status,xhr)
         {
             var message = "made report for month=".concat(month," year=",year," filename=",filename);
             alert(message);
             alert(data);
         }
     }); 
};