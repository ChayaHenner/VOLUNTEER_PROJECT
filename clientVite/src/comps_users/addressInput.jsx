import React, { useState, useMemo, useEffect, forwardRef } from 'react';
import { debounce } from '@mui/material/utils';
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
import { useForm } from 'react-hook-form';

// Tailwind CSS classes
const inputClasses = 'appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white';
const listItemClasses = 'py-2 px-4 border-b border-gray-200';

const AddressInput = forwardRef(({ onAddressSelected, setAddress , setCoordinates}, ref) => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const loaded = React.useRef(false);
    // const [lon, setLon] = useState('');
    // const [lat, setLat] = useState('');

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            // Load Google Maps API script
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
            script.id = 'google-maps';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            script.onload = () => {
                loaded.current = true;
            };
        }
    }

    const fetch = useMemo(
        () =>
            debounce((request, callback) => {
                if (window.google) {
                    const autocompleteService = new window.google.maps.places.AutocompleteService();
                    autocompleteService.getPlacePredictions(request, callback);
                }
            }, 400),
        []
    );

    useEffect(() => {
        let active = true;
        setAddress(inputValue);
        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return () => (active = false);
        }
    
        fetch({ input: inputValue }, (results) => {
            if (active && window.google) {
                let newOptions = [];
                if (value) {
                    newOptions = [value];
                }
                if (results) {
                    newOptions = [...newOptions, ...results];
                }
                setOptions(newOptions);
            }
        });
    
        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);
    

    useEffect(() => {
        if (ref) {
            const unregister = register('address'); // Assuming 'address' is the name of your form field
            return unregister;
        }
    }, [register, ref]);

    return (
        <>
            <div className="w-full">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Add a location"
                        className={inputClasses}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}

                        ref={ref}  // Add this line to pass the ref

                    />
                    {options.length > 0 && (
                        <ul className="absolute top-10 left-0 right-0 border border-gray-200 rounded-md overflow-hidden">
                            {options.map((option, index) => (
                                
                                //     key={index}
                                //     className={listItemClasses}
                                //     onClick={() => {
                                //         setValue(option);
                                //         setInputValue(option.description); // Set input value to selected option
                                //         setOptions([]); // Clear options to hide the dropdown
                                //         onAddressSelected && onAddressSelected(option.description);

                                //     }}
                                // >
                                //     <div className="flex items-center">
                                //         <span className="w-8 h-8 mr-2">
                                //             <svg
                                //                 xmlns="http://www.w3.org/2000/svg"
                                //                 fill="none"
                                //                 viewBox="0 0 24 24"
                                //                 stroke="currentColor"
                                //                 className="text-secondary"
                                //             >
                                //                 <path
                                //                     strokeLinecap="round"
                                //                     strokeLinejoin="round"
                                //                     strokeWidth="2"
                                //                     d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                //                 />
                                //             </svg>
                                //         </span>
                                //         <div>
                                //             {option.matched_substrings.map((s, idx) => (
                                //                 <React.Fragment key={idx}>
                                //                     <span>{option.description.substring(s.offset, s.offset + s.length)}</span>
                                //                     {' '}
                                //                 </React.Fragment>
                                //             ))}
                                //             <p className="text-sm text-gray-500">
                                //                 {option.structured_formatting.secondary_text}
                                //             </p>
                                //         </div>
                                //     </div>
                                // </li>
                                // ...
                                // <li
                                //     key={index}
                                //     className={listItemClasses}
                                //     onClick={() => {
                                //         setValue(option);
                                //         setInputValue(option.description);
                                //         setOptions([]);
                                //         onAddressSelected && onAddressSelected(option.description);

                                //         // Get more details about the selected place
                                //         const placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
                                //         placesService.getDetails({ placeId: option.place_id }, (placeDetails, status) => {
                                //             if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                                //                 // Now you can access the coordinates
                                //                 const lat = placeDetails.geometry.location.lat();
                                //                 const lon = placeDetails.geometry.location.lng();
                                  
                                //                 // Pass the coordinates to the parent component
                                //                 setCoordinates({ lat, lon });
                                //                 // Do something with lat and lon
                                //             }
                                //         });
                                //     }}
                                // >
                                //     {/* ... */}
                                // </li>
                                // ...
                                
                                    <li
                                        key={index}
                                        className={listItemClasses}
                                        onClick={() => {
                                            setValue(option);
                                            setInputValue(option.description);
                                            setOptions([]);
                                            onAddressSelected && onAddressSelected(option.description);
                                
                                            // Get more details about the selected place
                                            const placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
                                            placesService.getDetails({ placeId: option.place_id }, (placeDetails, status) => {
                                                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                                                    // Now you can access the coordinates
                                                    const lat = placeDetails.geometry.location.lat();
                                                    const lon = placeDetails.geometry.location.lng();
                                                    
                                                    // Pass the coordinates to the parent component
                                                    setCoordinates({ lat, lon });
                                                    // Do something with lat and lon
                                                }
                                            });
                                        }}
                                    >
                                        <div className="flex items-center">
                                            <span className="w-8 h-8 mr-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    className="text-secondary"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                    />
                                                </svg>
                                            </span>
                                            <div>
                                                {option.matched_substrings.map((s, idx) => (
                                                    <React.Fragment key={idx}>
                                                        <span>{option.description.substring(s.offset, s.offset + s.length)}</span>
                                                        {' '}
                                                    </React.Fragment>
                                                ))}
                                                <p className="text-sm text-gray-500">
                                                    {option.structured_formatting.secondary_text}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                
                            
                        </ul>
                    )}
                </div>
            </div>

        </>
    );
});

export default AddressInput;


