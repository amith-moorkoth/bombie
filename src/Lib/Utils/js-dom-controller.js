const updateToState = (obj, path, value) => {
  var data = JSON.parse(JSON.stringify(obj));
  var k = data;
  var steps = path.split(".");
  var last = steps.pop();
  steps.forEach((e) => (k[e] = k[e] || {}) && (k = k[e]));
  k[last] = value;
  return data;
};

const getFromState = (obj, path) => {
  var k = obj;
  var steps = path.split(".");
  var last = steps.pop();
  steps.forEach((e) => (k[e] = k[e] || {}) && (k = k[e]));
  return k[last];
};
//const updated = updateState(data, 'abc.dcd', 'somedata');
export { updateToState, getFromState };
