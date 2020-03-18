import style from "./data-view.module.css";
import React, {useEffect, useState} from "react";
import {InputGroup} from "@blueprintjs/core";
import PageTitle from "../../components/common/page-title";
import {requestProjectListData} from "../../middleware/requests";
import LargeEntitiyPreview from "../../components/common/large-entity-preview";
import {Link} from "react-router-dom";

export const DataView = () => {
  const [searchValue, setSearchValue] = useState("");
  const [projectList, setProjectList] = useState([]);
  useEffect(() => requestProjectListData(setProjectList), []);
  if (searchValue) {
    const filteredProjects = projectList
      .filter(project => project.title)
      .filter(
        project =>
          project.title.includes(searchValue) ||
          project.description.includes(searchValue)
      );
  }
  return (
    <div className={style.dataViewWrapper}>
      <PageTitle title={"Data"}/>
      <div className={style.dataViewContent}>
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
            rightContent={<ProjectOptions/>}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectOptions = () => {
  return (
    <div className={style.projectOptionsWrapper}>
      <p className={style.projectOption}>More About the project</p>
      <br/>
      <Link to={"/solution/mockdata"}>
        <p className={style.projectOption}>View All Ideas</p>
      </Link>
      <br/>
      <p className={style.projectOption}>View result/selected ideas</p>
    </div>
  );
};
