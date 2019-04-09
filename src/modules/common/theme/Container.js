export default (variables: {}): {} => {
  const { plaform, deviceHeight } = variables;

  return {
    flex: 1,
    height: plaform === 'ios' ? deviceHeight : deviceHeight - 20,
    '.blue': {
      height: deviceHeight,
    },
  };
};
