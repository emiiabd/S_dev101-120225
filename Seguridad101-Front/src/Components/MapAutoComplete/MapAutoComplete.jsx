import React, { useEffect, useRef, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

const MapAutocompleteComponent = ({apiKey}) => {
  
  const handlePlaceSelected = (place) => {
    console.log(place);
    console.log(place.formatted_address);
    console.log(place.url);
  }

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
    language: 'es',
    region: 'ar',
    preventGoogleFontsLoading: true,
  });
  
  const inputRef = useRef(null);
  const autocomplete = useRef(null);

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      autocomplete.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['route']
      });

      autocomplete.current.addListener('place_changed', () => {
        const place = autocomplete.current.getPlace();
        handlePlaceSelected(place)
      });
    }
  }, [isLoaded]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
  <div className="form-floating mb-3">
    <input
      className="form-control autoc"
      id="autocomplete"
      name='autocomplete'
      ref={inputRef}
      type="text"
      placeholder="Ingrese una ubicación"
      />
    <label htmlFor="autocomplete">Ingrese la direccion del lugar</label>
  </div>
  );
};

export default MapAutocompleteComponent;