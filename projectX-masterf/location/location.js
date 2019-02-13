  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDz630PzDtUl642k6q-R_nZgd9dzQn-Iao",
    authDomain: "projectx-f4363.firebaseapp.com",
    databaseURL: "https://projectx-f4363.firebaseio.com",
    projectId: "projectx-f4363",
    storageBucket: "projectx-f4363.appspot.com",
    messagingSenderId: "382252244279"
  };
  firebase.initializeApp(config);

  let database = firebase.database()

// This will let you use the .remove() function later on
if (!("remove" in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

mapboxgl.accessToken =
  "pk.eyJ1Ijoibmljb3ZpYXJuZXMiLCJhIjoiY2pybWxoZDhyMGtsYzQ0cG5hbzkxcTBvbSJ9.kRsk-GE3486XooyZHdYBVw";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v10",
  center: [-122.252949, 37.858993],
  zoom: 13
});

var stores = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.252949, 37.858993]
      },
      properties: {
        name: "Phone Repair Hut",
        phoneFormatted: "(510) 379-9769",
        phone: "5103799769",
        address: "2887 College Ave",
        city: "Berkeley",
        country: "United States",
        crossStreet: "at Russel St",
        postalCode: "94705",
        state: "CA"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.252407, 37.848515]
      },
      properties: {
        name: "Berkeley iPhone Repair",
        phoneFormatted: "(510) 214-2349",
        phone: "5102142349",
        address: "6019 College Ave",
        city: "Oakland",
        country: "United States",
        crossStreet: "at College Ave",
        postalCode: "94618",
        state: "CA"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.26806, 37.870985]
      },
      properties: {
        name: "Mobile Kangaroo",
        phoneFormatted: "(510) 509-1877",
        phone: "5105091877",
        address: "133 Berkeley Square",
        city: "Berkeley",
        country: "United States",
        crossStreet: "at Addison St",
        postalCode: "94704",
        state: "CA"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.25896, 37.864177]
      },
      properties: {
        name: "iResurrect Repairs",
        phoneFormatted: "(510) 900-6485",
        phone: "5109006485",
        address: "2556 Telegraph Ave #17",
        city: "Berkeley",
        country: "United States",
        crossStreet: "at Forest Ave",
        postalCode: "94704",
        state: "CA"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.251496, 37.8388]
      },
      properties: {
        name: "Phone Repair Hut",
        phoneFormatted: "(510) 379-9769",
        phone: "5103799769",
        address: "5319 College Ave",
        city: "Berkeley",
        country: "United States",
        crossStreet: "at College Ave",
        postalCode: "94618",
        state: "CA"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.268712, 37.880907]
      },
      properties: {
        name: "Phone Repair Hut",
        phoneFormatted: "(510) 379-9769",
        phone: "5103799769",
        address: "2111 Vine St",
        city: "Berkeley",
        country: "United States",
        crossStreet: "at Vine St",
        postalCode: "94709",
        state: "CA"
      }
    }
  ]
};

// This adds the stores to the map
map.on("load", function(e) {
  map.addSource("places", {
    type: "geojson",
    data: stores
  });
  buildLocationList(stores); // Initialize the list

  // Add `new mapboxgl.Geocoder` code here
  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    placeholder: "Enter your address to find the closest location",
    bbox: [-122.422302, 37.416537, -121.390978, 38.39245]
  });

  map.addControl(geocoder, "top-left");

  // Add the `map.addSource` and `map.addLayer` here
  map.addSource("single-point", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [] // Notice that initially there are no features
    }
  });

  map.addLayer({
    id: "point",
    source: "single-point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
      "circle-stroke-width": 3,
      "circle-stroke-color": "#fff"
    }
  });

  // Add the `geocode` event listener here
  geocoder.on("result", function(ev) {
    var searchResult = ev.result.geometry;
    map.getSource("single-point").setData(searchResult);
    var options = { units: "miles" };
    stores.features.forEach(function(store) {
      Object.defineProperty(store.properties, "distance", {
        value: turf.distance(searchResult, store.geometry, options),
        writable: true,
        enumerable: true,
        configurable: true
      });
    });

    stores.features.sort(function(a, b) {
      if (a.properties.distance > b.properties.distance) {
        return 1;
      }
      if (a.properties.distance < b.properties.distance) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    var listings = document.getElementById("listings");
    while (listings.firstChild) {
      listings.removeChild(listings.firstChild);
    }

    buildLocationList(stores);
  });
});

stores.features.forEach(function(marker, i) {
  var el = document.createElement("div"); // Create an img element for the marker
  el.id = `marker-${i}`;
  el.className = "marker";
  // Add markers to the map at all points
  new mapboxgl.Marker(el, { offset: [-28, -46] })
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);

  el.addEventListener("click", function(e) {
    flyToStore(marker); // Fly to the point
    createPopUp(marker); // Close all other popups and display popup for clicked store
    var activeItem = document.getElementsByClassName("active"); // Highlight listing in sidebar (and remove highlight for all other listings)

    e.stopPropagation();
    if (activeItem[0]) {
      activeItem[0].classList.remove("active");
    }

    var listing = document.getElementById("listing-" + i);
    listing.classList.add("active");
  });
});

function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15
  });
}

function createPopUp(currentFeature) {
  var popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();

  var popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
      `<p>${currentFeature.properties.name}</p>
       <p>${currentFeature.properties.address}<br>${currentFeature.properties.phoneFormatted}</p>
       <button id="${currentFeature.properties.address}" storeName="${currentFeature.properties.name}" class="nav appt"><p>Schedule an Appointment</p></button>`
    )
    .addTo(map);
}

function buildLocationList(data) {
  for (i = 0; i < data.features.length; i++) {
    var currentFeature = data.features[i];
    var prop = currentFeature.properties;

    var listings = document.getElementById("listings");
    var listing = listings.appendChild(document.createElement("div"));
    listing.className = "item";
    listing.id = `listing-${i}`;

    var link = listing.appendChild(document.createElement("a"));
    link.href = "#";
    link.className = "title";
    link.dataPosition = i;
    link.innerHTML = prop.address;

    var details = listing.appendChild(document.createElement("div"));
    details.innerHTML = prop.city;
    if (prop.phone) {
      details.innerHTML += ` &middot; ${prop.phoneFormatted}`;
    }

    if (prop.distance) {
      var roundedDistance = Math.round(prop.distance * 100) / 100;
      details.innerHTML +=
        `<p><strong>${roundedDistance} miles away</strong></p>`;
    }

    link.addEventListener("click", function(e) {
      var clickedListing = data.features[this.dataPosition]; // Update the currentFeature to the store associated with the clicked link
      flyToStore(clickedListing); // Fly to the point
      createPopUp(clickedListing); // Close all other popups and display popup for clicked store
      var activeItem = document.getElementsByClassName("active"); // Highlight listing in sidebar (and remove highlight for all other listings)
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      this.parentNode.classList.add("active");
    });
  }

  $(document).on("click", ".appt", function(e) {
    console.log($(this).attr("id"))
    // database.ref().update({
    //   apptStore: $(this).attr("storeName"),
    //   apptAddress: $(this).attr("id")
    // })
    
    localStorage.setItem('store', $(this).attr("storeName"));
    localStorage.setItem('address', $(this).attr("id"));

    window.location.href = "appt.html"

  })


}
