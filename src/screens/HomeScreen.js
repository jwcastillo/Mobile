import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet
  //Platform, 
  //BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode';

class Home extends React.Component {
  componentDidMount() {
    
    /*
    if (Platform.OS === 'android') { 
      BackHandler.addEventListener('hardwareBackPress', () => {
        console.log('back');
        return false;
      });
    }
    */
  }

  render() {
    return (
      <View 
        style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: 'white' 
        }}
      >
        <Text style={{ textAlign: 'center', marginBottom: 10, fontSize: 30, color: 'black' }}>
          Hello, my friend
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 13, marginLeft: 10, marginRight: 10 }}>
          Tap menu button at left top corner for more options
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 13, marginLeft: 10, marginRight: 10 }}>
          Contract panel is used for creating and executing delivery contracts
        </Text>
        <Text 
          style={{ 
            textAlign: 'center', 
            marginBottom: 10, 
            fontSize: 13, 
            marginLeft: 10, 
            marginRight: 10 }}
        >
          Connect panel is used for connecting to device via bluetooth (not working in demo version)
        </Text>
        
        <View style={{ flexDirection: 'row'}}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', marginBottom: 10, fontSize: 12 }}>
              Carrier public address
            </Text>
            <QRCode
              value={this.props.address}
              size={100}
              bgColor='black'
              fgColor='white'
            />
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', marginBottom: 10, fontSize: 12 }}>
              Client public address
            </Text>
            <QRCode
              value={this.props.clientAddress}
              size={100}
              bgColor='black'
              fgColor='white'
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  }
});


const mapStateToProps = ({ profile }) => profile;
const HomeScreen = connect(mapStateToProps, null)(Home);

export { HomeScreen };
