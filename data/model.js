window.onload = () => {
    let method = 'static';

    // if you want to statically add places, de-comment following line:
    // method = 'static';
    if (method === 'static') {
       /*  console.log("static starting");
        if (navigator.geolocation) {
            console.log("start geolocation");
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }*/

        let places = staticLoadPlaces();
        return renderPlaces(places);
    }

    /*function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude +
        "Longitude: " + position.coords.longitude)
      }*/

    if (method === 'static') {
        /*// first get current user location
        return navigator.geolocation.getCurrentPosition(function (position) {

            console.log(position.coords);

            // than use it to load from remote APIs some places nearby
           /* dynamicLoadPlaces(position.coords)
                .then((places) => {
                    renderPlaces(places);
                })
        },
            (err) => console.error('Error in retrieving position', err),
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 27000,
            }
        );*/

       
        

        
         
    }
};

function staticLoadPlaces() {
    return [
        {
            name: "Place one",
            location: {
                lat: -26.805466, // change here latitude if using static data
                lng: 153.132156, // change here longitude if using static data
            }
        },
        {
            name: "Place two",
            location: {
                lat: -26.805528, // change here latitude if using static data
                lng: 153.132597, // change here longitude if using static data
            }
        },
    ];
}

/* getting places from REST APIs
function dynamicLoadPlaces(position) {
    let params = {
        radius: 300,    // search places not farther than this value (in meters)
        clientId: 'HZIJGI4COHQ4AI45QXKCDFJWFJ1SFHYDFCCWKPIJDWHLVQVZ',
        clientSecret: '',
        version: '20300101',    // foursquare versioning, required but unuseful for this demo
    };

    // CORS Proxy to avoid CORS problems
    let corsProxy = 'https://cors-anywhere.herokuapp.com/';

    // Foursquare API
    let endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=15
        &v=${params.version}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    return resp.response.venues;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};*/

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        /* add place name
        let text = document.createElement('a-link');
        text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        text.setAttribute('title', place.name);
       //text.setAttribute('href', 'http://www.example.com/');
        text.setAttribute('scale', '15 15 15');*/

        let text = document.createElement('a-box');
        text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        text.setAttribute('material', "color: yellow");
        text.setAttribute('position', "0 30 0");


        text.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')) //{ detail: { component: this.el }}
        });

        scene.appendChild(text);
    });
}