var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var geocoder;
var startLocation = null;
var endLocation = null;
var gmarkers = [];
var map;

var watchID;
var geoLoc;

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplayOld = new google.maps.DirectionsRenderer();
    var myLatlng = new google.maps.LatLng(14.6090537, 121.02225650000003);
    // var myOptions = {
    //     zoom: 15,
    //     center: myLatlng,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // }
    var myOptions = {
      zoom: 15,
      center: myLatlng,
      disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));
    directionsDisplayOld.setPanel(document.getElementById('directions-panel-old'));
    
    var polyline_customized = document.getElementById('polyline').value;
    var level_customized = document.getElementById('level').value;
    
    var decodedPath = google.maps.geometry.encoding.decodePath(polyline_customized); 
    var decodedLevels = decodeLevels(level_customized);

    var setRegion = new google.maps.Polyline({
        path: decodedPath,
        levels: decodedLevels,
        strokeColor: "#0000",
        strokeOpacity: 1.0,
        strokeWeight: 3,
        map: map
    });


    var start_location_name = document.getElementById('start').value;
    var end_location_name = document.getElementById('end').value;
    var marker_lang1 = document.getElementById('address_lat1').value;
    var marker_long1 = document.getElementById('address_long1').value;
    var marker_lang2 = document.getElementById('address_lat2').value;
    var marker_long2 = document.getElementById('address_long2').value;

    var locations = [
      ['<b>End</b>: '+ end_location_name + '<br>' + '( '+ marker_lang2 +','+marker_lang2 +' )', marker_lang2, marker_long2, 2],
      ['<b>Start</b>: '+ start_location_name + '<br>' + '( '+ marker_lang1 +','+marker_lang1 +' )', marker_lang1, marker_long1, 1]
    ];
    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
    map.setCenter(marker.getPosition());
    // // =============== Marker Start
    // var start_location_name = document.getElementById('start').value;
    // var end_location_name = document.getElementById('end').value;

    // var marker_lang1 = document.getElementById('address_lat1').value;
    // var marker_long1 = document.getElementById('address_long1').value;
    // var marker_lang2 = document.getElementById('address_lat2').value;
    // var marker_long2 = document.getElementById('address_long2').value;

    // var markerA = new google.maps.LatLng(marker_lang1, marker_long1);

    // var marker = new google.maps.Marker({
    //   position: markerA,
    //   map: map
    // });

    // map.setCenter(marker.getPosition());

    // var xstart = document.getElementById('start').value;
    // var infowindow = new google.maps.InfoWindow({
    //   content: "<b>Start:</b> <br>"+ xstart
    // });

    // google.maps.event.addListener(marker, 'click', function() {
    //   infowindow.open(map,marker);
    // });

    segment();


}



function decodeLevels(encodedLevelsString) {
    var decodedLevels = [];

    for (var i = 0; i < encodedLevelsString.length; ++i) {
        var level = encodedLevelsString.charCodeAt(i) - 63;
        decodedLevels.push(level);
    }
    return decodedLevels;
}

function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;

    var km = (total/1000);
    $(".distancebox").val(km);


  // if(x<=4){
  //   var regular = reg;
  //   var discount = dis;
  // }else if(x>=5){
  //   var regular = (reg + 1.50);
  //   var discount = (dis + 1.20);
  // }else if(x>=6){
  //   var regular = (reg + 3.00);
  //   var discount = (dis + 2.40);
  // }else if(x>=7){
  //   var regular = (reg + 4.50);
  //   var discount = (dis + 3.60);
  // } else if(x>=8){
  //   var regular = (reg + 6.00);
  //   var discount = (dis + 4.80);
  // } else if(x >=9){
  //   var regular = (reg + 7.50);
  //   var discount = (dis + 6.00);
  // }else if (x>=10){
  //   var regular = (reg + 9.00);
  //   var discount = (dis + 7.20);
  // } else if(x>=11){
  //   var regular = (reg + 10.50);
  //   var discount = (dis + 8.40);
  // } else if (x>=12){
  //   var regular = (reg + 12.00);
  //   var discount = (dis + 9.60);
  // }
  // else{
  //   var regular = 15.00;
  //   var discount = 13.00;
  // }

    $("#fares-panel-one").append('<table class="table tabled-hover">'+
      '<tr><th>Regular Fare<th><td>'+ regular +' php</td></tr>'+
      '<tr><th>Discounted Fare<th><td>'+ discount +' php</td></tr>'+
      '</table>');

  }
}

function calcRoute() {
  // var start = document.getElementById('start').value;
  // var end = document.getElementById('end').value;
  // var request = {
  //   origin: start,
  //   destination: end,
  //   travelMode: google.maps.TravelMode.DRIVING,
  //   provideRouteAlternatives: true
  // };
}

// Added ===============
function searchLocation(){
  $(".newSearch").removeClass("hidden");

  var newStart = document.getElementById('newStart').value;
  var newEnd = document.getElementById('newEnd').value;

  $(".startNewPoint").text(newStart);
  $(".endNewPoint").text(newEnd);

  var request = {
      origin:newStart,
      destination:newEnd,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      // computeTotalDistance(response);

      var distanceTo = response.routes[0].legs[0].distance.value / 1000;

      // FARE COMPUTATION ==============

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

      // FARE COMPUTATION ==============

      // For Segment Result
      var bounds = new google.maps.LatLngBounds();
      var route = response.routes[0];
      startLocation = new Object();
      endLocation = new Object();

      var summaryPanel = document.getElementById("segment-panel");
      var detailsPanel = document.getElementById("segment-summary-panel");
      summaryPanel.innerHTML = "";
      detailsPanel.innerHTML = '<ul class="list-group">';

        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += "<b>Route Segment: " + routeSegment + "</b><br />";
          summaryPanel.innerHTML += route.legs[i].start_address + " to ";
          summaryPanel.innerHTML += route.legs[i].end_address + "<br />";
          summaryPanel.innerHTML += route.legs[i].distance.text + "<br /><br />";
        }

        var path = response.routes[0].overview_path;
        var legs = response.routes[0].legs;

        for (i=0;i<legs.length;i++) {
          if (i == 0) { 
            startLocation.latlng = legs[i].start_location;
            startLocation.address = legs[i].start_address;
            //createMarker(legs[i].start_location,"start",legs[i].start_address,"green");
          }
          endLocation.latlng = legs[i].end_location;
          endLocation.address = legs[i].end_address;
          var steps = legs[i].steps;

          for (j=0;j<steps.length;j++) {
            var nextSegment = steps[j].path;
            detailsPanel.innerHTML += "<li class='list-group-item active'>"+steps[j].instructions;
            var dist_dur = "";
            if (steps[j].distance && steps[j].distance.text) dist_dur += "&nbsp;"+steps[j].distance.text;
            if (steps[j].duration && steps[j].duration.text) dist_dur += "&nbsp;"+steps[j].duration.text;
            if (dist_dur != "") {
              detailsPanel.innerHTML += "("+dist_dur+")<br /></li>";
            } else {
              detailsPanel.innerHTML += "</li>";
            }
            for (k=0;k<nextSegment.length;k++) {
              
              bounds.extend(nextSegment[k]);
            }
          }
        }
        detailsPanel.innerHTML += "</ul>"
    }
  });

}

function segment(){
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplayOld.setDirections(response);
      computeTotalDistance(response);

      // For Segment Result
      var bounds = new google.maps.LatLngBounds();
      var route = response.routes[0];
      startLocation = new Object();
      endLocation = new Object();

      var summaryPanel = document.getElementById("segment-panel-old");
      var detailsPanel = document.getElementById("segment-summary-panel-old");
      summaryPanel.innerHTML = "";
      detailsPanel.innerHTML = '<ul class="list-group">';

        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += "<b>Route Segment: " + routeSegment + "</b><br />";
          summaryPanel.innerHTML += route.legs[i].start_address + " to ";
          summaryPanel.innerHTML += route.legs[i].end_address + "<br />";
          summaryPanel.innerHTML += route.legs[i].distance.text + "<br /><br />";
        }

        var path = response.routes[0].overview_path;
        var legs = response.routes[0].legs;

        for (i=0;i<legs.length;i++) {
          if (i == 0) { 
            startLocation.latlng = legs[i].start_location;
            startLocation.address = legs[i].start_address;
            //createMarker(legs[i].start_location,"start",legs[i].start_address,"green");
          }
          endLocation.latlng = legs[i].end_location;
          endLocation.address = legs[i].end_address;
          var steps = legs[i].steps;

          for (j=0;j<steps.length;j++) {
            var nextSegment = steps[j].path;
            detailsPanel.innerHTML += "<li class='list-group-item active'>"+steps[j].instructions;
            var dist_dur = "";
            if (steps[j].distance && steps[j].distance.text) dist_dur += "&nbsp;"+steps[j].distance.text;
            if (steps[j].duration && steps[j].duration.text) dist_dur += "&nbsp;"+steps[j].duration.text;
            if (dist_dur != "") {
              detailsPanel.innerHTML += "("+dist_dur+")<br /></li>";
            } else {
              detailsPanel.innerHTML += "</li>";
            }
            for (k=0;k<nextSegment.length;k++) {
              
              bounds.extend(nextSegment[k]);
            }
          }
        }
        detailsPanel.innerHTML += "</ul>"
    }
  });

}

google.maps.event.addDomListener(window, 'load', initialize);

$(window).load(function(){ 
  // calcRoute();
});