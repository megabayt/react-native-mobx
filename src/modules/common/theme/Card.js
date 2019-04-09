import { scaleH } from '../../../constants/variables';

export default (variables: {}): {} => ({
  marginVertical: scaleH(5),
  width: '100%',
  borderRadius: variables.defaultBorderRadius,
  flexWrap: 'nowrap',
  backgroundColor: variables.cardDefaultBg,
  shadowColor: '#000',
  overflow: 'hidden',
});
