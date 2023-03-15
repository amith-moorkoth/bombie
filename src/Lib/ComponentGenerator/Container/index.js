import * as React from "react";
import { memo, useCallback, useState } from "react";
import update from "immutability-helper";
import { NativeTypes } from "react-dnd-html5-backend";
import { DropBox } from "../DropBox";
import eleType from "../Data/element-type";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import ElementRecursion from "./element-recursion";
import { v4 as uuid } from "uuid";
import {
  updater,
  removeANDupdate,
  get,
  remove,
} from "src/Lib/Utils/json-handler";

export const Container = memo(function Container() {
  const [data, setdata, effect, seteffect] = React.useContext(bombieContext);

  const handleDrop = useCallback(
    (item) => {
      setdata([...data, { id: uuid(), ...item, child: [] }]);
    },
    [data]
  );

  const handleDropInner = useCallback(
    (item, currentChild) => {
      const newdata = {
        id: uuid(),
        ...item,
        child: [],
      };
      setdata(
        updater([...data], currentChild.id, "child", [
          ...currentChild.child,
          newdata,
        ])
      );
    },
    [data]
  );

  const handleonDrop_Move = useCallback(
    (item) => {
      debugger;
      let newdata = get([...data], item.id);
      let mainArray = remove([...data], item.id);
      setdata([...mainArray, newdata]);
    },
    [data]
  );

  const handleonDrop_MoveInner = useCallback(
    (item, currentChild) => {
      setdata(removeANDupdate([...data], item.id, currentChild));
    },
    [data]
  );

  const handleonHover_Move = useCallback(
    (item) => {
      /**need to work on */
    },
    [data]
  );

  const handleonHover_MoveInner = useCallback(
    (item, currentChild) => {
      /**need to work on */
      //setdata(sortForSingleParent([...data], item.id, currentChild));
    },
    [data]
  );

  return (
    <div>
      <div style={{ overflow: "hidden", clear: "both" }}>
        <DropBox
          accept={[eleType.LAYOUT, eleType.CARD]}
          handleonDrop={(item) => handleDrop(item)}
          handleonDrop_Move={(item) => handleonDrop_Move(item)}
          handleonHover_Move={(item) => handleonHover_Move(item)}
        >
          <ElementRecursion
            data={data}
            handleonDrop={handleDropInner}
            handleonDrop_Move={handleonDrop_MoveInner}
            handleonHover_Move={handleonDrop_MoveInner}
          />
        </DropBox>
      </div>
    </div>
  );
});
