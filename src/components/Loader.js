import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback 
} from 'react-native';
import { Icon } from 'react-native-elements';

class Loader extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}> 
        <Icon
          size={25}
          color='#00aced'
          name={'autorenew'}
          type={'action'}
          iconStyle={styles.button}
          containerStyle={{ alignSelf: 'center' }}
        />
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 8,
    padding: 5
  }
});

export { Loader };
