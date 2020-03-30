import { useHistory, useParams } from "react-router-dom";
import style from "./tabbed-detail-view.module.css";
import { Button, Intent, Tabs } from "@blueprintjs/core";
import PropTypes from "prop-types";
import React from "react";

const TabbedDetailView = props => {
  const { title, subtitle, content, tabs, defaultTab } = props;
  const history = useHistory();
  const { id } = useParams();
  return (
    <div className={style.detailViewContent}>
      <div className={style.largeTitle}>
        <Button
          className={style.backButton}
          minimal={true}
          icon={"chevron-left"}
          intent={Intent.SUCCESS}
          active={true}
          onClick={() => history.goBack()}
        >
          Return
        </Button>{" "}
        <br />
        {title ? title : "no title"}{" "}
        <span className={style.idSpan}>{subtitle}</span>
      </div>
      <div className={style.detailViewDescription}>{content}</div>
      <Tabs
        key={id}
        id={"detailViewTabs"}
        defaultSelectedTabId={defaultTab}
        renderActiveTabPanelOnly={true}
      >
        {tabs}
      </Tabs>
    </div>
  );
};

TabbedDetailView.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  content: PropTypes.element,
  tabs: PropTypes.arrayOf(PropTypes.element).isRequired,
  defaultTab: PropTypes.string
};

export default TabbedDetailView;
