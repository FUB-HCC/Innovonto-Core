import style from "./session-tree.module.css";
import EntityMarker from "../common/entity-marker";
import PropTypes from "prop-types";
import React from "react";
import { AltTextComponent, makeDimensionsChecker } from "../utils";

const minHeight = 250;
const minWidth = 250;
const minAspectRatio = 0.1;
const maxAspectRatio = 2.0;
const areDimensionsReasonable = makeDimensionsChecker(
  minHeight,
  minWidth,
  minAspectRatio,
  maxAspectRatio
);

const SessionTree = props => {
  const { height, width, tree } = props;
  if (!areDimensionsReasonable(width, height)) {
    return (
      <AltTextComponent name={"Session Tree"} width={width} height={height} />
    );
  }
  return (
    <div className={style.tree} style={{ width: width, height: height }}>
      <ul>
        <SessionTreeNode tree={tree} />
      </ul>
    </div>
  );
};

const SessionTreeNode = props => {
  const { tree } = props;
  return (
    <li>
      <EntityMarker
        marker={<div className={style.basicNode} />}
        content={tree.content}
      />
      {tree.children && (
        <ul>
          {tree.children.map(child => (
            <SessionTreeNode key={child.content + "child"} tree={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

SessionTree.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  tree: PropTypes.object.isRequired
};

export default SessionTree;
