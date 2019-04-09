import { scaleW, scaleH } from '../../../constants/variables';

export default (variables: {}): {} => ({
  color: variables.defaultTextColor,
  fontSize: variables.defaultFontSize,
  '.pageTitle': {
    fontSize: scaleW(45),
    color: variables.primaryColor4,
    fontWeight: '300',
    marginBottom: scaleH(15),
  },
  '.pageTitleNotFit': {
    fontSize: scaleW(20),
  },
  '.modalTitle': {
    fontSize: scaleW(25),
    fontWeight: 'bold',
    marginBottom: scaleH(10),
  },
  '.link': {
    color: variables.primaryColor2,
  },
  '.warning': {
    color: variables.primaryColor1,
  },
  '.white': {
    color: variables.white,
  },
  '.textCenter': {
    textAlign: 'center',
  },
});
