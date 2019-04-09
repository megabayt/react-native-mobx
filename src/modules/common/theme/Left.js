import { scaleW, scaleH } from '../../../constants/variables';

export default (variables: {}): {} => ({
  '.modal': {
    backgroundColor: variables.white,
    padding: scaleW(10),
    paddingHorizontal: scaleW(20),
    borderTopRightRadius: scaleW(5),
    borderBottomRightRadius: scaleW(5),
    flex: 0,
    position: 'absolute',
    left: 0,
    top: scaleH(30),
    'NativeBase.Touchable': {
      'NativeBase.Icon': {
        color: variables.primaryColor1,
      },
    },
  },
  flex: 1,
  alignSelf: 'center',
  alignItems: 'flex-start',
});
