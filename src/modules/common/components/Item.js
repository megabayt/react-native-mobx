import React, { Component } from 'react';

import { connectStyle, ItemNB } from './';
import { withShadow, Params } from '../../common/decorators';

const itemShadowParams: Params = {
  widthCoef: 1,
  heightCoef: 0.95,
  border: 13,
  opacity: 0.1,
  y: 0,
};

type Props = {
  right?: boolean,
};
const itemShadowLeftParams: Params = {
  ...itemShadowParams,
  x: -5,
};
const itemShadowRightParams: Params = {
  ...itemShadowParams,
  x: 5,
};
const ItemLeft: () => React.ComponentType
  = withShadow(itemShadowLeftParams)((props: Props) => (<ItemNB {...props} />));

const ItemRight: () => React.ComponentType
  = withShadow(itemShadowRightParams)((props: Props) => (<ItemNB {...props} />));

class ItemWrapper extends Component<Props> {
  props: Props;
  render() {
    return !this.props.right ? (<ItemLeft {...this.props} />) : (<ItemRight {...this.props} />);
  }
}

// connect the component to the theme
export default connectStyle('NativeBase.Item', {})(ItemWrapper);


// import React, { Component } from 'react';
// import { View } from 'react-native';
// import { connectStyle, Touchable } from './';
// import { withShadow } from '../../common/decorators';

// const itemShadowParams = {
//   widthCoef: 1,
//   heightCoef: 0.95,
//   border: 13,
//   opacity: 0.1,
//   y: 0,
// };

// type Props = {
//   right?: boolean,
// };
// const ItemLeft = withShadow({
//   ...itemShadowParams,
//   x: -5,
// })((props: Props) => (<View {...props} right={null}/>));

// const ItemRight = withShadow({
//   ...itemShadowParams,
//   x: 5,
// })((props: Props) => (<View {...props} right={null}/>));

// class ItemWrapper extends Component {
//   props: Props;
//   render() {
//     return (<Touchable hitSlop={0} activeOpacity={this.props.onPress ? 0.2 : 1} onPress={this.props.onPress}>
//       {!this.props.right ? (<ItemLeft {...this.props} />) : (<ItemRight {...this.props} />)}
//     </Touchable>);
//   }
// }

// // connect the component to the theme
// export default connectStyle('NativeBase.Item', {})(ItemWrapper);
