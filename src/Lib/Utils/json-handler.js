function updater(mainArray, id, key, val) {
  mainArray.forEach(function iter(a) {
    if (a.id === id) {
      a[key] = val;
    }
    Array.isArray(a.child) && a.child.forEach(iter);
  });
  return mainArray;
}

function remove(mainArray, id) {
  mainArray.forEach(function iter(a, index, arr) {
    if (a.id === id) {
      arr.splice(index, 1);
    }
    Array.isArray(a.child) && a.child.forEach(iter);
  });
  return mainArray;
}

function get(mainArray, id) {
  let returnarr = [];
  mainArray.forEach(function iter(a, index, arr) {
    if (a.id === id) {
      returnarr = arr[index];
    }
    Array.isArray(a.child) && a.child.forEach(iter);
  });
  return returnarr;
}

function removeANDupdate(mainArray, removeID, currentChild) {
  const initialData = JSON.parse(JSON.stringify(mainArray));
  let isChildExistsforSameParent = false;
  currentChild.child.forEach((obj) => {
    if (obj.id === removeID) {
      isChildExistsforSameParent = true;
    }
  });
  if (isChildExistsforSameParent) {
    return mainArray;
  }
  let newdata = {};
  mainArray.forEach(function iter(a, index, arr) {
    if (a.id === removeID) {
      newdata = arr[index];
      arr.splice(index, 1);
    }
    Array.isArray(a.child) && a.child.forEach(iter);
  });
  const _tmp = get([...mainArray], currentChild.id);
  if (Object.keys(_tmp).length > 0) {
    return updater([...mainArray], currentChild.id, "child", [
      ...currentChild.child,
      newdata,
    ]);
  }
  return initialData;
}

export { updater, remove, get, removeANDupdate };
