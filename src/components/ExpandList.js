import React from 'react';
import { 
  View,
  ListView, 
  LayoutAnimation, 
  UIManager
} from 'react-native';

class ExpandList extends React.Component {
  static defaultProps = {
    isExclusive: false
  }

  constructor(props) {
    super(props);

    (UIManager.setLayoutAnimationEnabledExperimental 
      && UIManager.setLayoutAnimationEnabledExperimental(true));

    const ds = new ListView.DataSource({ 
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.extended = this.props.data.map(item => ({ 
      ...item, 
      isSelected: false 
    }));

    this.state = {
      dataSource: ds.cloneWithRows(this.extended)
    };
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  onToggled = id => () => {
    this.extended = this.extended.map(item => { 
        const def = this.props.isExclusive ? false : item.isSelected;
        return {
          ...item, 
          isSelected: (id === item.id ? !item.isSelected : def)
        };
      }
    );
    
    this.setState({ 
      dataSource: this.state.dataSource.cloneWithRows(this.extended) 
    });
  }

  renderRow = item => {
    let content = null;
    if (item.isSelected) {
      content = this.props.renderContent(item, this.onToggled(item.id));
    }

    const main = this.props.renderMain(item, this.onToggled(item.id), content);
    return (
      <View style={{ flex: 1 }}>
        {main}
      </View>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

export { ExpandList };
