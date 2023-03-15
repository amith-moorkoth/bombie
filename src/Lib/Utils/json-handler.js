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
      //delete arr[index];
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
      //arr.splice(index, 1);
      //delete arr[index];
    }
    Array.isArray(a.child) && a.child.forEach(iter);
  });
  return returnarr;
}

/**{"id":"d575f2d5-e564-4120-ab4c-b3b85a5e1bf5","info":{"tag":"GRIDCONTAINER",
 * "name":"Grid Container","type":"LAYOUT","accept":["GRIDITEM"]},"child":[]}
index.js:41 {"action":"MOVE","id":"9ef85428-8fbf-4075-8976-92ca6d6e459a"} */

function removeANDupdate(mainArray, removeID, currentChild) {
  const initialData = JSON.parse(JSON.stringify(mainArray));
  let isChildExistsforSameParent = false;
  currentChild.child.map((obj) => {
    if (obj.id === removeID) {
      isChildExistsforSameParent = true;
    }
  });
  /**is element to be updated is not a child of the currentelemtn then update */
  if (!isChildExistsforSameParent) {
    let newdata = {};
    mainArray.forEach(function iter(a, index, arr) {
      if (a.id === removeID) {
        newdata = arr[index];
        arr.splice(index, 1);
        //delete arr[index];
      }
      Array.isArray(a.child) && a.child.forEach(iter);
    });
    debugger;

    let _tmp = get([...mainArray], currentChild.id);
    if (Object.keys(_tmp).length > 0) {
      return updater([...mainArray], currentChild.id, "child", [
        ...currentChild.child,
        newdata,
      ]);
    } else {
      return initialData;
    }
  } else {
    return mainArray;
  }
}

/*function sortForSingleParent(mainArray, sortChildID, currentChild) {
  let sortChildParentID = "";
  let currentChildParentID = "";
  let sortindex = "";
  let currentchildindex = "";
  let sortarr = {};
  let currentarr = {};
  mainArray.forEach(function iter(a, index, arr) {
    if (a.id === sortChildID) {
      sortChildParentID = arr.id;
      sortindex = index;
      sortarr = arr[index];
    }
    if (a.id === currentChild.id) {
      currentChildParentID = arr.id;
      currentchildindex = index;
      currentarr = arr[index];
    }
    Array.isArray(a.child) && a.child.forEach(iter);
  });
  if (sortChildParentID === currentChildParentID) {
    mainArray.forEach(function iter(a, index, arr) {
      if (a.id === sortChildID) {
        a = currentarr;
      }
      if (a.id === currentChild.id) {
        a = sortarr;
      }
      Array.isArray(a.child) && a.child.forEach(iter);
    });
  } else {
    return mainArray;
  }
}*/

export { updater, remove, get, removeANDupdate };
