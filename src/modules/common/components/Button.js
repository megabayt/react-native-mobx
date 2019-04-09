import React from 'react';

import { connectStyle, ButtonNB } from './';
import { withShadow } from '../../common/decorators';

type Props = {};
const Button = withShadow({
  y: 10,
})((props: Props) => (<ButtonNB {...props} />));

// connect the component to the theme
export default connectStyle('NativeBase.Button', {})(Button);
