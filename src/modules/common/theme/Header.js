import { scaleW } from '../../../constants/variables';

export default (variables: {}): {} => {
  const iconStyle: {} = {
    color: variables.primaryColor1,
    fontSize: variables.iconFontSize,
  };
  return {
    'NativeBase.Left': {
      flex: 0.4,
      alignSelf: 'center',
      alignItems: 'flex-start',
      'NativeBase.Icon': {
        ...iconStyle,
      },
      'NativeBase.Touchable': {
        'NativeBase.Icon': {
          ...iconStyle,
        },
      },
    },
    'NativeBase.Body': {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'center',
      'NativeBase.Title': {
        fontSize: variables.defaultFontSize * 1.05,
        color: variables.defaultFontColor,
      },
    },
    'NativeBase.Right': {
      flex: 0.4,
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      'NativeBase.Icon': {
        ...iconStyle,
        marginLeft: 5,
      },
    },
    '.modal': {
      paddingHorizontal: 0,
    },
    backgroundColor: variables.toolbarDefaultBg,
    flexDirection: 'row',
    paddingHorizontal: scaleW(10),
    justifyContent: 'center',
    paddingTop: variables.headerPaddingTop, // eslint-disable-line
    height: 'auto',
    top: 0,
    left: 0,
    right: 0,
  };
};
