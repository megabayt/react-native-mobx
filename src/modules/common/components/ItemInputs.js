import React from 'react';
import { Item, InputNB, MaskedInput, View, Text } from './';
import variables from '../../../constants/variables';
import { resetPadding } from '../../../constants/style';

type Props = {
  inputs: [{
    key: string,
    placeholder: string,
    value: string,
    textarea?: boolean,
  }],
  error?: string,
  onChangeText: (number) => () => void,
  style?: {},
};
export default function ItemInputs(props: Props) {
  const {
    inputs, error, style, onChangeText,
  } = props;
  return [
      <Item
        key='item'
        pushTop
        pushBottom
        error={!!error}
        style={[style, resetPadding]}
      >
      {inputs.map((input, i) => {
        const Component = input.options && input.options.mask ? MaskedInput : InputNB;
        return [
          <Component
            pushLeft
            multiline={input.textarea}
            key={input.key}
            placeholder={input.placeholder}
            value={input.value}
            onChangeText={onChangeText(input.key)}
            placeholderTextColor={variables.primaryColor4}
            keyboardType={input.keyboardType}
            type={input.type}
            options={input.options}
            style={{ textAlignVertical: 'top' }}
            ref={input.ref}
          />,
          (i !== inputs.length - 1) && <View key={`hr${input.id}`} hr />,
        ];
      })}
    </Item>,
      !!error && <Text warning pushLeft pushRight pushBottom textCenter>{error}</Text>,
  ];
}
