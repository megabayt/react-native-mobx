import { scaleW, scaleH } from '../../../constants/variables';

export default (variables: {}): {} => ({
  backgroundColor: variables.white,
  borderTopRightRadius: variables.defaultBorderRadius,
  borderBottomRightRadius: variables.defaultBorderRadius,
  width: variables.itemWidth,
  paddingHorizontal: variables.itemPaddingW,
  paddingVertical: variables.itemPaddingH,
  shadowColor: '#000',
  '.article': {
    paddingHorizontal: scaleW(15),
  },
  '.modal': {
    shadowColor: '#fff',
  },
  '.right': {
    marginLeft: variables.contentPadding,
    borderTopRightRadius: null,
    borderBottomRightRadius: null,
    borderTopLeftRadius: variables.defaultBorderRadius,
    borderBottomLeftRadius: variables.defaultBorderRadius,
  },
  'NativeBase.Text': {
    '.label': {
      color: variables.primaryColor5,
      marginBottom: scaleH(5),
    },
  },
  '.button': {
    backgroundColor: null,
    borderTopRightRadius: null,
    borderBottomRightRadius: null,
    width: variables.deviceWidth,
    padding: variables.contentPadding,
  },
});
