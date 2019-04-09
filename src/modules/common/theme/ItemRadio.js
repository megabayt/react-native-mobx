import { scaleW, scaleH } from '../../../constants/variables';

export default (variables: {}): {} => ({
  circleWrapper: {
    width: scaleW(48),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: scaleH(52),
  },
  circle: {
    width: scaleW(23),
    height: scaleW(23),
    borderRadius: scaleW(11.5),
    borderWidth: 1,
    borderColor: variables.primaryColor2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    flex: 1,
    marginRight: scaleW(12),
    marginVertical: scaleH(10),
  },
  circleIcon: {
    color: variables.primaryColor1,
    fontSize: scaleW(13),
  },
});
