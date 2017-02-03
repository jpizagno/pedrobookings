
function fileExists(file_url){
    var http = new XMLHttpRequest();
    http.open('HEAD', file_url, false);
    http.send();
    return http.status != 404;
};

function fetchHeader(url, wch) {
    try {
        var req=new XMLHttpRequest();
        req.open("HEAD", url, false);
        req.send(null);
        if(req.status== 200){
            return req.getResponseHeader(wch);
        }
        else return false;
    } catch(er) {
        return er.message;
    }
}

function index_ready() {
    var modifiedDateText = fetchHeader('login.txt','Last-Modified');
    var modifiedDate = new Date(modifiedDateText) ;
    var modifiedMiliseconds = modifiedDate.getTime();
    
    var currentTimeMiliseconds = Date.now();
    
    var fileAgeSeconds = (currentTimeMiliseconds - modifiedMiliseconds) / 1000. ;
    
    var fileSizeBytes = fetchHeader('login.txt','Content-Length'); //
    
    // if file not there issue alerd(error contact jim)
    if (fileExists('login.txt') == false) {
        alert("ERROR login file not there.  email Jim");
    } else {
         // else if file older than 10 minutes write not logged in
        if (fileAgeSeconds > 3600.) {
            alert("login too old.");
            $("#loginMessage").val('Login Data too old (1 hour).  You are NOT logged in. Please login again.'); 
        } else {
            if (fileSizeBytes > 5) {
                //  but not OK, then write not logged in
                alert("NOT logged in");
                $("#loginMessage").val('You are NOT logged in.');
            } else {
                //  but OK, then write logged in 
                alert("logged in");
                $("#loginMessage").val('You are logged in for 1 hour.');
            }   
        }   
    }
} ;

function bit_set(num, bitpos) {
    return num | 1<<bitpos;
};

function numberRegExpCheck(field, value, flagBit, bitpos) {
    if (value.length == 0 ){
        return flagBit ;
    } else {
        var regNumber = new RegExp('[-+]?[0-9]*\.?[0-9]+');
        if (regNumber.test(value) == false) {
            alert(field.concat(" wrong:  '",value,"' .will not insert data."));
            return bit_set(flagBit, bitpos) ;
        } else {
            return flagBit ;
        }
    }
};

function stringChecker(field, value, flagBit, bitpos) {
    try {
        var myInt = parseInt(value);
        if (field=="departure day" && myInt >= 1 && myInt <= 31) {
            return flagBit ;
        } else if (field=="departure month" && myInt >= 1 && myInt <= 12) {
            return flagBit ;
        } else if (field=="departure year" && myInt >= 1900 && myInt <= 3000) {
            return flagBit ;
        } else if (field=="storno" && (myInt==1 || myInt==0) ) {
            return flagBit ;
        } else {
            alert(field.concat(" wrong:  '",value,"' .will not insert data."));
            return bit_set(flagBit, bitpos) ;
        }
    } catch(err) {
        alert(field.concat(" wrong:  '",value,"' .will not insert data."));
        return bit_set(flagBit, bitpos) ;
    }
};

function bookingdateChecker (field, value, flagBit, bitpos) {
    if ( value.length == 0 ) {
        alert(field.concat(" field is empty. will not insert data."));
        return bit_set(flagBit, bitpos) ;
    } else {
        if (value.match(new RegExp("/", 'g')).length == 2 || value.match(new RegExp("-", 'g')).length == 2) {
            return flagBit ;
        } else {
            alert(field.concat(" wrong:  '",value,"' .will not insert data."));
            return bit_set(flagBit, bitpos) ;
        }
    }
} ;

function bookThisCruise() {
    
    var flagBit = 0;
    
    var kreuzfahrt = $("#kreuzfahrt").val();  
    flagBit = numberRegExpCheck("kreuzfahrt",kreuzfahrt, flagBit, 0);
            
    var flug = $("#flug").val();  
    flagBit = numberRegExpCheck("flug",flug, flagBit, 1);
    
    var hotel = $("#hotel").val();        
    flagBit = numberRegExpCheck("hotel",hotel, flagBit, 2);
    
    var versicherung = $("#versicherung").val();
    flagBit = numberRegExpCheck("versicherung",versicherung, flagBit, 3);
    
    var total = kreuzfahrt*0.035 + flug*0.015 + hotel*0.015 + versicherung*0.015 ;
    
    var dayDeparture = $("#dayDeparture").val();
    flagBit = stringChecker("departure day",dayDeparture, flagBit, 4);
    
    var monthDeparture = $("#monthDeparture").val(); 
    flagBit = stringChecker("departure month",monthDeparture, flagBit, 5);
    
    var yearDeparture = $("#yearDeparture").val(); 
    flagBit = stringChecker("departure year",yearDeparture, flagBit, 6);
    
    var surname = $("#surname").val();     
    var firstname = $("#firstname").val();
    var bookingnumber = $("#bookingnumber").val();
    
    var storno = $("#storno").val(); 
    flagBit = stringChecker("storno",storno, flagBit, 7);
    
    var bookingdate = $("#bookingdate").val(); 
    flagBit = bookingdateChecker("bookingdate",bookingdate, flagBit, 8);
    
    if (bookingdate.split("/").length >  1) {
        // user entered as DD/MM/YYYY
        var dateFields = bookingdate.split("/"); 
        var DD = dateFields[0];
        var MM = dateFields[1];
        var YYYY = dateFields[2];
        var bookingdate =  YYYY.concat("-",MM,"-",DD); // format YYYY-MM-DD
    }

    if (flagBit==0) {
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
    }
};

function getTotal() {
    var month = $("#month_total").val(); 
    var year = $("#year_total").val(); 

    
    var myData={"month":month,"year":year};

    $.ajax({
        url : "month_report.php",
        type: "POST",
        data : myData,
        dataType: 'json',
        success: function(data,status,xhr)
         {
             var total = data['total'];
             //$("#total_report").val('total = '.concat(total,' Euro')); 
             
             $("#totalParagraph").val('total = '.concat(total,' Euro')); 
             
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
            $("#loginMessage").val('You are now logged in.'); 
         },
         error: function (data) {
            $("#loginMessage").val('You are not logged in.'); 
        }
     }); 
};

function newbooking_ready() {    
    
    var dataTable = $('#dataTable').DataTable( {
            "processing": true,
            "serverSide": true,
            "ajax":{
                    url :"server-response.php", 
                    type: "post",  
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
    var month = $("#month_report").val(); 
    var year = $("#year_report").val(); 
    var filename = "report.pdf"; 

    var myData={"month":month,"year":year,"filename":filename};

    $.ajax({
        url : "make_report.php",
        type: "POST",
        data : myData,
        success: function(data,status,xhr)
         {
            var message = "made report for month=".concat(month," year=",year," filename=",filename);
            alert(message);
         }, 
        error: function(data,status,xhr) {
            alert("data:  ".concat(data));
            alert("status: ".concat(status));
            alert("xhr: ".concat(xhr));
        }
     }); 
};