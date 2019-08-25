/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
import { getCluster } from 'utils';

import MapClusterMarker from './MapClusterMarker';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0457;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const COORDS = [
//   { lat: 42, lon: -87 },
//   { lat: 42.1, lon: -87 },
//   { lat: 42.2, lon: -87 },
//   { lat: 42.3, lon: -87 },
//   { lat: 42.4, lon: -87 },
// ];

const INITIAL_POSITION = {
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

class mapView extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    searchList: PropTypes.array.isRequired,
    boundaryData: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  state = {
    region: INITIAL_POSITION,
  };

  constructor(props) {
    super(props);
    this.state = {
      region: {
        ...INITIAL_POSITION,
        latitude: props.location.latitude,
        longitude: props.location.longitude,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    let { latitude, longitude } = nextProps.location;
    if (nextProps.searchList.length > 0) {
      const [lat, long] = nextProps.searchList[0].centerpoint.split(',');
      latitude = Number(lat);
      longitude = Number(long);
    }
    this.setState({
      region: {
        ...INITIAL_POSITION,
        latitude,
        longitude,
      },
    });
  }

  _renderMarker = (marker, index) => {
    const key = index + marker.geometry.coordinates[0];
    const {
      navigation: { navigate },
      searchList,
    } = this.props;
    // If a cluster
    if (marker.properties) {
      return (
        <Marker
          key={key}
          onPress={() => navigate('MapModalHome', { searchList, index })}
          coordinate={{
            latitude: marker.geometry.coordinates[1],
            longitude: marker.geometry.coordinates[0],
          }}
        >
          <MapClusterMarker count={marker.properties.point_count} />
        </Marker>
      );
    }
    // If a single marker
    return (
      <Marker
        key={key}
        onPress={() => navigate('MapModalHome', { searchList, index })}
        coordinate={{
          latitude: marker.geometry.coordinates[1],
          longitude: marker.geometry.coordinates[0],
        }}
      />
    );
  };

  onRegionChange = region => {
    this.setState({ region });
  };

  render() {
    const { region } = this.state;
    const { searchList, boundaryData } = this.props;
    const allCoords = searchList.map(c => ({
      geometry: {
        coordinates: [c.lng, c.lat],
      },
    }));

    console.warn(boundaryData);

    const cluster = getCluster(allCoords, region);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MapView
          ref={map => {
            this.map = map;
          }}
          style={{
            ...StyleSheet.absoluteFill,
          }}
          region={region}
          provider={PROVIDER_GOOGLE}
          onRegionChangeComplete={this.onRegionChange}
          loadingEnabled
          zoomEnabled
          zoomControlEnabled
          scrollEnabled
          showsCompass
          showsScale
        >
          {cluster.markers.map((marker, index) => this._renderMarker(marker, index))}
          {boundaryData.map((coordinates, index) => {
            return (
              <Polygon
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                coordinates={coordinates}
                strokeColor="#F00"
                fillColor="rgba(255,0,0,0.5)"
                strokeWidth={1}
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}

export default mapView;
