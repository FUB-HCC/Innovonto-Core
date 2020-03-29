import React, { useEffect, useState } from "react";
import { requestGenericEntity } from "../../../middleware/requests";
import { prefix } from "../../../middleware/sparql-queries";
import { urlToEntity } from "../../../components/utils";
import { CenteredLayout } from "../../../components/common/page-layouts";

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

export const EntityFallbackView = () => {
  const [data, setData] = useState(null);
  const entityId = urlToEntity(window.location.href);
  useEffect(() => requestGenericEntity(entityId, setData), [entityId]);
  return (
    <CenteredLayout pageTitle={"Entity Details"} isLoading={!data}>
      <h2>{entityId}</h2>
      <table className="bp3-html-table">
        <thead>
          <tr>
            <td>Predicate</td>
            <td>Object</td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map(({ predicate, objects }, i) => (
              <Pair key={i} predicate={predicate} objects={objects} />
            ))}
        </tbody>
      </table>
    </CenteredLayout>
  );
};
