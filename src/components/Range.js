import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

class Range extends Component {
  render() {
    const {
      name,
      active,
      onPress
    } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={[styles.text, active ? styles.active : {}]}>{name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  text: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  active: {
    color: '#FFFFFF',
  },
});

export { Range };
