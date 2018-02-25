import React from 'react';
import { 
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Card } from 'react-native-elements';
import { CONTRACT_DETAILS_SCREEN_KEY, EMULATION_SCREEN_KEY } from '../screens';
import { ExpandList, Loader } from '../components';
import { CarrierContract } from '../utils';
import { updateContractInfo } from '../redux/actions';

class ContractsManage extends React.Component {
  static navigationOptions = () => ({
      title: 'Contracts'
    })

  constructor(props) {
    super(props);

    this.carrierContarct = new CarrierContract('TestNet', 
      this.props.scriptHash, this.props.wallet._privateKey);

    this.state = {
      contracts: [],
      isLoading: false,
      mes: ''
    };
  }

  componentDidMount() {
    this.loadContracts();
  }

  loadContracts = () => {
    this.setState({ isLoading: true, mes: '', contracts: [] });
    this.carrierContarct.getContractsAmount()
      .then(amount => {
        console.log('amount', amount);
        const ids = [];
        for (let i = 1; i <= amount; ++i) {
          ids.push(i);
        }
        return Promise.all(ids.map(v => this.carrierContarct.getContract(v)));
      })
      .then(contracts => {
        console.log('contracts : ', contracts);
        this.setState({ 
          isLoading: false, 
          contracts: contracts.map((v, i) => ({ ...v, id: i + 1 })).reverse() 
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ mes: err, isLoading: false });
      });
  }

  renderContent = item => {
    const emulateButton = item.status.code === 0 && item.formula !== undefined ?
      (<Button
        rounded
        title='emulate'
        color='#00aced'
        fontSize={15}
        backgroundColor='transparent'
        onPress={() =>
          this.props.navigation.navigate(EMULATION_SCREEN_KEY)
        }
      />) : undefined;

    const detailsButton = item.formula !== undefined ? 
        (<Button
          rounded
          title='details'
          color='#00aced'
          fontSize={15}
          backgroundColor='transparent'
          onPress={() =>
            this.props.navigation.navigate(CONTRACT_DETAILS_SCREEN_KEY)
          }
        />) : undefined;
    return (
      <View 
        style={(item.status.code === 0 && item.formula !== undefined ? 
          styles.additional : styles.additionalAnother)}
      >
        {detailsButton}
        {emulateButton}
      </View>
    );
  }

  renderMain = (item, onToggled, content) => (
    <TouchableWithoutFeedback 
      onPress={() => {
        console.log(item.id);
        console.log(item);
        onToggled(item.id);
        this.props.onUpdateContractInfo(item);
      }}
    >
      <Card containerStyle={{ margin: 0 }}> 
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={styles.left}>
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.detail}>{`from: ${item.from}`}</Text>
              <Text style={styles.detail}>{`to: ${item.to}`}</Text>
            </View>
          </View>
          <View style={styles.right}>
            <View>
              <Text style={[styles.title, { color: item.status.color }]}>{item.status.text}</Text>
              <Text style={styles.detail}>{item.goods}</Text>
              <Text style={styles.detail}>
                {item.deposit === 0 ? 'No deposit' : `Deposit : ${item.deposit}`}
              </Text>
            </View>
          </View>
        </View>
        {content}
      </Card>
    </TouchableWithoutFeedback>
  )

  render() {
    const haveNoContracts =
      (<Text style={styles.hint}>
        There is no contracts. 
        If you recentely submitted one, 
        please wait till transaction have completed
      </Text>);
    return (
      <View style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
        {
          this.state.isLoading ? 
            <ActivityIndicator style={styles.button} size="small" color='#00aced' /> : 
            <View>
              <Loader onPress={this.loadContracts} />
                <Text style={styles.hint}>
                  Don't forget to update
                </Text>
            </View>
        } 

        {
          this.state.contracts.length === 0 ?
            haveNoContracts :
            <ExpandList 
              isExclusive
              data={this.state.contracts} 
              renderMain={this.renderMain}
              renderContent={this.renderContent}
            />
        }
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  additional: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    marginTop: 10
  },
  additionalAnother: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    marginTop: 10
  },
  card: {
    backgroundColor: '#0288D1'
  },
  title: {
    fontSize: 17
  },
  button: {
    margin: 8,
    padding: 5
  },
  description: { 
    textAlign: 'center', 
    color: '#878787' 
  },
  left: { 
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start' 
  },
  right: { 
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end' 
  },
  text: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
  hint: {
    fontSize: 15,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  detail: {
    fontSize: 13,
  }
});

const mapStateToProps = ({ profile, watch }) => ({ ...profile, ...watch });
const mapDispatchToProps = dispatch => ({
  onUpdateContractInfo: contractInfo => {
    dispatch(updateContractInfo(contractInfo));
  }
});
const ContractsManageScreen = connect(mapStateToProps, mapDispatchToProps)(ContractsManage);
export { ContractsManageScreen };
