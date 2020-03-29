import React from "react";
import PropTypes from "prop-types";
import style from "./page-layouts.module.css";
import { PageTitle } from "./page-title";
import { useWindowSize } from "../utils";
import { footerHeight, headerHeight } from "../../root";
import { Intent, Spinner } from "@blueprintjs/core";
import Sidebar from "./sidebar";

export const CenteredLayout = props => {
  const { children, isLoading, error, pageTitle } = props;
  const [, windowHeight] = useWindowSize();
  const pageHeight = windowHeight - footerHeight - headerHeight;
  const contentHeight = pageHeight - (pageTitle ? headerHeight + 30 : 0); // css margin-bottom
  const loaderMargins = 100;
  const loaderHeight = contentHeight - 2 * loaderMargins;

  const LoadedContent = (
    <div
      className={style.centeredLayoutContent}
      style={{ minHeight: contentHeight }}
    >
      {children}
    </div>
  );
  const LoadingContent = (
    <div
      className={style.centeredLayoutLoading}
      style={{
        minHeight: loaderHeight,
        marginTop: loaderMargins,
        marginBottom: loaderMargins
      }}
    >
      <Spinner size={120} intent={Intent.SUCCESS} />
    </div>
  );
  return (
    <div
      className={style.centeredLayoutWrapper}
      style={{ minHeight: pageHeight }}
    >
      {pageTitle && <PageTitle title={pageTitle} />}
      {isLoading ? LoadingContent : LoadedContent}
    </div>
  );
};

CenteredLayout.propTypes = {
  children: PropTypes.any,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  pageTitle: PropTypes.string
};

export const FullScreenSideBarLayout = props => {
  const { children, isLoading, error, pageTitle, sideBarWidth } = props;
  const [, windowHeight] = useWindowSize();
  const pageHeight = windowHeight - footerHeight - headerHeight;
  const LoadedContent = (
    <div
      className={style.fullScreenLayoutContent}
      style={{ minHeight: pageHeight }}
    >
      {children}
    </div>
  );
  const LoadingContent = (
    <div
      className={style.fullScreenLayoutContent}
      style={{
        minHeight: pageHeight
      }}
    >
      <Sidebar
        width={sideBarWidth}
        height={pageHeight}
        title={pageTitle}
        sideBarModules={[
          <div />,
          <Spinner size={60} intent={Intent.SUCCESS} />
        ]}
      />
      <div className={style.loadingMainWindow}>
        <Spinner size={120} intent={Intent.SUCCESS} />
      </div>
    </div>
  );
  return (
    <div
      className={style.fullScreenLayoutWrapper}
      style={{ minHeight: pageHeight }}
    >
      {isLoading ? LoadingContent : LoadedContent}
    </div>
  );
};

FullScreenSideBarLayout.propTypes = {
  children: PropTypes.any,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  pageTitle: PropTypes.string,
  sideBarWidth: PropTypes.number.isRequired
};
