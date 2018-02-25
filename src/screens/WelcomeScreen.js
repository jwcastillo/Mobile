import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Slides } from '../components';
import { AUTH_SCREEN_KEY } from '../screens';

const data = [
  { 
    text: 'Welcome to our app!', 
    color: '#03A9F4',
    keyProp: 'text' 
  },
  { 
    text: "It'll help you to transport your goods properly", 
    color: '#0288D1',
    keyProp: 'text'
  },
  { 
    text: "Let's try it!", 
    color: '#03A9F4',
    keyProp: 'text'
  }
];

class WelcomeScreen extends React.Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate(AUTH_SCREEN_KEY);
  }

  renderSlide = (i, slide) => 
    <View key={i}>
      <Text style={styles.text}>{slide.text}</Text>
    </View>

  renderLastSlide = (i, slide) =>
    <View key={i}>
      <Text style={styles.text}>{slide.text}</Text>
      <Button
        raised
        title='Dive in!'
        buttonStyle={styles.button}
        onPress={this.onSlidesComplete}
      />
    </View>

  render() {
    return (
      <View style={{ flex: 1 }}>
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
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: '#0288D1',
  }
});

export { WelcomeScreen };
