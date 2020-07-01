import axios from "axios";
import { $ } from "./bling";

const mapOptions = {
    center: { lat: 43.2, lng: -79.8 },
    zoom: 10,
};

function loadPlaces(map, lng = 43.2, lat = -79.8) {
    axios.get(`/api/stores/near?lng=${lng}&lat=${lat}`).then((res) => {
        const places = res.data;
        if (!places.length) {
            alert("No Place Found!");
            return;
        }

        // bounds for map centering
        const bounds = new google.maps.LatLngBounds();

        const markers = places.map((place) => {
            const [placeLng, placeLat] = place.location.coordinates;
            const position = { lat: placeLat, lng: placeLng };
            bounds.extend(position);
            const marker = new google.maps.Marker({
                map,
                position,
            });
            marker.place = place;
            return marker;
        });

        // zoom the map to fit marker
        map.setCenter(bounds.getCenter());
        map.fitBounds(bounds);
    });
}

function makeMap(mapDiv) {
    if (!mapDiv) return;
    // adding map
    const map = new google.maps.Map(mapDiv, mapOptions);
    loadPlaces(map);
    const input = $('[name="geolocation"]');
    const autocomplete = new google.maps.places.Autocomplete(input);
}

export default makeMap;