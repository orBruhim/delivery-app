export const getMapOptions = () => {
  return {
    center: { lat: 32.0851, lng: 34.782 },
    zoom: 12,
    disableDefaultUI: true,
    keyboardShortcuts: false,
    minZoom: 15,
    zoomControl: false,
    tilt: 0,
    gestureHandling: 'greedy',
  };
};
