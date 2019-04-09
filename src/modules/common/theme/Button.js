import { scaleH } from '../../../constants/variables';

export default (variables: {}): {} => ({
  'NativeBase.Text': {
    color: variables.white,
    fontWeight: 'bold',
  },
  backgroundColor: variables.primaryColor1,
  borderRadius: 5,
  width: '100%',
  height: scaleH(40),
  alignItems: 'center',
  justifyContent: 'center',
  '.blue': {
    backgroundColor: variables.primaryColor2,
  },
  '.modal': {
    marginTop: scaleH(20),
  },
});
