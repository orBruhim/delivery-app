export const getMapOptions = (): google.maps.MapOptions => {
  return {
    center: { lat: 32.0851, lng: 34.782 },
    zoom: 8,
    disableDefaultUI: true,
    keyboardShortcuts: false,
    zoomControl: false,
    tilt: 0,
    gestureHandling: 'greedy',
  };
};
