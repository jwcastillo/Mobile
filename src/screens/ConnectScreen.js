import React from 'react';
import { 
  View,
  StyleSheet,
  Text
} from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { BLUETOOTH_SCREEN_KEY } from '../screens';
import { ExpandList } from '../components';

class ConnectScreen extends React.Component {
  constructor(props) {
    super(props);

    this.data = [
      {
        title: 'Bluetooth',
        icon: 'bluetooth',
        type: 'Feather',
        description: 'Please, use your bluetooth to find an appropriate device',
        id: 0,
        disabled: true,
        onPress: () => this.props.navigation.navigate(BLUETOOTH_SCREEN_KEY)
      },
      {
        title: 'QR code',
        icon: 'qrcode',
        type: 'font-awesome',
        description: 'Please, scan qr-code of device',
        id: 1,
        disabled: true,
        onPress: () => console.log('QR scan')
      }
    ];
  }

  renderContent = item => (
    <View style={styles.additional}>
      <Text style={styles.description}> {item.description} </Text>
      <Button
        rounded
        disabled={item.disabled}
        buttonStyle={styles.button}
        title='connect'
        fontSize={18}
        backgroundColor='#00aced'
        onPress={item.onPress}
      />
    </View>
  )

  renderMain = (item, onToggled, content) => (
    <Card containerStyle={{ margin: 6 }}> 
      <View style={styles.container}>
        <Icon 
          reverse
          raised
          size={15}
          color='#00aced'
          name={item.icon}
          type={item.type}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Icon 
          raised
          size={15}
          onPress={() => onToggled(item.id)} 
          name={item.isSelected ? 'angle-up' : 'angle-down'}
          type='font-awesome'
          color='#878787'
        />
      </View>
      {content}
    </Card>
  )

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
        <ExpandList 
          data={this.data} 
          renderMain={this.renderMain}
          renderContent={this.renderContent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  additional: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 100
  },
  card: {
    backgroundColor: '#0288D1'
  },
  title: {
    fontSize: 17,
    margin: 15,
    textAlign: 'center'
  },
  button: {
    margin: 8,
    padding: 5
  },
  description: { 
    textAlign: 'center', 
    color: '#878787' 
  },
  main: { 
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'space-between' 
  },
  text: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  }
});

export { ConnectScreen };
