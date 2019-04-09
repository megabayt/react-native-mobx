import React from 'react';

import { connectStyle, CardNB, Touchable } from './';
import { withShadow } from '../../common/decorators';

type Props = {
  onPress?: () => void,
};
const Card = withShadow({
  heightCoef: 0.98,
  widthCoef: 0.98,
  border: 8,
  opacity: 0.1,
  y: 8,
})((props: Props) => (<CardNB {...props} />));

// connect the component to the theme
const CardWithShadow = connectStyle('NativeBase.Card', {})(Card);

export default function TouchableCard(props: Props) {
  return (
    <Touchable onPress={props.onPress}><CardWithShadow {...props} /></Touchable>
  );
}
