import { scaleH } from '../../../constants/variables';

export default (variables: {}): {} => ({
  '.multiline': {
    paddingTop: scaleH(10),
    height: variables.inputHeightBase * 3,
  },
  height: variables.inputHeightBase,
  color: variables.inputColor,
  // flex: 1,
  fontSize: variables.inputFontSize,
});
