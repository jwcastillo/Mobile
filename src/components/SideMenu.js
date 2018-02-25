import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, Text, View, TouchableHighlight, 
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Divider, ButtonGroup, Button } from 'react-native-elements';
import { HOME_SCREEN_KEY, CONNECT_SCREEN_KEY, CONTRACTS_SCREEN_KEY } from '../screens';
import { updateBalance } from '../redux/actions';
import { Loader } from '../components';
import { Token } from '../utils';

class SideMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      value: 1,
      isLoading: false,
      mes: ''
    };
  }

  
  componentDidMount() {
    console.log('SideMenu loaded');
    this.props.updateBalance(this.props.address, this.props.clientAddress, this.props.scriptHash);
  }


  updateIndex = index => {
    this.setState({ index });
  }

  mintTokens = () => {
    this.tokenManager = new Token('TestNet', this.props.scriptHash, 
      this.props.wallet._privateKey);
      
    this.setState({ isLoading: true, mes: '' });
    this.tokenManager.mintToken(1)
      .then(v => { 
        console.log('Mint tokens success', v);
        const mes = v.result === true ? 
          'Success' : 
          'Something went wrong, maybe you should wait till the porevious transaction proceed';
        this.setState({ isLoading: false, mes });
      })
      .catch(err => { 
        console.log('Mint tokens err', err);
        this.setState({ isLoading: false, mes: "Error: maybe you don't have NEO" });
      });
  };
  
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const { 
      balance: { 
        GAS, 
        NEO, 
        EC, 
        ClientEC 
      }, 
      address, 
      isUpdating, 
      clientAddress, 
      scriptHash 
    } = this.props;
    const load = isUpdating ? 
      <ActivityIndicator style={styles.button} size="small" color='#00aced' /> : 
      <Loader onPress={() => this.props.updateBalance(address, clientAddress, scriptHash)} />; 
    
    const mes = this.state.index === 0 ? (
      <Text 
        style={{ 
          marginBottom: 5, 
          fontSize: 13, 
          textAlign: 'center' 
        }}
      >
      {address}
      </Text>) : 
      (<View>
      <Text 
        style={{ 
          marginBottom: 5, 
          fontSize: 13, 
          textAlign: 'center' 
        }}
      >You have {NEO} NEO available</Text>
      <Text 
        style={{ 
          marginBottom: 5, 
          fontSize: 13, 
          textAlign: 'center' 
        }}
      >{this.state.mes}</Text>
      </View>);
    const panel = this.state.index === 0 ? (
      <View 
        style={{ 
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center' 
        }}
      >
        <View>
          <Text style={styles.balanceNeoGas}>{`NEO: ${NEO}`} </Text>
          <Text style={styles.balanceNeoGas}>{`GAS: ${GAS}`} </Text>
        </View>
        {load}
        
        <View>
        <Text style={styles.balanceNeoGas}>{`Carrier EC: ${EC}`} </Text>
          <Text style={styles.balanceNeoGas}>{`Client EC: ${ClientEC}`} </Text>
        </View>
      </View>
    ) : 
      (<Button 
        loading={this.state.isLoading}
        onPress={this.mintTokens}
        color='grey'
        fontSize={13}
        backgroundColor='transparent' 
        title={'Tap to get 10 EC for 1 NEO'}
      />);
    return (
      <View style={{ flex: 1 }}>
        <View style={{ }}>
          <Text style={{ fontSize: 30, textAlign: 'center', paddingTop: 10 }}>Carrier</Text>
        </View>
        <View style={styles.header}>
          <Avatar
            avatarStyle={{ borderColor: '#F0F0F0', borderWidth: 1 }}
            xlarge
            rounded
            title={'User'}
            source={{ uri: 'https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-business-man-399587fe24739d5a-512x512.png' }}
            activeOpacity={0.7}
          />
        </View>
        {mes}
        <View style={styles.balance}>
          {panel}
        </View>
        <View style={styles.content}>
        <Divider style={{ backgroundColor: '#F0F0F0' }} />
        <ButtonGroup
          selectedBackgroundColor="pink"
          onPress={this.updateIndex}
          selectedIndex={this.state.index}
          buttons={['Balance', 'Mint']}
          containerStyle={{ height: 30, margin: 0 }} 
        />
        <View style={{ borderColor: '#9E9E9E', padding: 10 }}>
          <TouchableHighlight 
            onPress={this.navigateToScreen(CONTRACTS_SCREEN_KEY)} 
            underlayColor={'#E2EDF8'}
          >
            <Text style={styles.link}>Contract</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            onPress={this.navigateToScreen(CONNECT_SCREEN_KEY)} 
            underlayColor={'#E2EDF8'}
          >
            <Text style={styles.link}>Connect</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            onPress={this.navigateToScreen(HOME_SCREEN_KEY)} 
            underlayColor={'#E2EDF8'}
          >
            <Text style={styles.link}>Help</Text>
          </TouchableHighlight>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  link: { 
    fontSize: 20, 
    textAlign: 'center', 
    padding: 10 
  },
  header: {
    flex: 40, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  balance: {
    flex: 15,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center' 
  },
  balanceEC: {
    fontSize: 16,
  },
  balanceNeoGas: {
    fontSize: 14,
    margin: 5
  },
  content: {
    flex: 50
  },
  button: {
    margin: 10
  },
  slider: { 
    marginLeft: 20,
    marginRight: 20 
  },
});

const mapStateToProps = ({ profile }) => profile;

export default connect(mapStateToProps, { updateBalance })(SideMenu);
