import style from "./sidebar.module.css";
import React from "react";
import PropTypes from "prop-types";

export const Sidebar = props => {
  const { width, height, subtitle, title, sideBarModules } = props;

  return (
    <div className={style.sidebar} style={{ width: width, height: height }}>
      <h1 className={style.largeTitle}>{title}</h1>
      <p className={style.idText}>{subtitle}</p>
      {sideBarModules.map((module, i) => (
        <React.Fragment key={title + "module" + i}>
          {module}
          <div className={style.sideBarSpacer} />
        </React.Fragment>
      ))}
    </div>
  );
};

Sidebar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  sideBarModules: PropTypes.arrayOf(PropTypes.element).isRequired
};
export default Sidebar;
