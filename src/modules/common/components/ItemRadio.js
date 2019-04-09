import React, { Component } from 'react';
import { connectStyle, Item, View, Text, Icon, Touchable } from './';
import { resetPadding } from '../../../constants/style';

type Props = {
  items: [{
    id: number,
    value: string,
  }],
  checkedItemId: number,
  onPress: (number) => () => void,
  style?: {},
};
class ItemRadio extends Component<Props> {
  props: Props;

  onPress = (id: number) => () => {
    this.props.onPress(id);
  };

  render() {
    const {
      items,
      checkedItemId,
      style,
    } = this.props;

    return <Item
      key={JSON.stringify(items)}
      right
      pushTop
      pushBottom
      style={resetPadding}
    >
      {items.map((item, i) => [
        <Touchable
          key={item.id}
          flexRow
          alignCenter
          justifyCenter
          onPress={this.onPress(item.id)}
        >
          <View style={style.circleWrapper}>
            <View style={style.circle}>
              {(item.id === checkedItemId) && <Icon name={'check'} style={style.circleIcon}/>}
            </View>
          </View>
          <Text style={style.valueText}>{item.value}</Text>
        </Touchable>,
        (i !== items.length - 1) && <View key={`hr${item.id}`} hr/>,
      ])}
    </Item>;
  }
}

export default connectStyle('NativeBase.ItemRadio', {})(ItemRadio);
