import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ScrollableHeader extends React.Component {
  static defaultProps = {
    data: [],
    renderItem: () => <Text> Item </Text>
  }

  constructor(props) {
    super(props);
  
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  getImageStyle() {
    const opacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    return {
      opacity
    };
  }

  getHeaderStyle() {
    const height = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    return {
      height
    };
  }

  render() {
    return (
      <Animated.View style={styles.fill}>
        <FlatList
          style={styles.fill}
          scrollEventThrottle={16}
          renderItem={this.props.renderItem}
          data={this.props.data}
          keyExtractor={this.props.keyExtractor}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }] 
            /* for debugging purposes
            ,{ 
              listener: event => {
                const offsetY = event.nativeEvent.contentOffset.y;
                console.log(offsetY);
                const h = this.state.scrollY.interpolate({
                  inputRange: [0, HEADER_SCROLL_DISTANCE],
                  outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
                  extrapolate: 'clamp',
                });
                console.log(h);
              }
            }
            */
          )}
        />
        <Animated.View style={[styles.header, this.getHeaderStyle()]}>
          <Animated.View
            style={[
              styles.backgroundImage,
              this.getImageStyle()
            ]}
          />
          <Animated.View style={styles.bar}>
            <Text style={styles.title}>Title</Text>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    height: HEADER_MAX_HEIGHT,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 30,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
    backgroundColor: 'black'
  },
});

export { ScrollableHeader };
