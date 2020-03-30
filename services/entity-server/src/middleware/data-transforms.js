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

  result.id = data["@id"];
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

export const extractSolutionData = results => {
  return {
    bindings: results.bindings.map(binding => ({
      idea: binding.idea.value,
      content: binding.content.value,
      coordinates: [
        parseFloat(binding.coordinates.x),
        parseFloat(binding.coordinates.y)
      ],
      clusterLabel: binding.cluster_label,
      distanceFromCentroid: parseFloat(binding.distance_from_centroid),
      ideaType: binding.ideaType ? binding.ideaType.value : "None"
    })),
    clusters: results.clusters.map(cluster => ({
      clusterLabel: cluster.cluster_label,
      topConcepts: cluster.top_concepts
    }))
  };
};

function convertPropertyToArray(value) {
  return value instanceof Array ? value : [value];
}

function convertPropertiesToArray(data, properties) {
  properties.forEach(property => {
    if (data.hasOwnProperty(property)) {
      data[property] = convertPropertyToArray(data[property]);
    }
  });
  return data;
}

//TODO this is manual and complicated. I need a better solution for this:
/**I need something that:
 a) For a given property name coerces the datatype to array
 b) For a given property selects fallback properties if the property is not present (for example: if the title is not present -> show local id)
 **/
export const extractIdeaDetails = data => {
  const propertiesToArray = convertPropertiesToArray(data, [
    "hasReview",
    "hasAnnotation",
    "hasTextualRefinement"
  ]);
  return {
    ...propertiesToArray,
    id: data["@id"],
    hasReview: propertiesToArray.hasReview
      ? propertiesToArray.hasReview.map(review => ({
          ...review
        }))
      : null,
    refinements: propertiesToArray.hasTextualRefinement
      ? propertiesToArray.hasTextualRefinement.map(refinement => ({
          id: refinement["@id"],
          question: refinement.description,
          answer: refinement.contentGerman
            ? refinement.contentGerman["@value"]
            : refinement.content
        }))
      : null,
    creator: propertiesToArray.creator
      ? propertiesToArray.creator
      : propertiesToArray.hasCreator
  };
};

export const extractUserDetails = data => {
  const propertiesToArray = convertPropertiesToArray(data, [
    "hasBrainstormingSession",
    "isCreatorOf",
    "hasSubmittedIdeasForIdeaContest"
  ]);
  return {
    ...propertiesToArray,
    id: propertiesToArray["@id"]
  };
};
