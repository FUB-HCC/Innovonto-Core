import style from "./session-tree.module.css";
import EntityMarker from "../common/entity-marker";
import PropTypes from "prop-types";
import React from "react";

const SessionTree = props => {
  const { height, width, tree } = props;
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
