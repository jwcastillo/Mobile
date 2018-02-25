import React from 'react';
import { Provider } from 'react-redux';
import { 
  View, 
  StyleSheet,
  Text
} from 'react-native';
import store from './src/redux/store';
import { Navigator, ScrollableHeader } from './src/components';
import { BluetoothScreen, WatchScreen, ContractsManageScreen, EmulationScreen } from './src/screens';

class App extends React.Component { 
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
