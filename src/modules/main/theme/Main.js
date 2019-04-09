import { scaleW, scaleH } from '../../../constants/variables';

export default (variables: {}): {} => ({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logo: {
    marginTop: scaleH(20),
  },
  menuLeftBtn: {
    paddingLeft: scaleW(10),
  },
  menuRightBtn: {
    paddingRight: scaleW(10),
  },
  socialBtnWrapper: {
    marginTop: variables.platform === 'android' ? -scaleH(35) : 0,
    width: variables.deviceWidth - (scaleW(70) * 2),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: scaleW(70),
    marginBottom: variables.deviceHeight < 650 ? scaleH(10) : scaleH(25),
  },
  socialBtn: {
    width: scaleW(40),
    height: scaleW(40),
  },
});
