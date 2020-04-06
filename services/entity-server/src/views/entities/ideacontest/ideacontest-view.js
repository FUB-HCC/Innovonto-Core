import React, { useEffect, useState } from "react";
import { requestIdeaContestDetailData } from "../../../middleware/requests";
import { urlToEntity } from "../../../components/utils";
import { CenteredLayout } from "../../../components/common/page-layouts";

export const IdeaContestView = () => {
  const [ideaContestData, setIdeaContestData] = useState(null);
  const [error, setError] = useState(null);
  const entityUrl = urlToEntity(window.location.href);
  useEffect(
    () => requestIdeaContestDetailData(entityUrl, setIdeaContestData, setError),
    [entityUrl, setIdeaContestData]
  );
  if (!entityUrl || error) {
    return (
      <CenteredLayout
        isLoading={true}
        pageTitle={"Idea Contest Details"}
        error={error}
      />
    );
  }
  return (
    <CenteredLayout pageTitle={"Idea Contest Details"}>
      <div>
        <pre>{JSON.stringify(ideaContestData, null, 2)}</pre>
      </div>
    </CenteredLayout>
  );
};
