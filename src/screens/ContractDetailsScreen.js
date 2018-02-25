import React from 'react';
import { 
  View,
  StyleSheet
} from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { CONTRACTS_MANAGE_SCREEN_KEY } from '../screens';

class ContractDetails extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    headerRight: (
      <Button
        buttonStyle={styles.backButton}
        title='Back'
        fontSize={15}
        loading={false}
        color="grey"
        title="back"
        onPress={() => navigation.navigate(CONTRACTS_MANAGE_SCREEN_KEY)} 
      />
    )
  })

  render() {
    const info = this.props.contractInfo;
    console.log(this.props.contractInfo);
    return (
      <View style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
        <List>
          <ListItem
            hideChevron
            wrapperStyle={{ margin: 5 }}
            rightTitle={info.name}
            key={'Name'}
            title={'Name'}
          />
          <ListItem
            hideChevron
            wrapperStyle={{ margin: 5 }}
            rightTitle={info.description}
            key={'Description'}
            title={'Description'}
          />  
          <ListItem
            hideChevron
            wrapperStyle={{ margin: 5 }}
            rightTitle={info.formula}
            key={'Formula'}
            title={'Formula'}
          />  
          <ListItem
            hideChevron
            wrapperStyle={{ margin: 5 }}
            rightTitle={info.from}
            key={'From'}
            title={'From'}
          />  
          <ListItem
            hideChevron
            wrapperStyle={{ margin: 5 }}
            rightTitle={info.to}
            key={'To'}
            title={'To'}
          />  
          <ListItem
            hideChevron
            wrapperStyle={{ margin: 5 }}
            rightTitle={info.deposit === 0 ? 'No deposit' : `${info.deposit}`}
            key={'Deposit'}
            title={'Deposit'}
          /> 
          <ListItem
            rightTitleStyle={{ color: info.status.color }}
            hideChevron
            wrapperStyle={{ margin: 5 }}
            rightTitle={info.status.text}
            key={'Status'}
            title={'Status'}
          />   
        </List>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
          <Button 
            buttonStyle={styles.button} 
            title="back" 
            onPress={() => 
              this.props.navigation.navigate(CONTRACTS_MANAGE_SCREEN_KEY)} 
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0288D1'
  },
  title: {
    fontSize: 17,
    margin: 15,
    textAlign: 'center'
  },
  backButton: {
    backgroundColor: 'transparent',
    height: 40,
    width: 60,
    marginLeft: 10
  },
  button: {
    height: 50,
    width: 80,
    backgroundColor: '#0288D1'
  }
});

const mapStateToProps = ({ watch }) => ({ ...watch });
const ContractDetailsScreen = connect(mapStateToProps, null)(ContractDetails);
export { ContractDetailsScreen };
