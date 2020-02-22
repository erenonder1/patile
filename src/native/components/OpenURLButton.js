import React from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'native-base';


export default class OpenURLButton extends React.Component {
  static propTypes = {
    url: PropTypes.string,
  };

  handleClick = () => {
    if (this.props.url) {
      Linking.canOpenURL(this.props.url).then(supported => {
        if (supported) {
          Linking.openURL(this.props.url);
        } else {
          console.log('Don\'t know how to open URI: ' + this.props.url);
        }
      });
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <View>
          <Text>Linke Git</Text>
        </View>
      </TouchableOpacity>
    );

  }
}
