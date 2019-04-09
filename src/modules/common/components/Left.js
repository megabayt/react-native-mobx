import React from 'react';

import { connectStyle, LeftNB } from './';
import { withShadow } from '../../common/decorators';

type Props = {};
const Left: () => React.ComponentType = withShadow()((props: Props) => (<LeftNB {...props} />));

// connect the component to the theme
export default connectStyle('NativeBase.Left', {})(Left);
