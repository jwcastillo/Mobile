import React from 'react';
import { Provider } from 'react-redux';
import { 
  View, 
  StyleSheet,
  Platform
} from 'react-native';
import { Font } from 'expo';
import store from './src/redux/store';
import { Navigator } from './src/components';

const MaterialIcons = require('./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf');
const FontAwesome = require('./node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf');
const Entypo = require('./node_modules/react-native-vector-icons/Fonts/Entypo.ttf');

class App extends React.Component { 
  componentDidMount() {
    const materialIconsSpecific = Platform.OS === 'ios' ? 'Material Icons' : 'MaterialIcons';
    Font.loadAsync({
      [materialIconsSpecific]: MaterialIcons,
      FontAwesome,
      Entypo
    });
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Navigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
