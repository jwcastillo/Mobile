import React from 'react';
import {
  StyleSheet, 
  Dimensions,
  View
} from 'react-native';
import { Path } from '../utils';

class Chart extends React.Component {
  static defaultProps = {
    fillColor: 'rgba(103, 58, 183, 1)',       // solid violet color
    strokeColor: 'rgba(103, 58, 183, 0.25)',  // semi-transparent violet
    strokeWidth: 8,
    indicatorWidth: 1,
    indicatorColor: 'grey'
  };

  constructor(props) {
    super(props);

    this.state = {
      width: Dimensions.get('window').width,
      height: 0
    };
  }

  onLayout(event) {
    const {
      nativeEvent: {
        layout: {
          width,
          height
        }
      }
    } = event;


    this.setState({
      width,
      height,
    });
  }

  getPath() {
    const { values, strokeWidth } = this.props;
    const { height, width } = this.state;

    const min = Math.min(...values);
    const max = Math.max(...values) - min;

    const adjusted = values.map(v => v - min);
    const stepX = width / (values.length - 1 || 1);
    const stepY = max ? (height - strokeWidth) / max : 0;
    const curveStep = stepX / 3;
    let previous = {};

    const path = new Path();
    adjusted.forEach((v, i) => {
      const x = i * stepX;
      const y = height - (v * stepY);

      if (i === 0) {
        path.moveTo(0, height);
        path.lineTo(0, y);
      } else {
        path.curveTo(previous.x + curveStep, previous.y, x - curveStep, y, x, y);
      }

      previous = { x, y };
    });

    return path
      .lineTo(width, height)
      .result();
  }

  render() {
    const {
      fillColor,
      strokeColor,
      strokeWidth,
    } = this.props;

    const d = this.getPath();
    return (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
});

export { Chart };
