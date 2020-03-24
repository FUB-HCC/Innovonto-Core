import React, { useEffect, useState } from "react";
import style from "./entity-fallback-view.module.css";

import { requestGenericEntity } from "../../../middleware/requests";
import PageTitle from "../../../components/common/page-title";
import { prefix } from "../../../middleware/sparql-queries";

function prefixReplacer(predicate) {
  for (let k in prefix) {
    predicate = predicate.replace(prefix[k], k + ":");
  }
  return predicate;
}

/* TODO styling */
const Pair = ({ predicate, objects }) => {
  return (
    <tr>
      <td>{prefixReplacer(predicate.value)}</td>
      <td>
        {objects.map(o => {
          if (o.value.startsWith("http://") || o.value.startsWith("https://")) {
            return (
              <div key={o.value}>
                <a href={o.value}>{o.value}</a>
              </div>
            );
          } else {
            return <div key={o.value}>{o.value}</div>;
          }
        })}
      </td>
    </tr>
  );
};

const urlToEntity = url => {
  if (url.startsWith("http://localhost:3000/entities/")) {
    return (
      "https://innovonto-core.imp.fu-berlin.de/entities/" +
      url.substring("http://localhost:3000/entities/".length, url.length)
    );
  } else {
    return url;
  }
};

export const EntityFallbackView = () => {
  const [data, setData] = useState([]);
  const entityId = urlToEntity(window.location.href);
  useEffect(() => requestGenericEntity(entityId, setData), [entityId]);
  return (
    <div>
      <PageTitle title="Entity Details" />
      <div className={style.entityDetailsPageWrapper}>
        <h2>{entityId}</h2>
        <table className="bp3-html-table">
          <thead>
            <tr>
              <td>Predicate</td>
              <td>Object</td>
            </tr>
          </thead>
          <tbody>
            {data.map(({ predicate, objects }, i) => (
              <Pair key={i} predicate={predicate} objects={objects} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
