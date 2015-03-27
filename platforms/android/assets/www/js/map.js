var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

var map,
    currentPositionMarker,
    mapCenter = new google.maps.LatLng(14.6090537, 121.02225650000003),
    map;

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

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'You'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
  
}

// // Current Location
// function locError(error) {
//     // the current position could not be located
//     alert("The current position could not be found!");
// }

// function setCurrentPosition(pos) {
//     currentPositionMarker = new google.maps.Marker({
//         map: map,
//         position: new google.maps.LatLng(
//             pos.coords.latitude,
//             pos.coords.longitude
//         ),
//         title: "Current Position"
//     });
//     map.panTo(new google.maps.LatLng(
//             pos.coords.latitude,
//             pos.coords.longitude
//         ));
// }

// function displayAndWatch(position) {
//     // set current position
//     setCurrentPosition(position);
//     // watch position
//     watchCurrentPosition();
// }

// function watchCurrentPosition() {
//     var positionTimer = navigator.geolocation.watchPosition(
//         function (position) {
//             setMarkerPosition(
//                 currentPositionMarker,
//                 position
//             );
//         });
// }

// function setMarkerPosition(marker, position) {
//     marker.setPosition(
//         new google.maps.LatLng(
//             position.coords.latitude,
//             position.coords.longitude)
//     );
// }

// function initLocationProcedure() {
//     initialize();
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
//     } else {
//         alert("Your browser does not support the Geolocation API");
//     }
// }


// // ///  Current Location

function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
    $("#distance").val(total);
  }
}

function calcRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  // var start = "2nd Avenue, Taguig, Metro Manila, Philippines";
  // var end = 'Bonifacio Global City, Taguig, Metro Manila, Philippines';
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING,
    provideRouteAlternatives: true
  };

  

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      computeTotalDistance(response);
    }
  });
}

// ============ Added for nearby resto




google.maps.event.addDomListener(window, 'load', initialize);

function audioPlay() {
  responsiveVoice.speak($('#startingVoice').val(),$('#voiceselection').val());
}

$(window).load(function(){ 
  calcRoute();
  audioPlay();
  // initLocationProcedure();
});