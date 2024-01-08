import React, { useState, useEffect } from 'react'
import IsraelMap from './israelMap'
import Loading from '../comps_main/loading';
import { SERVER_URL, apiRequestGet } from '../serverConnect/api'
import Cookies from 'js-cookie';

const Map = () => {
    const [locations, setLocations] = useState([])
    const [loading, setLoading] = useState(true); // Loading state
    const [userCoordinates, setUserCoordinates] = useState({}); // Loading state

    function extractCoordinatesFromGoogleMapsURL(url) {
        const startIndex = url.indexOf('?q=') + 3;
        const coordinatesString = url.substring(startIndex);
        console.log(coordinatesString);
        const tmp = coordinatesString.split('&')[0];
        console.log(tmp);
        const lat = parseFloat(tmp.split(',')[0]); // Parse the value as a float
        const lng = parseFloat(tmp.split(',')[1]);
        console.log(lat, lng);
        return { lat, lng };
    }
    useEffect( () => {
        const api = async () => {
            let url = SERVER_URL + "/missions/"
            try {
                let resp = await apiRequestGet(url)
                console.log(resp.data)
                let arry = [];
                resp.data.forEach(function (item) {
                    console.log(item.address.mapLink);
                    const coordinates = extractCoordinatesFromGoogleMapsURL(item.address.mapLink);
                    let temp = {
                        _id: item._id,
                        lat: coordinates.lat,
                        lng: coordinates.lng,
                        title: item.title,
                        description: item.description
                    };
    
                    // Check if lat and lng are valid numbers before pushing into the array
                    if (!isNaN(temp.lat) && !isNaN(temp.lng)) {
                        arry.push(temp);
                    } else {
                        console.error('Invalid coordinates:', temp);
                    }
                });
                console.log(arry);
                setLocations(arry)
                console.log(locations);
                setLoading(false)
            }
            catch (err) {
                console.log("ERROR ", err);
            }
        };
        api();
        const user = JSON.parse(Cookies.get('user'));
        console.log(user);
        const userAdd=user.address.mapLink;
        setUserCoordinates(extractCoordinatesFromGoogleMapsURL(userAdd));
    }, [])
    return (
        <div>
            {
                loading ? (
                    <Loading text={"loading"} />
                )
                    : (
                        <IsraelMap locations={locations} lat={userCoordinates.lat} lng={userCoordinates.lng}/>
                    )
            }
        </div>
    )
}

export default Map