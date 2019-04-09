import { scaleH } from '../../../constants/variables';

export default (variables: {}): {} => ({
  width: variables.deviceWidth - (variables.contentPadding * 2),
  height: scaleH(115),
  alignItems: 'flex-start',
  alignSelf: 'center',
  '.maxWidth220': {
    maxWidth: 220,
    height: scaleH(53),
  },
});
