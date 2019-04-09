import { StyleSheet } from 'react-native';
import { scaleW, scaleH } from '../../../constants/variables';

export default (variables: {}): {} => ({
  '.login': {
    padding: scaleW(10),
    paddingHorizontal: scaleW(20),
    borderTopRightRadius: scaleW(5),
    borderBottomRightRadius: scaleW(5),
    flex: 0,
    position: 'absolute',
    left: 0,
    top: scaleH(15),
    'NativeBase.Touchable': {
      'NativeBase.Icon': {
        color: variables.primaryColor2,
      },
    },
  },
  '.padder': {
    padding: variables.contentPadding,
  },
  '.fullscreen': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '.darkBg': {
    backgroundColor: 'rgba(0, 0, 0, .7)',
  },
  '.hr': {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: variables.primaryColor4,
    height: StyleSheet.hairlineWidth,
  },
  '.modalButton': {
    paddingHorizontal: variables.contentPadding,
  },
  '.emptyWrapper': {
    'NativeBase.Text': {
      '.emptyTitle': {
        color: variables.defaultFontColor,
        fontSize: variables.defaultFontSize * 1.5,
        fontWeight: '500',
        textAlign: 'center',
      },
      '.emptyText': {
        color: variables.defaultFontColor,
        fontSize: variables.defaultFontSize * 1.1,
        textAlign: 'center',
      },
    },
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: variables.contentPadding,
  },
});
