export const notAllReceived = (propTypes, props) => Object.keys(propTypes).some(key => typeof props[key] === 'undefined');
