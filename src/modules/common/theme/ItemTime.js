import { scaleW, scaleH } from '../../../constants/variables';

export default (variables: {}): {} => ({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemWrapper: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaleH(3),
  },
  item: {
    paddingVertical: scaleH(8),
    paddingHorizontal: scaleW(10),
  },
  itemSelected: {
    backgroundColor: variables.primaryColor1,
    borderRadius: variables.defaultBorderRadius,
  },
  itemText: {
    fontSize: scaleW(15),
    fontWeight: '800',
  },
  itemTextDisabled: {
    color: variables.primaryColor4,
  },
  itemTextSelected: {
    color: variables.white,
  },
});
