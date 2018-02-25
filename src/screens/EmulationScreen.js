import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions
  //Platform, 
  //BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Slider } from 'react-native-elements';
import { CONTRACTS_MANAGE_SCREEN_KEY } from '.';
import { CarrierContract, Converter } from '../utils';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Emulation extends React.Component {
  static navigationOptions = () => ({
    header: null
  })

  constructor(props) {
    super(props);
    this.carrierContarct = new CarrierContract('TestNet', 
      this.props.scriptHash, this.props.wallet._privateKey);

    this.state = {
      isLoading: false,
      value: 15,
      mes: '',
      disableSubmit: false
    };
  }

  submitMeasure = () => { 
    console.log('submitmesure');
    console.log(this.props);
    console.log(this.props.contractInfo.id);
    this.setState({ isLoading: true });
    
    this.carrierContarct.invokeContract(0, 
      this.props.contractInfo.id, Converter.numTo4byteHex(this.state.value))
      .then(v => { 
        this.setState({ 
          isLoading: false, 
          mes: 'Success', 
          disableSubmit: true 
        });
        console.log(v); 
      })
      .catch(err => { 
        this.setState({ 
          isLoading: false, 
          mes: 'Something went wrong. Please, try later.',
          disableSubmit: true 
        }); 
        console.log(err); 
      });
  }

  render() {
    const { formula } = this.props.contractInfo;
    const paramIndex = formula.indexOf('x');
    const dynamicFormula = [
      formula.slice(0, paramIndex), 
      this.state.value, 
      formula.slice(paramIndex + 1)
    ];

    return (
      <View style={{ flex: 1 }}>
        <Button
          loading={this.state.isLoading}
          title={this.state.isLoading ? '' : 'Back'}
          //disabled={!isOk}
          color="grey"
          buttonStyle={styles.backButton}
          onPress={() => this.props.navigation.navigate(CONTRACTS_MANAGE_SCREEN_KEY)} 
        />
        <View 
          style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'white' 
          }}
        >
          <Text style={styles.text}>Emulation of sensor device</Text>
          <Text style={styles.hint}>
            It's impossible to connect to test device right now,
            so enter temperature value manually
          </Text>
          <View style={{ marginTop: 20 }}>
            <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
              <Text style={styles.hint}>{dynamicFormula}</Text>
              <Text style={[styles.hint, { fontSize: 13 }]}>{this.state.mes}</Text>
            </View>
            <Slider
              style={styles.slider}
              thumbTintColor='#0288D1'
              step={1}
              value={this.state.value}
              minimumValue={0}
              maximumValue={30}
              onValueChange={v => this.setState({ value: v })}
            />
            <Button
              disabled={this.state.disableSubmit}
              loading={this.state.isLoading}
              title="emulate"
              buttonStyle={styles.button}
              onPress={this.submitMeasure} 
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
    fontSize: 20,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  hint: {
    fontSize: 15,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  backButton: {
    backgroundColor: 'transparent',
    height: 40,
    width: 60,
    position: 'absolute',
    left: SCREEN_WIDTH - 85,
    zIndex: 100,
    top: 10
  },
  slider: { 
    width: 300,
    marginLeft: 20,
    marginRight: 20 
  },
  button: {
    alignSelf: 'center',
    width: 150,
    backgroundColor: '#0288D1',
    margin: 10
  },
});


const mapStateToProps = ({ profile, watch }) => ({ ...watch, ...profile });
const EmulationScreen = connect(mapStateToProps, null)(Emulation);

export { EmulationScreen };
