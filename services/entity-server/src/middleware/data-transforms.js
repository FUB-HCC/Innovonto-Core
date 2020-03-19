export const extractIdeas = data =>
  data["@graph"]
    .filter(e => e["@type"].includes("Idea"))
    .map(idea => ({
      id: idea["@id"],
      content: idea.content
    }));

export const extractInspirations = data =>
  data["@graph"]
    .filter(e => e["@type"].includes("StaticInspiration"))
    .map(inspiration => ({
      id: inspiration["@id"],
      content: inspiration.content
    }));

export const extractExemplars = data =>
  data["@graph"]
    .filter(e => e["@type"].includes("Exemplar"))
    .map(exemplar => ({
      id: exemplar["@id"],
      idea: extractIdeas(data).find(idea => exemplar.hasIdea === idea.id)
    }));

export const extractEvents = data => {
  const [sEvents] = data["@graph"]
    .filter(e => e["@type"].includes("BrainstormingSession"))
    .map(session =>
      session.hasEvent
        .filter(
          sEvent =>
            sEvent.eventType === "idea-submit" ||
            sEvent.eventType === "inspiration-response"
        )
        .map(sEvent => ({
          id: sEvent["@id"],
          eventType: sEvent.eventType,
          content:
            sEvent.eventType === "idea-submit"
              ? extractIdeas(data).find(
                  idea => idea.id === sEvent.submittedIdea
                )
              : extractInspirations(data).find(
                  insp => insp.id === sEvent.hasInspiration
                ),
          timerValue: sEvent.timerValue
        }))
        .sort((a, b) => b.timerValue - a.timerValue)
    );
  return sEvents;
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
