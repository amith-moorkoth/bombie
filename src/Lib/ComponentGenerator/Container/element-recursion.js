import React from "react";
import ElementRender from "./element-render";

export default function ElementRecursion({
  data,
  handleonDrop,
  handleonDrop_Move,
  handleonHover_Move,
}) {
  return data.map((obj) => (
    <NormalItr
      data={obj}
      handleonDrop={handleonDrop}
      handleonDrop_Move={handleonDrop_Move}
      handleonHover_Move={handleonHover_Move}
    >
      {obj.child.length > 0 && (
        <ElementRecursion
          data={obj.child}
          handleonDrop={handleonDrop}
          handleonDrop_Move={handleonDrop_Move}
          handleonHover_Move={handleonHover_Move}
        />
      )}
    </NormalItr>
  ));
}

function NormalItr({
  data,
  handleonDrop,
  children,
  handleonDrop_Move,
  handleonHover_Move,
}) {
  return (
    <ElementRender
      currentChild={data}
      handleonDrop={handleonDrop}
      handleonDrop_Move={handleonDrop_Move}
      handleonHover_Move={handleonHover_Move}
    >
      {children}
    </ElementRender>
  );
}
