import * as React from "react";
import { DragBox } from "../DragBox";
import ItemTypes from "../Data/elements.js";

export default function Elements() {
  return (
    <>
      {ItemTypes.map((obj, index) => (
        <DragBox data={obj} type={obj.type} key={index} />
      ))}
    </>
  );
}
