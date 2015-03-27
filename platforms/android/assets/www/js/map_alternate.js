var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var geocoder;

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(14.6090537, 121.02225650000003),
    disableDefaultUI: true
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directions-panel'));

}

// function jeepney() {

//   $(".searchNow").click(function() {
//     var s = document.getElementById('start').value;
//     var route_id = 2;
//     $.ajax({ 
//       type: 'GET',
//       url: 'https://jeepney.herokuapp.com/api/jeepney_routes/'+ route_id +'/',
//       dataType: 'xml',
//       success: function(xmlDoc) {
//         var $xml = $(xmlDoc);
//         $xml.find('jeepney-route').each(function() {
//           var id = $(this).find('route-id').text();
//           var signboard = $(this).find('sign-board').text();
//           var landmark = $(this).find("landmark").text();

//           $('#jeepneyTable > tbody:last').append('<tr><td>'+ signboard +'</td><td>'+ landmark +'</td></tr>');


//         });
//       }                
//     });
//   });
  
// }

function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000.
  document.getElementById("distance").innerHTML = total + " km";

  var xdistance = total;

}

function jeepney(){

  var start = document.getElementById('start').value;
  console.log(start);

  var ajax1 = $.ajax({ 
      type: 'GET',
      url: 'https://jeepney.herokuapp.com/api/routes.xml',
      dataType: 'xml',
      success: function(xmlDoc) {
        var $xml = $(xmlDoc);
        $xml.find('route').each(function() {
          var id = $(this).find('route-id').text();
          var startName = $(this).find('start-name').text();



        });
      }                
    }); 



}

function calcRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  // var start = "2nd Avenue, Taguig, Metro Manila, Philippines";
  // var end = 'Bonifacio Global City, Taguig, Metro Manila, Philippines';

  var selectedMode = document.getElementById('mode').value;

  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING,
    provideRouteAlternatives: true,
    travelMode: google.maps.TravelMode[selectedMode]
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      // computeTotalDistance(response);
      var distanceTo = response.routes[0].legs[0].distance.value / 1000;

      var reg = parseFloat('7.50');
      var dis = parseFloat('6.80');

      if (distanceTo >= 0.00 && distanceTo <= 4.90) {
        var regular = (reg);
        var discounted = (dis);
      }
      else if (distanceTo >= 5.00 && distanceTo <= 5.90) {
        var regular = (reg + parseFloat("1.50"));
        var discounted = (dis + parseFloat("1.20"));
      }
      else if(distanceTo >= 6.00 && distanceTo <= 6.90) {
        var regular = (reg + parseFloat("3.00"));
        var discounted = (dis + parseFloat("2.40"));
      }
      else if(distanceTo >= 7.00 && distanceTo <= 7.90) {
        var regular = (reg + parseFloat("4.50"));
        var discounted = (dis + parseFloat("3.60"));
      }
      else if(distanceTo >= 8.00 && distanceTo <= 8.90) {
        var regular = (reg + parseFloat("6.00"));
        var discounted = (dis + parseFloat("4.80"));
      }
      else if(distanceTo >= 9.00 && distanceTo <= 9.90) {
        var regular = (reg + parseFloat("7.50"));
        var discounted = (dis + parseFloat("6.00"));
      }
      else if(distanceTo >= 10.00 && distanceTo <= 10.90) {
        var regular = (reg + parseFloat("9.00"));
        var discounted = (dis + parseFloat("7.20"));
      }
      else if(distanceTo >= 11.00 && distanceTo <= 11.90) {
        var regular = (reg + parseFloat("10.50"));
        var discounted = (dis + parseFloat("8.40"));
      }
      else if(distanceTo >= 12.00 && distanceTo <= 12.90) {
        var regular = (reg + parseFloat("12.00"));
        var discounted = (dis + parseFloat("9.60"));
      }
      else if(distanceTo >= 13.00 && distanceTo <= 13.90) {
        var regular = (reg + parseFloat("13.50"));
        var discounted = (dis + parseFloat("10.80"));
      }
      else if(distanceTo >= 14.00 && distanceTo <= 14.90) {
        var regular = (reg + parseFloat("15.00"));
        var discounted = (dis + parseFloat("2.40"));
      }
      else if(distanceTo >= 15.00 && distanceTo <= 15.90) {
        var regular = (reg + parseFloat("16.50"));
        var discounted = (dis + parseFloat("13.20"));
      }
      else if(distanceTo >= 16.00 && distanceTo <= 16.90) {
        var regular = (reg + parseFloat("18"));
        var discounted = (dis + parseFloat("14.4"));
      }
      else if(distanceTo >= 17.00 && distanceTo <= 17.90) {
        var regular = (reg + parseFloat("19.5"));
        var discounted = (dis + parseFloat("15.6"));
      }
      else if(distanceTo >= 18.00 && distanceTo <= 18.90) {
        var regular = (reg + parseFloat("21"));
        var discounted = (dis + parseFloat("16.80"));
      }
      else if(distanceTo >= 19.00 && distanceTo <= 19.90) {
        var regular = (reg + parseFloat("22.50"));
        var discounted = (dis + parseFloat("18.00"));
      }
      else if(distanceTo >= 20.00 && distanceTo <= 20.90) {
        var regular = (reg + parseFloat("24.00"));
        var discounted = (dis + parseFloat("19.20"));
      }
      else{
        var regular = (reg + parseFloat("25.00"));
        var discounted = (dis + parseFloat("20.00"));
      }
  
      $(".totalkm").text(distanceTo);
      $(".regFare").text(regular);
      $(".disFare").text(discounted);




      $("#startingVoice").val("Searching " + start + " to " + end);
      responsiveVoice.speak($('#startingVoice').val(),$('#voiceselection').val());

      var department = start.split(',')[0];
      var destination = end.split(',')[0];
      $("#result").text(department + " - " + destination);

      var ajax1 = $.ajax({ 
        type: 'GET',
        url: 'https://jeepney.herokuapp.com/api/jeepney_routes/'+ 2 +'/',
        dataType: 'xml',
        success: function(xmlDoc) {
          var $xml = $(xmlDoc);
          $xml.find('jeepney-route').each(function() {
            var id = $(this).find('route-id').text();
            var signboard = $(this).find('sign-board').text();
            var landmark = $(this).find("landmark").text();

            $('#jeepneyTable > tbody:last').append('<tr><td>'+ signboard +'</td><td>'+ landmark +'</td></tr>');


          });
        }                
      }); 

    }
  });
}

// ============ Added
function coordinates() {
  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById('start').value;
  var address_1 = document.getElementById('end').value;

  var locations = [[address],[address_1]];

  for (i = 0; i < locations.length; i++) {
    geocoder.geocode( { 'address': locations[i][0]}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();

          var latitude_1 = results[1].geometry.location.lat();
          var longitude_1 = results[1].geometry.location.lng();

          $("#address_lat1").text(latitude);
          $("#address_long1").text(longitude);

          $("#address_lat2").text(latitude_1);
          $("#address_long2").text(longitude_1);
      }
    })
  }

}




google.maps.event.addDomListener(window, 'load', initialize);


$(window).load(function(){ 
  calcRoute();
});