function initMap() {
  var myOptions = {
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: {
      lat: 8.505698,
      lng: 76.902494
    }
  };
  map = new google.maps.Map(document.getElementById("map"), myOptions);
  var start = "Kaniyapuram Bus Stand, Salem - Kochi Highway, Kaniyapuram, Kerala";
  var end = "KSRTC Central Bus Station, Opposite Thiruvananthapuram Central Railway Station, Salem - Kochi Hwy, Thampanoor, Thiruvananthapuram, Kerala 695014";
  var method = 'DRIVING';
  drawRoute(start, end, method,animate = true ,color = '#2196F3') // if color variable not passed, defaults to preset color

  // Repeat the following lines to draw multiple routes on map.
  var start = "Trivandrum International Airport";
  var end = "Aazhimala Siva Temple";
  var method = 'DRIVING';
  drawRoute(start, end, method,animate = false) // pass animate = false to animate dotted line
}

function drawRoute(start, end, method, animate = true,color = '#e53935') {
  var directionsService = new google.maps.DirectionsService();
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.DirectionsTravelMode[method]
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      var lineSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 1,
        scale: 3
      };

      var newSymb = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: '#e53935'
      };

      var routePath = new google.maps.Polyline({
        path: response.routes[0].overview_path,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 0,
        fillOpacity: 0,
        icons: [{
          icon: lineSymbol,
          offset: '0',
          repeat: '10px'
        }],
      });
      if (animate) {
        animateLine(routePath);
      }
      routePath.setMap(map);
      var marker = new google.maps.Marker({
        position: response.routes[0].overview_path[0],
        map: map,
        title: 'Hello World!'
      });


      var marker = new google.maps.Marker({
        position: response.routes[0].overview_path[response.routes[0].overview_path.length - 1],
        map: map,
        title: 'Hello World!'
      });
    }
  });
}


function animateLine(line) {
    var count = 0;
    window.setInterval(function() {
      count = (count + 1) % 200;
      var icons = line.get('icons');
      icons[0].offset = (count / 2) + '%';
      line.set('icons', icons);
  }, 100);
}
