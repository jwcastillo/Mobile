import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  Platform
  //BackHandler
} from 'react-native';
import { FormInput, Button, Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import { Slides } from '../components';
import { ContractBuilder, Converter, CarrierContract } from '../utils';
import { CONTRACTS_SCREEN_KEY } from './index';

const SCREEN_WIDTH = Dimensions.get('window').width;

const data = [
  { 
    text: 'Lets configure your delivery contract. You will be asked a several questions', 
    hint: 'Swipe right to proceed',
    color: 'white',
    keyProp: 'text' 
  },
  { 
    text: "Lets's fill out general information about your contract", 
    color: 'white',
    keyProp: 'text'
  },
  {
    text: 'Specify temperature commitment',
    color: 'white',
    keyProp: 'text'
  },
  {
    text: 'Specify deposit amount',
    hint: "If you don't want to set deposit, set deposit to 0",
    color: 'white',
    keyProp: 'text'
  },
  {
    text: "Let's bind your sensor device to contract",
    hint: 'Please, scan QR code on the device',
    color: 'white',
    keyProp: 'text'
  },
  {
    text: "That's it",
    color: 'white',
    keyProp: 'text'
  }
];

class CreateContract extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.builder = new ContractBuilder();
    this.carrierContarct = new CarrierContract('TestNet', 
      this.props.scriptHash, this.props.wallet._privateKey);
    
    this.state = {
      addV: 0,
      mulV: 1,
      cmpL: 2,
      cmpR: 10,
      disabled: [false, false, this.props.balance.EC === 0],
      info: {},
      program: '',
      isLoading: false,
      deposit: 0,
      mes: '',
      disableSubmit: false
    };
  }

  getFormula() {
    const { cmpR, cmpL } = this.state;
    return `${cmpL} < x < ${cmpR}`;
  }

  deployContract = () => {
    const info = JSON.stringify({
      deposit: this.state.deposit,
      formula: this.getFormula(),
      ...this.state.info
    });
    
    this.setState({ isLoading: true, mes: '' });
    if (this.state.deposit === 0) {
      console.log('Without depositing');
      this.carrierContarct.addContract(0, Converter.asciiToHex(info), this.builder.program)
        .then(() => this.setState({ 
          isLoading: false, 
          mes: 'Success', 
          disableSubmit: true 
        }))
        .catch(() => this.setState({ 
          isLoading: false, 
          mes: 'Something went wrong. Please, try later.', 
          disableSubmit: true 
        }));
    } else {
      console.log('With depositing');
      this.carrierContarct.addContractWithDeposit(0, Converter.asciiToHex(info), 
        this.builder.program, Converter.reverseHex(this.props.clientHash), this.state.deposit)
        .then(v => {
          console.log(v);
          this.setState({ 
            isLoading: false, 
            mes: 'Success',
            disableSubmit: true
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({ 
            isLoading: false, 
            mes: 'Something went wrong. Please, try later.',
            disableSubmit: true 
          });
        });
    }
  }

  renderSlideContent = i => {
    const { builder } = this;
    const index = i - 1;
    const { disabled, info, cmpR, cmpL } = this.state;
    switch (index) {
      case 0:
        return (
          <View style={{ alignSelf: 'center' }}>
            {
              <View>
                <FormInput 
                  textAlign='center'
                  disabled={disabled[0]}
                  spellCheck={false}
                  autoCorrect={false}
                  underlineColorAndroid='#0288D1'
                  placeholder="contract name"
                  onChangeText={name =>
                      this.setState({ info: { ...info, name } })
                  }
                />
                <FormInput 
                  disabled={disabled[0]}
                  textAlign='center'
                  spellCheck={false}
                  autoCorrect={false}
                  underlineColorAndroid='#0288D1'
                  placeholder="description"
                  onChangeText={description => 
                    this.setState({ info: { ...info, description } })
                  }
                />
                <FormInput 
                  textAlign='center'
                  disabled={disabled[0]}
                  spellCheck={false}
                  autoCorrect={false}
                  underlineColorAndroid='#0288D1'
                  placeholder="from"
                  onChangeText={from => 
                    this.setState({ info: { ...info, from } })
                  }
                />
                <FormInput 
                  textAlign='center'
                  disabled={disabled[0]}
                  spellCheck={false}
                  autoCorrect={false}
                  underlineColorAndroid='#0288D1'
                  placeholder="to"
                  onChangeText={to => 
                    this.setState({ info: { ...info, to } })
                  }
                />
                <FormInput 
                  textAlign='center'
                  disabled={disabled[0]}
                  spellCheck={false}
                  autoCorrect={false}
                  underlineColorAndroid='#0288D1'
                  placeholder="goods type"
                  onChangeText={goods => 
                    this.setState({ info: { ...info, goods } })
                  }
                />
                <Button
                  disabled={disabled[0]}
                  title="submit"
                  buttonStyle={styles.button}
                  onPress={() => this.setState({ disabled: [true, disabled[1], disabled[2]] })} 
                />
              </View>
            }
          </View>
        );
      case 1: {
        const hint = this.getFormula();
        return (
          <View style={{ alignSelf: 'center' }}>
            {
              <View>
                <Text style={styles.hint}>
                  {hint}
                </Text>
                <Slider
                  disabled={disabled[1]}
                  style={styles.slider}
                  thumbTintColor='#0288D1'
                  step={1}
                  value={cmpL}
                  minimumValue={0}
                  maximumValue={30}
                  onValueChange={v => this.setState({ cmpL: v })}
                />
                <Slider
                  disabled={disabled[1]}
                  style={styles.slider}
                  thumbTintColor='#0288D1'
                  step={1}
                  value={cmpR}
                  minimumValue={0}
                  maximumValue={30}
                  onValueChange={v => this.setState({ cmpR: v })}
                />
                <Button
                  disabled={disabled[1]}
                  title="submit"
                  buttonStyle={styles.button}
                  onPress={
                    () => {
                      builder.programCmp(cmpL, cmpR);
                      console.log(builder.program);
                      this.setState({ 
                        disabled: [disabled[0], true, disabled[2]],
                        program: builder.program 
                      });
                    } 
                  } 
                />
              </View>
            }
          </View>
        );
      }
      case 2: {
        return (
          <View style={{ alignSelf: 'center' }}>
            {
              
              <View>
                <Text style={[styles.hint, { marginTop: 20 }]}>
                  You have {this.props.balance.EC} EC available
                </Text>
                {
                  this.props.balance.EC ? 
                    (<View>
                      <Text style={styles.hint}>
                        Deposit: {this.state.deposit} EC
                      </Text>
                      <Slider
                        disabled={disabled[2]}
                        style={styles.slider}
                        thumbTintColor='#0288D1'
                        step={1}
                        value={this.state.deposit}
                        minimumValue={0}
                        maximumValue={this.props.balance.EC}
                        onValueChange={v => this.setState({ deposit: v })}
                      />
                      <Button
                        disabled={disabled[2]}
                        title="submit"
                        buttonStyle={styles.button}
                        onPress={
                          () => {
                            this.setState({ 
                              disabled: [disabled[0], disabled[1], true]
                            });
                          } 
                        } 
                      />
                    </View>) : <View />
                }
              </View>
            }
          </View>
        );
      }
      case 3: {
        return (
          <View style={{ alignSelf: 'center' }}>
            <Text style={[styles.hint, { margin: 10, fontSize: 13 }]}>
              Sorry, this option is not available in demo version
            </Text>
            <Button
              disabled
              title="Scan"
              buttonStyle={styles.button}
            />
          </View>
        );
      }
      default:
        return null;
    }
  }
  
  renderSlide = (i, slide) => (
      <View key={i}>
        <Text style={styles.text}>{slide.text}</Text>
        <Text style={styles.hint}>{slide.hint}</Text>
        {this.renderSlideContent(i)}
      </View>
    )

  renderLastSlide = (i, slide) => {
    const deposit = this.state.deposit === 0 ? 
      'With no deposit' : `Deposit : ${this.state.deposit}`;
    const formula = this.getFormula();
    const isOk = this.state.disabled.find(v => v === false) === undefined;
    const title = this.state.isLoading ? 'submiting...' : 'submit contract';
    const content = isOk ?
      (<View>
        <Text style={styles.text}>{slide.text}</Text>
        <Text style={styles.hint}>Push the button to submit transaction</Text>
        <Text style={[styles.hint, { marginTop: 20 }]}>{formula}</Text>
        <Text style={styles.hint}>{deposit}</Text>
        <Text style={styles.hint}>{this.state.mes}</Text>
        
      </View>) :
      (<View>
        <Text style={styles.hint}>Please, submit all the configuration values</Text>
      </View>);
    return (
      <View key={i}>
        {content}
        <Button
          title={title}
          loading={this.state.isLoading}
          disabled={!isOk || this.state.disableSubmit}
          
          buttonStyle={styles.button}
          onPress={this.deployContract} 
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {
          Platform.OS === 'android' ? 
            <Button
              title={this.state.isLoading ? '' : 'Back'}
              loading={this.state.isLoading}
              //disabled={!isOk}
              color="grey"
              buttonStyle={styles.backButton}
              onPress={() => this.props.navigation.navigate(CONTRACTS_SCREEN_KEY)} 
            /> : undefined
        }
        <Slides 
          data={data}
          renderSlide={this.renderSlide}
          renderLastSlide={this.renderLastSlide}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: 'transparent',
    height: 40,
    width: 60,
    position: 'absolute',
    left: SCREEN_WIDTH - 85,
    zIndex: 100,
    top: 10
  },
  container: {
    flex: 1
  },
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
  button: {
    alignSelf: 'center',
    width: 150,
    backgroundColor: '#0288D1',
    margin: 10
  },
  slider: { 
    width: 300,
    marginLeft: 20,
    marginRight: 20 
  },
  result: {
    fontSize: 20,
    textAlign: 'center'
  }
});

const mapStateToProps = ({ profile }) => profile;
const CreateContractScreen = connect(mapStateToProps, null)(CreateContract);
export { CreateContractScreen };
