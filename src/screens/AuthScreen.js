import React from 'react';
import { 
  View,  
  Text, 
  StyleSheet,
  AsyncStorage, 
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { facebookLogin } from '../redux/actions';
import { MAIN_SCREEN_KEY, SCANNER_SCREEN_KEY } from '../screens';

class Auth extends React.Component {
  componentDidMount() {
    AsyncStorage.removeItem('fb_token');
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onFacebookLogin = () => {
    this.props.navigation.navigate(MAIN_SCREEN_KEY);
    /*this.props.facebookLogin()
      .catch(err => console.log(err));*/
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate(MAIN_SCREEN_KEY);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            This is a demo version. There are couple of limitations
          </Text>
          <Text style={styles.hint}>
            You can't connect to real device, an emulator is used instead
          </Text>
          <Text style={styles.hint}>
            An interface is extremely simplified
          </Text>
          <Text style={[styles.hint, { marginBottom: 10 }]}>
            There is only one client for convenience
          </Text>

          <View>
            <Button
              disabled
              raised
              title='Scan private key to login'
              buttonStyle={[styles.button]}
              containerViewStyle={{ marginBottom: 10 }}
              onPress={() => this.props.navigation.navigate(SCANNER_SCREEN_KEY)}
            />
            <Button
              raised
              title='Try demo. Use default account'
              buttonStyle={styles.button}
              onPress={() => this.props.navigation.navigate(MAIN_SCREEN_KEY)}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ token: auth.token });

const AuthScreen = connect(mapStateToProps, { facebookLogin })(Auth);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0288D1'
  },
  hint: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    margin: 10,
    marginBottom: 15
  },
  services: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#03A9F4'
  },
});

export { AuthScreen };
