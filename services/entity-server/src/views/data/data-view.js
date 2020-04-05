import style from "./data-view.module.css";
import React, { useEffect, useState } from "react";
import { InputGroup } from "@blueprintjs/core";
import { requestProjectListData } from "../../middleware/requests";
import LargeEntitiyPreview from "../../components/common/large-entity-preview";
import { Link } from "react-router-dom";
import { getNameFromUri } from "../../components/utils";
import { CenteredLayout } from "../../components/common/page-layouts";

export const DataView = () => {
  const [searchValue, setSearchValue] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => requestProjectListData(setProjectList, setError), []);
  var filteredProjects = projectList;
  if (searchValue) {
    filteredProjects = projectList
      .filter(project => project.title)
      .filter(
        project =>
          project.title.includes(searchValue) ||
          project.description.includes(searchValue)
      );
  }
  return (
    <CenteredLayout
      pageTitle={"Data"}
      isLoading={projectList.length < 1}
      error={error}
    >
      <h1 className={style.largeTitle}>Search</h1>
      <InputGroup
        className={style.projectSearchInput}
        leftIcon={"search"}
        placeholder={"filter projects..."}
        onChange={event => {
          setSearchValue(event.target.value);
        }}
      />
      <h1 className={style.largeTitle}>Project List</h1>
      {filteredProjects.map(project => (
        <LargeEntitiyPreview
          key={project.id}
          description={project.description}
          title={project.title}
          rightContent={<ProjectOptions id={project.id} />}
        />
      ))}
    </CenteredLayout>
  );
};

const ProjectOptions = props => {
  const { id } = props;
  return (
    <div className={style.projectOptionsWrapper}>
      <p className={style.projectOption}>More About the project</p>
      <br />
      <Link to={"/idea-map/" + getNameFromUri(id)}>
        <p className={style.projectOption}>View All Ideas</p>
      </Link>
      <br />
      <Link
        to={{ pathname: "/search/", search: "?project=" + getNameFromUri(id) }}
      >
        <p className={style.projectOption}>View result/selected ideas</p>
      </Link>
    </div>
  );
};
