export const allReceived = (propTypes, props) => Object.keys(propTypes).every(key => typeof props[key] !== 'undefined');
