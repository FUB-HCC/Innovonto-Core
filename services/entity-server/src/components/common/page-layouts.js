import React from "react";
import PropTypes from "prop-types";
import style from "./page-layouts.module.css";
import { PageTitle } from "./page-title";
import { useWindowSize } from "../utils";
import { footerHeight, headerHeight } from "../../root";
import { Intent, Spinner } from "@blueprintjs/core";
import Sidebar from "./sidebar";
import NonIdealView, {
  NonIdealViewIntent
} from "../../views/non-ideal/non-ideal-view";
import ReactHTMLParser from "react-html-parser";

export const CenteredLayout = props => {
  const { children, isLoading, error, pageTitle } = props;
  const [, windowHeight] = useWindowSize();
  const pageHeight = windowHeight - footerHeight - headerHeight;
  const contentHeight = pageHeight - (pageTitle ? headerHeight + 30 : 0); // css margin-bottom

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
        minHeight: contentHeight
      }}
    >
      <Spinner size={120} intent={Intent.SUCCESS} />
    </div>
  );
  const ErrorContent = error ? (
    <div
      className={style.centeredLayoutLoading}
      style={{
        minHeight: contentHeight
      }}
    >
      <NonIdealView
        intent={NonIdealViewIntent.ERROR}
        errorData={{
          error: error.response.status + " - " + error.response.statusText,
          info: ReactHTMLParser(error.response.data)
        }}
      />
    </div>
  ) : null;
  return (
    <div
      className={style.centeredLayoutWrapper}
      style={{ minHeight: pageHeight }}
    >
      {pageTitle && <PageTitle title={pageTitle} />}
      {error ? ErrorContent : isLoading ? LoadingContent : LoadedContent}
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
  const ErrorContent = error ? (
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
        sideBarModules={[]}
      />
      <div className={style.loadingMainWindow} style={{ height: pageHeight }}>
        <NonIdealView
          intent={NonIdealViewIntent.ERROR}
          errorData={{
            error: error.response.status + " - " + error.response.statusText,
            info: ReactHTMLParser(error.response.data)
          }}
        />
      </div>
    </div>
  ) : null;
  return (
    <div
      className={style.fullScreenLayoutWrapper}
      style={{ minHeight: pageHeight }}
    >
      {error ? ErrorContent : isLoading ? LoadingContent : LoadedContent}
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
