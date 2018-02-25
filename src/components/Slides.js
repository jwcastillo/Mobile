import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const MARGIN = SCREEN_WIDTH * 0.015;
const SIZE = MARGIN * 2;

class Slides extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollX: new Animated.Value(0),
    };
  }

  getPaginationStyle = () => {
    // todo: rewrite
    const { scrollX } = this.state;
    const { data } = this.props;

    const left = scrollX.interpolate({
      inputRange: [0, SCREEN_WIDTH],
      outputRange: [MARGIN, MARGIN * 5],
    });

    const arr = Array.from({ length: (data.length * 2) - 1 });

    const opacity = scrollX.interpolate({
      // rewrite dinamically
      inputRange: arr.map((_, i) => (SCREEN_WIDTH * i) / 2),
      outputRange: arr.map((_, i) => (i % 2 === 0 ? 1 : 0)),
    });

    return {
      left,
      opacity,
    };
  }

  renderPaginator() {
    const pages = this.props.data.map((item, i) =>
      <View
        key={i}
        style={[styles.paginatorElement]}
      />
    );

    return (
      <View style={styles.paginator}>
        {pages}
      </View>
    );
  }

  renderSlides() {
    const { data, renderLastSlide, renderSlide } = this.props;

    return data.map((slide, i) => (
        <View
          key={i}
          style={[styles.slide, { backgroundColor: slide.color }]}
        >
          {
            (i === data.length - 1) ?
              renderLastSlide(i, slide) : 
              renderSlide(i, slide)
          }
        </View>
      )
    );
  }

  render() {
    const onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }]
    );

    return (
      <View style={styles.container}>
        <ScrollView
          // https://github.com/facebook/react-native/issues/16522
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.container}
          onScroll={onScroll}
        >
          {this.renderSlides()}
        </ScrollView>
        <View style={styles.paginatorContainer}>
          {this.renderPaginator()}
          <Animated.View style={[styles.activePaginatorElement, this.getPaginationStyle()]} />
        </View>
      </View>
    );
  }
}

Slides.defaultProps = {
  renderLastSlide: (i, slide) => (
    <View key={i}>
      <Text style={styles.text}>{slide.text}</Text>
      <Text style={styles.text}>This is last slide</Text>
    </View>
  ),
  renderSlide: (i, slide) =>
    <View key={i}>
      <Text style={styles.text}>{slide.text}</Text>
    </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: '#0288D1',
  },
  paginatorContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.9,
    height: SIZE,
    alignSelf: 'center',
  },
  paginator: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginatorElement: {
    marginRight: MARGIN,
    marginLeft: MARGIN,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#0288D1',
    height: SIZE,
    width: SIZE,
  },
  activePaginatorElement: {
    top: -MARGIN,
    left: MARGIN,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    height: SIZE,
    width: SIZE,
  },
});

export { Slides };
