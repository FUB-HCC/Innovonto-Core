import style from "./page-title.module.css";
import { headerHeight } from "../../root";
import PropTypes from "prop-types";
import React from "react";

export const PageTitle = props => (
  <div className={style.pageTitle} style={{ height: headerHeight }}>
    <div className={style.titleText}>{props.title}</div>
  </div>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default PageTitle;
