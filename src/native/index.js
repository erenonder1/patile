import React from 'react';
import { Platform, StatusBar, YellowBox } from 'react-native';
import * as Font from 'expo-font';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Stack } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';
import _ from 'lodash';

import { Root, StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import theme from '../../native-base-theme/variables/commonColor';

import Routes from './routes/index';
import Loading from './components/Loading';

// Hide StatusBar on Android as it overlaps tabs
if (Platform.OS === 'android') StatusBar.setHidden(true);

export default class App extends React.Component {
  static propTypes = {
    store: PropTypes.shape({}).isRequired,
    persistor: PropTypes.shape({}).isRequired,
  }

  state = { loading: false } //Yüklenme hatasını "False" yaparak buradan çözdük

  async componentWillMount() {
    this.fixTimerWarning();
    await Font.loadAsync({
      // sorun burasıydı, require.js eskiden çalışıyorken şimdi farklı bir path kullanıyor (path -> dosyanın sistemde bulunduğu yol)
      // o yüzden hataya baktım mesela ->
      // 'D:\projeler\patile\src\native\node_modules\@expo\vector-icons\build\vendor\react-native-vector-icons\Fonts'
      // buradan yüklemeye çalışıyor aslında patile'nin altında araması lazım node_modules'ü
      // o yüzden
      Roboto: require('../../node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      // eskiden burası /@expo/vector-icons.... to
      // üstte yazdığım sebepten ötürü dedim ki ../../node_modules altına bak. Yani hatalı baktığı:
      // 'D:\projeler\patile\src\native\node_modules\@expo
      // src\native kısmını fazladan ekliyor bi sebepten ötürü. Onu eklemesin diye iki tane yukarı çıkmasını söyledim:
      // ..\..\ ekledim en başına, sonra dedim ki onun içinde node_modules var, işte aradığın kütüphane orada
      // sonuç olarak @expo/vector-icons/bui.... başlayan icon yolunu
      // ../../node_modules/@expo/vector-icons/buil... haline getirdim. üsttekiler için de aynı şey
      Ionicons: require('../../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
    });

    this.setState({ loading: false });
  }

  fixTimerWarning() {
    YellowBox.ignoreWarnings(['Setting a timer']);
    const _console = _.clone(console);
    console.warn = message => {
      if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
      }
    };
  }

  render() {
    const { loading } = this.state;
    const { store, persistor } = this.props;

    if (loading) return <Loading />;

    return (
      <Root>
        <Provider store={store}>
          <PersistGate
            loading={<Loading />}
            persistor={persistor}
          >
            <StyleProvider style={getTheme(theme)}>
              <Router>
                <Stack key="root">
                  {Routes}
                </Stack>
              </Router>
            </StyleProvider>
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}
