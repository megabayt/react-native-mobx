import { scaleH } from '../../../constants/variables';

export default (variables: {}): {} => ({
  '.width100': {
    width: '100%',
  },
  '.padder': {
    padding: variables.contentPadding,
  },
  '.padderHorizontal': {
    paddingHorizontal: variables.contentPadding,
  },
  '.padderVertical': {
    paddingVertical: variables.contentPadding,
  },
  '.pushTop': {
    marginTop: scaleH(15),
  },
  '.pushBottom': {
    marginBottom: scaleH(15),
  },
  '.pushTopSmall': {
    marginTop: scaleH(8),
  },
  '.pushBottomSmall': {
    marginBottom: scaleH(8),
  },
  '.pushLeft': {
    marginLeft: variables.contentPadding,
  },
  '.pushLeftItem': {
    marginLeft: variables.itemPaddingW,
  },
  '.pushRight': {
    marginRight: variables.contentPadding,
  },
  '.pushRightItem': {
    marginRight: variables.itemPaddingW,
  },
  '.alignStart': {
    alignItems: 'flex-start',
  },
  '.alignCenter': {
    alignItems: 'center',
  },
  '.alignEnd': {
    alignItems: 'flex-end',
  },
  '.justifyStart': {
    justifyContent: 'flex-start',
  },
  '.justifyCenter': {
    justifyContent: 'center',
  },
  '.justifyEnd': {
    justifyContent: 'flex-end',
  },
  '.selfStart': {
    alignSelf: 'flex-start',
  },
  '.selfCenter': {
    alignSelf: 'center',
  },
  '.selfEnd': {
    alignSelf: 'flex-end',
  },
  '.flexRow': {
    flexDirection: 'row',
  },
  '.colorWhite': {
    color: '#fff',
  },
});
