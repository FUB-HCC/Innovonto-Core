import { Button, Intent } from "@blueprintjs/core";
import style from "./category-list.module.css";
import PropTypes from "prop-types";
import React from "react";

const CategoryList = props => (
  <div>
    {props.hideTitle ? <br /> : <h3>Categories:</h3>}
    {props.categoryList.map(category => (
      <Button
        className={style.categoryLabels}
        minimal={true}
        intent={Intent.SUCCESS}
        disabled={true}
        active={true}
        key={category}
      >
        {category}
      </Button>
    ))}
  </div>
);

CategoryList.propTypes = {
  hideTitle: PropTypes.bool,
  categoryList: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default CategoryList;
