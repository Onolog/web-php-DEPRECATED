import {head, last, values} from 'lodash';
import GoogleMapsLoader from 'google-maps';
import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';

import {API_KEY} from 'constants/Google';

const dataShape = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

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

class GoogleMap extends React.Component {

  cursor = null;

  componentDidMount() {
    GoogleMapsLoader.KEY = API_KEY;
    GoogleMapsLoader.LIBRARIES = ['geometry'];
    GoogleMapsLoader.load(google => {
      // Make Google Maps API globally available.
      window.google = google;
      this._drawMap();
    });
  }

  componentWillReceiveProps(nextProps) {
    // Only re-draw the map if the path changes.
    if (window.google && nextProps.path.length !== this.props.path.length) {
      this._drawMap();
      return;
    }

    this._updateCursor(nextProps);
  }

  render() {
    return <div className={this.props.className} />;
  }

  _drawMap = () => {
    const {mapTypeId, path} = this.props;
    const {Map, Marker, Polyline} = window.google.maps;

    const map = new Map(findDOMNode(this), {
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
      strokeWeight: 3,
    });

    this.cursor = new Marker({
      map,
    });

    this._updateCursor(this.props);
  };

  _updateCursor = ({cursorPos}) => {
    this.cursor.setPosition(cursorPos);
  }

  _getBoundsForPath = path => {
    const {LatLngBounds, LatLng} = window.google.maps;
    const bounds = new LatLngBounds();
    for (let ii = 0; ii < path.length-1; ii++) {
      bounds.extend(new LatLng(path[ii]));
    }
    return bounds;
  };
}

GoogleMap.propTypes = {
  cursorPos: PropTypes.shape(dataShape),
  mapTypeId: PropTypes.oneOf(values(MAP_TYPES)),
  path: PropTypes.arrayOf(
    PropTypes.shape(dataShape).isRequired
  ).isRequired,
};

GoogleMap.defaultProps = {
  mapTypeId: MAP_TYPES.TERRAIN,
};

GoogleMap.MAP_TYPES = MAP_TYPES;

export default GoogleMap;
