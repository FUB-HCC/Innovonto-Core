import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestUserDetailData } from "../../../middleware/requests";
import style from "./user-view.module.css";
import TabbedDetailView from "../../../components/common/tabbed-detail-view";
import { getNameFromUri } from "../../../components/utils";
import { Tab } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CategoryList from "../../../components/common/category-list";
import { CenteredLayout } from "../../../components/common/page-layouts";

export const UserView = () => {
  const [userData, setUserData] = useState(null);
  const userId = useParams().id;
  useEffect(() => requestUserDetailData(userId, setUserData), [
    userId,
    setUserData
  ]);
  if (!userData) {
    return <CenteredLayout pageTitle={"UserDetails"} isLoading={true} />;
  }
  const {
    id,
    hasSubmittedIdeasForIdeaContest,
    isCreatorOf,
    hasBrainstormingSession,
    age,
    gender,
    nationality,
    occupationalGroup,
    highestDegree
  } = userData;

  return (
    <CenteredLayout pageTitle={"User Details"}>
      <TabbedDetailView
        title={"ID: " + getNameFromUri(id).toUpperCase()}
        content={
          <CategoryList
            hideTitle={true}
            categoryList={[
              age + " y/o",
              gender,
              nationality,
              occupationalGroup,
              highestDegree
            ].filter(item => item)}
          />
        }
        tabs={[
          <Tab
            id={"sessions"}
            title={"Sessions"}
            key={"sessions"}
            panel={
              <DiamondList
                list={hasBrainstormingSession}
                urlPath={"/entities/sessions/"}
              />
            }
          />,
          <Tab
            id={"idea"}
            title={"Ideas"}
            key={"ideas"}
            panel={
              <DiamondList list={isCreatorOf} urlPath={"/entities/ideas/"} />
            }
          />,
          <Tab
            id={"surveys"}
            title={"Surveys"}
            panel={
              <DiamondList
                list={hasSubmittedIdeasForIdeaContest}
                urlPath={"/entities/ideaContests/"}
              />
            }
            key={"surveys"}
          />
        ]}
      />
    </CenteredLayout>
  );
};

const EmptyList = () => <div className={style.emptyList}>NO ITEMS</div>;

const DiamondList = props => {
  const { list, urlPath } = props;
  if (!list) return <EmptyList />;
  return (
    <div className={style.list}>
      {list.map(item => (
        <DiamondListItem key={item} item={item} urlPath={urlPath} />
      ))}
    </div>
  );
};

DiamondList.propTypes = {
  list: PropTypes.any,
  urlPath: PropTypes.string
};

const DiamondListItem = props => {
  const { item, urlPath } = props;
  return (
    <Link to={urlPath + getNameFromUri(item)}>
      <div className={style.diamondListItem}>
        <div className={style.basicDiamond} />
        <span className={style.listItemSpan}>{getNameFromUri(item)}</span>
      </div>
    </Link>
  );
};

DiamondListItem.propTypes = {
  item: PropTypes.string.isRequired,
  urlPath: PropTypes.string
};

export default UserView;
