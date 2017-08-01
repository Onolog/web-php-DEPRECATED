import {head, last, values} from 'lodash';
import GoogleMapsLoader from 'google-maps';
import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';

import {API_KEY} from 'constants/Google';

// Default values: Los Altos, CA
const DEFAULT_LATITUDE = 37.3682;
const DEFAULT_LONGITUDE = -122.098;
const DEFAULT_ZOOM = 12;

// Matches the types in `google.maps.MapTypeId`.
const MAP_TYPES = {
  HYBRID: 'hybrid',
  ROADMAP: 'roadmap',
  SATELLITE: 'satellite',
  TERRAIN: 'terrain',
};

let map;

class GoogleMap extends React.Component {
  static displayName = 'GoogleMap';

  static propTypes = {
    mapTypeId: PropTypes.oneOf(values(MAP_TYPES)),
    path: PropTypes.arrayOf(PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired).isRequired,
  };

  static defaultProps = {
    mapTypeId: MAP_TYPES.TERRAIN,
  };

  componentDidMount() {
    GoogleMapsLoader.KEY = API_KEY;
    GoogleMapsLoader.LIBRARIES = ['geometry'];
    GoogleMapsLoader.load(google => {
      // Make Google Maps API globally available.
      window.google = google;
      this._drawMap();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const lastPath = prevProps.path;
    const thisPath = this.props.path;

    // Only re-draw the map if the path changes.
    if (lastPath.length !== thisPath.length && window.google) {
      this._drawMap();
    }
  }

  render() {
    return <div className={this.props.className} />;
  }

  _drawMap = () => {
    const {mapTypeId, path} = this.props;
    const {Map, Marker, Polyline} = window.google.maps;

    map = new Map(findDOMNode(this), {
      zoom: DEFAULT_ZOOM,
      center: {lat: DEFAULT_LATITUDE, lng: DEFAULT_LONGITUDE},
      mapTypeId,
    });

    // Center map and set zoom level based on the bounds of the path.
    const bounds = this._getBoundsForPath(path);
    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);

    // Add start/finish markers
    new Marker({
      label: 'Start',
      map,
      position: head(path),
    });

    new Marker({
      label: 'Finish',
      map,
      position: last(path),
    });

    // Create and set the polyline.
    new Polyline({
      map,
      path,
      strokeColor: '#ff0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
  };

  _getBoundsForPath = (path) => {
    const {LatLngBounds, LatLng} = window.google.maps;
    const bounds = new LatLngBounds();
    for (let ii = 0; ii < path.length-1; ii++) {
      bounds.extend(new LatLng(path[ii]));
    }
    return bounds;
  };
}

GoogleMap.MAP_TYPES = MAP_TYPES;

export default GoogleMap;
