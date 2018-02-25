import React from 'react';
import { Provider } from 'react-redux';
import { 
  View, 
  StyleSheet
} from 'react-native';
import { Font } from 'expo';
import store from './src/redux/store';
import { Navigator } from './src/components';

class App extends React.Component { 
  componentDidMount() {
    Font.loadAsync({
      MaterialIcons: require('./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
      FontAwesome: require('./node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf'),
      Entypo: require('./node_modules/react-native-vector-icons/Fonts/Entypo.ttf')
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
