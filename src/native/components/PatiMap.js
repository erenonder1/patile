import React, { Component } from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Container } from 'native-base';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Messages from './Messages';
import ErrorMessages from '../../constants/errors';
import ShareFoodModal from './ShareFoodModal';
import fullFoodMarker from '../../images/full-food.png';
import noFoodMarker from '../../images/no-food.png';
import lessFoodMarker from '../../images/less-food.png';
import { getFeeds } from '../../actions/feeds';

const TIME_INTERVAL = 1000;
const DISTANCE_INTERVAL = 5;

// saniye
const NO_FOOD_LIMIT = 60;
const LESS_FOOD_LIMIT = 30;
const FULL_FOOD_LIMIT = 15;
let MARKER_ID = 0;

class PatiMap extends Component {
  static propTypes = {
    feeds: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    fetchFeeds: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      location: null,
      error: null,
      modalVisible: false,
    };

    this.onClickTakePhoto = this.onClickTakePhoto.bind(this);
    this.onClickShareLocation = this.onClickShareLocation.bind(this);
    this.changeModalVisibility = this.changeModalVisibility.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.getMarkers = this.getMarkers.bind(this);
    this.onRefreshMarkers = this.onRefreshMarkers.bind(this);
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        error: 'Emulatorde çalışmayacaktır. Lütfen kendi cihazınızda deneyiniz.',
      });
    } else {
      this._getLocationAsync();
    }
  }

  componentDidMount() {
    console.log('componendDidMount - pati haritası için yemler alınıyor');
    const { fetchFeeds } = this.props;
    fetchFeeds().catch((error) => {
      this.setState({
        error,
      });
    });
  }

  onRefreshMarkers = () => {
    const { fetchFeeds } = this.props;
    fetchFeeds();
  };

  onClickTakePhoto = () => {
  };

  onClickShareLocation = () => {
    const { location } = this.state;
    this.changeModalVisibility(true);
  };

  onModalClose = () => {
    this.changeModalVisibility(false);
  };

  onFormSubmit = (error) => {
    this.changeModalVisibility(false);
    this.setState({
      error,
    });
  };

  changeModalVisibility = (visibility) => {
    this.setState({ modalVisible: visibility });
  };

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        error: ErrorMessages.locationDisabled,
      });
    }

    await Location.watchPositionAsync({
      enableHighAccuracy: true,
      timeInterval: TIME_INTERVAL,
      distanceInterval: DISTANCE_INTERVAL,
    }, location => this.setLocation(location));
  };

  setLocation = (location) => {
    this.setState({ location });
  };

  getMarkers = () => {
    const { feeds } = this.props;
    console.log('marker: pati haritası için yemler alındı:');
    console.log(feeds);

    const markers = [];
    feeds && feeds.forEach((feed) => {
      console.log(feed.latitude);
      if (feed.latitude && feed.longitude) {
        markers.push({
          coordinate: { latitude: feed.latitude, longitude: feed.longitude },
          key: MARKER_ID++,
          time: feed.time,
        });
      }
    });

    console.log('oluşturulan marker\'lar:');
    console.log(markers);

    return markers;
  };

  getMarkerColor = (markerTime) => {
    const diff = (new Date().getTime() - markerTime) / 1000
    if (diff > NO_FOOD_LIMIT) {
      return noFoodMarker;
    } else {
      if (diff > FULL_FOOD_LIMIT) {
        return lessFoodMarker;
      }
      else {
        return fullFoodMarker;
      }
    }
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      latlng: {
        width: 200,
        alignItems: 'stretch',
      },
      button: {},
      buttonContainer: {
        flexDirection: 'column',
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
      },

      buttonImage: {
        height: 100,
        width: 100,
      },
      modal: {
        margin: '50%',
      },
    });

    const {
      error, location, modalVisible,
    } = this.state;

    const markers = this.getMarkers();
    return (
      <Container>
        {location && location.coords
        && (
          <View style={styles.container}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation
              followsUserLocation
            >
              {markers && markers.map(marker => (
                <MapView.Marker
                  key={marker.key}
                  coordinate={marker.coordinate}
                >
                  <Image
                    source={this.getMarkerColor(marker.time)}
                    style={{
                      flex: 1,
                      width: 60,
                      height: 60,
                      resizeMode: 'contain',
                    }}
                  />
                </MapView.Marker>
              ))}
            </MapView>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => this.onRefreshMarkers()}
                style={[styles.button]}
              >
                <Image
                  source={require('../../images/refresh.png')}
                  style={styles.buttonImage}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.onClickTakePhoto()}
                style={[styles.button]}
              >
                <Image
                  source={require('../../images/take-photo.png')}
                  style={styles.buttonImage}
                />
              </TouchableOpacity>


              <TouchableOpacity
                onPress={() => this.onClickShareLocation()}
                style={[styles.button]}
              >
                <Image
                  source={require('../../images/share-food.png')}
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
            </View>

            <ShareFoodModal
              onModalClose={this.onModalClose}
              visible={modalVisible}
              onFormSubmit={this.onFormSubmit}
              style={styles.modal}
              coords={location.coords}
            />
          </View>
        )}

        {error && <Messages message={error}/>}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  feeds: state.feeds.feeds || [],
});

const mapDispatchToProps = {
  fetchFeeds: getFeeds,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatiMap);
