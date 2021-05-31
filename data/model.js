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
            type: "image",
            location: {
                lat: -26.805734, // change here latitude if using static data
                lng: 153.132381, // change here longitude if using static data
            }
        },
        {
            name: "Place two",
            type: "box",
            location: {
                lat: -26.805796, // change here latitude if using static data
                lng: 153.132564, // change here longitude if using static data
            }
        },
        {
            name: "Place three",
            type: "map",
            location: {
                lat: -26.805108, // change here latitude if using static data
                lng: 153.132563, // change here longitude if using static data
            }
        },
        {
            name: "Place four",
            type: "image",
            location: {
                lat: -26.805509, // change here latitude if using static data
                lng: 153.133234, // change here longitude if using static data
            }
        },
        {
            name: "Place five",
            type: "box",
            location: {
                lat: -26.806395, // change here latitude if using static data
                lng: 153.132536, // change here longitude if using static data
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

        if(place.type === 'box'){

        let text = document.createElement('a-box');
        text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        text.setAttribute('material', "color: yellow");
        text.setAttribute('look-at',"[gps-camera]");
        text.setAttribute('position', "0 10 0");
        text.setAttribute('scale', "3 3 3");
        text.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')) //{ detail: { component: this.el }}
        });
        scene.appendChild(text);

        }else if(place.type === 'image'){

            let html = document.createElement('a-entity');
            html.setAttribute('htmlembed');
            html.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            html.setAttribute('look-at',"[gps-camera]");
            html.innerHTML = '<h1>An Example</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><img src="./assets/img/place_icon.png" alt="image">';
            html.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')) //{ detail: { component: this.el }}
            });
            scene.appendChild(html);
        /*let image = document.createElement('a-image');
        image.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        image.setAttribute('look-at',"[gps-camera]");
        image.setAttribute('src',"./assets/img/place_icon.png");
        image.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')) //{ detail: { component: this.el }}
        });
        scene.appendChild(image);*/

        } else {

            let image = document.createElement('a-image');
            image.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            image.setAttribute('look-at',"[gps-camera]");
            image.setAttribute('src',"./assets/img/map-marker.png");
            image.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')) //{ detail: { component: this.el }}
            });
            scene.appendChild(image);
        }
    });
}