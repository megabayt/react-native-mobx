export default (variables: {}): {} => ({
  field: {
    width: 50,
    height: 25,
    borderRadius: 25,
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: variables.primaryColor2,
  },
  button: {
    width: 23,
    height: 23,
    borderRadius: 23 / 2,
    position: 'absolute',
    top: 1,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset:
      { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  checked: {
    backgroundColor: '#BBBCCD',
  },
});
