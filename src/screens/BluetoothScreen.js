import React from 'react';
import { 
  View,
  StyleSheet,
  ListView,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { 
  List, 
  ListItem,
  Text,
  Overlay,
} from 'react-native-elements';
//import BluetoothSerial from 'react-native-bluetooth-hc05';
import { Loader } from '../components';
import { connectToDevice } from '../redux/actions';

class Bluetooth extends React.Component {
  static navigationOptions = () => {
    const right = null; //<Loader onPress={() => navigation.state.params.startScanning()} />;

    return {
      title: 'Devices',
      titleStyle: {
        alignSelf: 'center'
      },
      headerRight: right
    };
  }

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: dataSource.cloneWithRows([]),
      selected: null,
      isLoading: false,
      isConnecting: false
    };
  }

  componentWillMount() {
    //BluetoothSerial.disconnect();
  }

  componentDidMount() {
    this.props.navigation.setParams({
      startScanning: this.startScanning,
      isLoading: this.state.isLoading
    });
  }
  
  onSelected = () /*id()*/ => {
    /*
    this.setState({ isConnecting: true });

    BluetoothSerial.connect(id)
    .then(() => 
      //this.props.connectToDevice(id);
       BluetoothSerial.available()
      
      //this.props.navigation.navigate(WATCH_SCREEN_KEY);
    )
    .then(() => BluetoothSerial.writeToDevice('MQ=='))
    .then(() => BluetoothSerial.available())
    .then(() => BluetoothSerial.read())
    .then(data => console.log(data))
    .catch(() => this.setState({ isConnecting: false }));
    */
  }

  startScanning = async () => {
    /*
    try {
      BluetoothSerial.requestEnable();
      this.setState({ isLoading: true });

      const devices = await BluetoothSerial.list();
      //console.log(devices);
      
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(devices.filter(v => 
          v.name && v.id && v.address)
        ),
        isLoading: false
      });
    } catch (err) {
      console.log('Error ', err);
    }
    */
  }

  renderItem = item => (
    <ListItem
      hideChevron
      title={item.name}
      icon={'av-timer'}
      subtitle={item.id}
      leftIcon={{ name: 'settings-input-hdmi' }}
      onPress={() => this.onSelected(item.id)}
    />
  )

  renderOverlay = () => (
    <Overlay
      isVisible={this.state.selected === null}
    >
      <Text>Hello from Overlay!</Text>
    </Overlay>
  )

  renderNoDevices() {
    return <Text style={styles.hint}>There are no devices, try to scan for devices</Text>;
  }

  renderLoading() {
    return <Text style={styles.hint}>Scanning...</Text>;
  }

  renderConnecting() {
    return <Text style={styles.hint}>Connecting...</Text>;
  }

  renderContent() {
    if (this.state.isConnecting) {
      return this.renderConnecting();
    }

    if (this.state.isLoading) {
      return this.renderLoading();
    }

    if (this.state.dataSource.getRowCount() === 0) {
      return this.renderNoDevices();
    } 

    return (
      <List containerStyle={styles.list}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}
        />
      </List>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
        { 
          this.state.isLoading || this.state.isConnecting ? 
            <ActivityIndicator style={styles.button} size="small" color='#00aced' /> : 
            <Loader onPress={() => this.startScanning()} /> 
        }
        {this.renderContent()}
      </View>
    );
  }
}

const BluetoothScreen = connect(null, { connectToDevice })(Bluetooth);

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
  button: {
    margin: 10
  },
  list: {
    borderWidth: 1, 
    marginTop: 6, 
    marginLeft: 6, 
    marginRight: 6, 
    borderColor: '#cbd2d9'
  },
  hint: {
    fontSize: 15,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10
  }
});

export { BluetoothScreen };
