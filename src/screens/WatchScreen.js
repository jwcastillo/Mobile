import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
//import BluetoothSerial from 'react-native-bluetooth-hc05';
import { connectToDevice, getValue } from '../redux/actions';


export const RANGE_1D = '1D';
export const RANGE_1W = '1W';
export const RANGE_1M = '1M';
export const RANGE_3M = '3M';
export const RANGE_6M = '6M';
export const RANGE_1Y = '1Y';
export const RANGE_MAX = 'MAX';
export const RANGES = [RANGE_1D, RANGE_1W, RANGE_1M, RANGE_3M, RANGE_6M, RANGE_1Y, RANGE_MAX];

class Watch extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>

        <View style={styles.chart}>
          <Text style={styles.temperature}>13</Text>
        </View>
        
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  },
  temperature: {
    fontSize: 100,
    color: 'white',
    margin: 20
  },
  chart: {
    flex: 30,
    borderColor: '#C3DBF4',
    borderBottomWidth: 2,
    backgroundColor: '#03A9F4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollableList: {
    flex: 70,
  }
});

const mapStateToProps = ({ watch }) => ({ ...watch });
const WatchScreen = connect(mapStateToProps, { connectToDevice, getValue })(Watch);

export { WatchScreen };
