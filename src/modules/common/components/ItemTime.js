import React, { Component } from 'react';
import { connectStyle, Item, View, Text, Touchable } from './';
import { resetPadding } from '../../../constants/style';

type Props = {
  items: [{
    id: number,
    disabled: boolean,
    value: string,
  }],
  selectedItem?: string,
  style?: {},
  onChange: () => void,
};
class ItemTime extends Component<Props> {
  props: Props;

  onChange = (value: string) => () => {
    this.props.onChange(value);
  };

  render() {
    const {
      items,
      selectedItem,
      style,
    } = this.props;
    return <Item
      key={JSON.stringify(items)}
      right
      pushTop
      pushBottom
      style={[resetPadding, style.wrapper]}
    >
      {items.map(item => [
        <View
          key={item.value}
          style={style.itemWrapper}
        >
          <Touchable
           style={[
              style.item,
              item.value === selectedItem && style.itemSelected,
            ]}
           onPress={this.onChange(item.value)}
          >
            <Text
              style={[
                style.itemText,
                item.value === selectedItem && style.itemTextSelected,
                item.disabled && style.itemTextDisabled,
              ]}
            >
              {item.value}
              </Text>
          </Touchable>
        </View>,
      ])}
    </Item>;
  }
}

export default connectStyle('NativeBase.ItemTime', {})(ItemTime);
