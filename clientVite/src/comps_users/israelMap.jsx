import React, { useEffect } from 'react';
import { SERVER_URL, apiRequestNoBody } from '../serverConnect/api'

const IsraelMap = ({ locations ,lng,lat}) => {
    const handleTakeTask = async (missionId) => {
        const confirmation = confirm("Do you want to take the task?");
        if (confirmation) {
            try {
                const response = await apiRequestNoBody(`${SERVER_URL}/missions/addInterested/${missionId}`, 'PUT');

                if (response.data.success) {
                    alert('User added to interested list');
                }
            } catch (error) {
                console.error('Error taking task:', error.response.data);
                alert(error.response.data.error)
            }
        }
    };
        useEffect(() => {
            const initMap = () => {
                const israelCoords = { lat: lat, lng: lng }; // Coordinates for Israel
                const israelMap = new window.google.maps.Map(document.getElementById('map'), {
                    center: israelCoords,
                    zoom: 8,
                });
        
                const userMarkerIcon = {
                    url: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000`, // Red marker icon
                    scaledSize: new window.google.maps.Size(40, 60), // Adjust the size of the marker icon
                };
        
                const userMarker = new window.google.maps.Marker({
                    position: israelCoords,
                    map: israelMap,
                    title: 'אתה נמצא כאן', // Marker title (optional)
                    icon: userMarkerIcon, // Set the custom marker icon
                });
        
                const userInfoWindow = new window.google.maps.InfoWindow({
                    maxWidth: 200, // Adjust the maximum width of the info window
                });
        
                userInfoWindow.setContent(`
                    <div style="background-color: #ff0000; color: white; padding: 10px;">
                        <strong>אתה נמצא כאן</strong><br>
                    </div>
                `);
        
                userInfoWindow.open(israelMap, userMarker);
        
                const markerIcon = {
                    url: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|8b5cf6`,
                    scaledSize: new window.google.maps.Size(40, 60), // Adjust the size of the marker icon
                };
        
                const infoWindow = new window.google.maps.InfoWindow({
                    maxWidth: 200, // Adjust the maximum width of the info window
                });
        

            locations.forEach((location) => {
                const marker = new window.google.maps.Marker({
                    position: { lat: location.lat, lng: location.lng },
                    map: israelMap,
                    title: location.title, // Marker title (optional)
                    icon: markerIcon, // Set the custom marker icon
                });

                marker.addListener('mouseover', () => {
                    infoWindow.setContent(`
            <div style="background-color: #8b5cf6; color: white; padding: 10px;">
              <strong>${location.title}</strong><br>
              Details: ${location.description}
            </div>
          `);
                    infoWindow.open(israelMap, marker);
                });
                marker.addListener('click', () => {
                    // הוסף קוד כלשהו שברצונך לבצע כאשר לוחצים על המארק
                    // כמו לדוגמה קריאה לפונקציה handleTakeTask עם missionId מתאים
                    const missionId = location._id; // כאן יש להכניס את ה-missionId הרלוונטי
                    handleTakeTask(missionId);
                });
                marker.addListener('mouseout', () => {
                    infoWindow.close();
                });
            });
        };

        // Check if Google Maps API is loaded
        if (window.google && window.google.maps) {
            initMap();
        } else {
            // Handle API not loaded error
            console.error('Google Maps API is not loaded');
        }
    }, []);

    return (
        <div id="map" style={{ height: '500px', width: '100%' }}></div>
    );
};

export default IsraelMap;