import style from "./solution-map-sidebar.module.css";
import React from "react";
import { Button, Intent } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { getNameFromUri } from "../utils";

const SidebarIdeaDetails = props => {
  const { selectedIdea } = props;
  return (
    <div
      className={style.ideaDetails}
      style={{ textAlign: selectedIdea ? "left" : "center" }}
    >
      {!selectedIdea && (
        <p>Select an idea in the right window to see more information! </p>
      )}
      {selectedIdea && (
        <>
          <p>
            <b>ID:</b> <br /> {selectedIdea.idea}
          </p>
          <p>
            <b>DESCRIPTION:</b> <br /> {selectedIdea.content}
          </p>
          <p>
            <b>CUSTER LABEL:</b> <br /> {selectedIdea.clusterLabel}
          </p>
          <Link to={"/entities/ideas/" + getNameFromUri(selectedIdea.idea)}>
            <Button minimal={true} active={true} intent={Intent.SUCCESS}>
              More Details
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

const TopConceptsTable = props => {
  const { conceptsList } = props;
  return (
    <table className={style.sideBarTable}>
      <thead>
        <tr>
          <th className={style.conceptCol}>Concept</th>
          <th className={style.countCol}>Count</th>
        </tr>
      </thead>
      <tbody>
        {conceptsList.map(concept => (
          <tr key={concept.concept_uri}>
            <td className={style.conceptCol}>
              {getNameFromUri(concept.concept_uri)}
            </td>
            <td className={style.countCol}>{concept.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SidebarClusterConcepts = props => {
  const { selectedIdea, selectedCluster } = props;
  return (
    <div
      className={style.clusterConcepts}
      style={{ textAlign: selectedIdea ? "left" : "center" }}
    >
      {!selectedIdea && (
        <p>Select an idea in the right window to see more information! </p>
      )}
      {selectedIdea && !selectedCluster && (
        <p>
          There is no cluster information for this idea or no concept
          information for this cluster!
        </p>
      )}
      {selectedIdea && selectedCluster && (
        <>
          <p>
            <b>CLUSTER "{selectedCluster.clusterLabel}"</b>
          </p>
          <TopConceptsTable conceptsList={selectedCluster.topConcepts} />
        </>
      )}
    </div>
  );
};

export const Sidebar = props => {
  const { width, height, solutionId, selectedIdea, selectedCluster } = props;

  return (
    <div className={style.sidebar} style={{ width: width, height: height }}>
      <h1 className={style.largeTitle}>Idea Map</h1>
      <p className={style.idText}>ID: {solutionId.toUpperCase()}</p>
      <h3 className={style.smallTitle}>Idea Details</h3>
      <SidebarIdeaDetails selectedIdea={selectedIdea} />
      <div className={style.sideBarSpacer} />
      <h3 className={style.smallTitle}>Cluster Concepts</h3>
      <SidebarClusterConcepts
        selectedIdea={selectedIdea}
        selectedCluster={selectedCluster}
      />
      <div className={style.sideBarSpacer} />
    </div>
  );
};

export default Sidebar;
