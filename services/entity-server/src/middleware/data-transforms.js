export const extractIdeas = data => {
  return {
    id: data.submittedIdea["@id"],
    content: data.submittedIdea.content
  };
};

export const extractInspirations = data => {
  var result = {
    id: data.hasInspiration["@id"],
    content: data.hasInspiration.content
  };
  if (data.hasInspiration.hasOwnProperty("fallbackContent")) {
    result.fallbackContent = data.hasInspiration.fallbackContent;
  }
  return result;
};

//TODO implement extract exemplar
export const extractExemplars = data =>
  data["@graph"]
    .filter(e => e["@type"].includes("Exemplar"))
    .map(exemplar => ({
      id: exemplar["@id"],
      idea: extractIdeas(data).find(idea => exemplar.hasIdea === idea.id)
    }));

const extractContentFor = event => {
  switch (event.eventType) {
    case "idea-submit":
      return extractIdeas(event);
    case "inspiration-response":
      return extractInspirations(event);
    default:
      return event;
  }
};

export const processSession = data => {
  const result = data;
  const filteredEvents = data.hasTrackingEvent
    .filter(
      currentEvent =>
        currentEvent.eventType === "idea-submit" ||
        currentEvent.eventType === "inspiration-response"
    )
    .map(inputEvent => ({
      id: inputEvent["@id"],
      eventType: inputEvent.eventType,
      content: extractContentFor(inputEvent),
      timerValue: inputEvent["inov:timerValue"]
    }))
    .sort((a, b) => b.timerValue - a.timerValue);

  result.hasTrackingEvent = filteredEvents;
  return result;
};

export const extractSearchResults = data =>
  data.results.map((result, i) => ({
    id: result["@id"],
    resultNo: i + 1,
    title: result.title,
    description: result.content,
    icon: result.icon,
    refinements: !result.textualRefinement
      ? []
      : result.textualRefinement.map(refinement => ({
          id: refinement["@id"],
          question: refinement.description,
          answer: refinement.content
        })),
    rating:
      result.MinMaxRating && result.MinMaxRating.length
        ? result.MinMaxRating.find(
            rating => rating.title === "Group Phase Rating"
          )
          ? result.MinMaxRating.find(
              rating => rating.title === "Group Phase Rating"
            ).ratingValue
          : null
        : null
  }));

export const extractProjectList = data =>
  data["@graph"].map(ideaContest => ({
    id: ideaContest["@id"],
    description: ideaContest.description,
    title: ideaContest.title
  }));

export const sortResources = data => {
  var dic = new Map();
  for (var { predicate, object } of data) {
    if (dic.has(predicate.value)) {
      dic.get(predicate.value).objects.push(object);
    } else {
      dic.set(predicate.value, { predicate, objects: [object] });
    }
  }
  return Array.from(dic.values()).sort((a, b) =>
    a.predicate.value.localeCompare(b.predicate.value)
  );
};
export const extractSolutionData = data => ({
  bindings: data.results.bindings.map(binding => ({
    idea: binding.idea.value,
    content: binding.content.value,
    coordinates: [
      parseFloat(binding.coordinates.x),
      parseFloat(binding.coordinates.y)
    ],
    clusterLabel: binding.cluster_label,
    distanceFromCentroid: parseFloat(binding.distance_from_centroid)
  })),
  clusters: data.results.clusters.map(cluster => ({
    clusterLabel: cluster.cluster_label,
    topConcepts: cluster.top_concepts
  }))
});
