export const sparqlProjectListRequest = () =>
  coreServerRequest(sparqlProjectList());
export const describeEntityRequest = entityUrl =>
  coreServerRequest(describeEntity(entityUrl));
export const describeIdeaRequest = entityUrl =>
  coreServerRequest(describeIdea(entityUrl));
export const describeSessionRequest = entityUrl =>
  coreServerRequest(describeSession(entityUrl));
export const describeUserRequest = entityUrl =>
  coreServerRequest(describeUser(entityUrl));
export const describeIdeaContestRequest = entityUrl =>
  coreServerRequest(ideaContestDetails(entityUrl));
export const describeAllIdeas = () => coreServerRequest(findAllIdeasQuery());
export const fulltextSearchRequest = searchText =>
  coreServerRequest(fallbackSearchQuery(searchText));

export const prefix = {
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  gi2mo: "http://purl.org/gi2mo/ns#",
  dcterms: "http://purl.org/dc/terms/",
  inov: "http://purl.org/innovonto/"
};

const coreServerRequest = sparqlQuery => {
  return {
    params: {
      query: sparqlQuery,
      format: "json"
    }
  };
};

const describeIdea = entityUrl =>
  `
    PREFIX gi2mo:<http://purl.org/gi2mo/ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX inov:<http://purl.org/innovonto/types/#>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    DESCRIBE <` +
  entityUrl +
  `>
`;

const describeUser = entityUrl =>
  `
    PREFIX gi2mo:<http://purl.org/gi2mo/ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX inov:<http://purl.org/innovonto/types/#>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    DESCRIBE <` +
  entityUrl +
  `>
`;

const describeEntity = entityUrl =>
  `
    PREFIX gi2mo:<http://purl.org/gi2mo/ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX inov:<http://purl.org/innovonto/types/#>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    
    SELECT DISTINCT ?predicate ?object WHERE { <` +
  entityUrl +
  `> ?predicate ?object.
    }
`;

const describeSession = entityUrl =>
  `
    PREFIX inov:<http://purl.org/innovonto/types/#>
    DESCRIBE ?event ?idea ?insp ?inspidea <` +
  entityUrl +
  `>
    WHERE {
      <` +
  entityUrl +
  `> inov:hasTrackingEvent ?event.
       OPTIONAL {?event inov:submittedIdea ?idea}
       OPTIONAL {?event inov:hasInspiration ?insp}
       OPTIONAL {?insp inov:hasIdea ?inspidea}
    }
`;

const sparqlProjectList = () => `
    PREFIX gi2mo:<http://purl.org/gi2mo/ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX inov:<http://purl.org/innovonto/types/#>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    CONSTRUCT  {
        ?project a gi2mo:IdeaContest ;
                inov:numberIdeas ?ideaCount;
                inov:numberUsers ?userCount;
                dcterms:title ?title;
                dcterms:description ?description;
                dcterms:created ?created;
                gi2mo:endDate ?endDate;
                gi2mo:startDate ?startDate;
    }
    WHERE { 
    {
        SELECT * WHERE {
            ?project a gi2mo:IdeaContest;
                dcterms:title ?title;
                dcterms:description ?description;
                dcterms:created ?created;
                gi2mo:endDate ?endDate;
                gi2mo:startDate ?startDate;
        }
    }
    UNION
    {
    SELECT ?project (COUNT(?idea) as ?ideaCount) (COUNT(?user) as ?userCount) WHERE {
        {
    ?project a gi2mo:IdeaContest;
    OPTIONAL {
        ?idea a gi2mo:Idea;
            gi2mo:hasIdeaContest ?project.
        }
    } UNION {
    ?project a gi2mo:IdeaContest;
    OPTIONAL {
        ?user a inov:Ideator;
            inov:hasSubmittedIdeasForIdeaContest ?project.
            }
        } 
    }
    GROUP BY ?project
    }
}`;

const ideaContestDetails = ideaContestUrl =>
  `
PREFIX gi2mo: <http://purl.org/gi2mo/ns#>  
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX inov:<http://purl.org/innovonto/types/#>

CONSTRUCT {
    <` + ideaContestUrl + `> a gi2mo:IdeaContest;
    dcterms:title ?title;
    dcterms:description ?description;
    gi2mo:startDate ?startDate;
    gi2mo:endDate ?endDate;
    inov:hasResearchDescription ?researchDescription.
      ?researchDescription dcterms:title ?rdTitle;
      dcterms:description ?rdDescription.
} WHERE {
  <` + ideaContestUrl + `> a gi2mo:IdeaContest;
           dcterms:description ?description.
  OPTIONAL {<` + ideaContestUrl + `> dcterms:title ?title}.
  OPTIONAL {<` + ideaContestUrl + `> gi2mo:startDate ?startDate}.
  OPTIONAL {<` + ideaContestUrl + `> gi2mo:endDate ?endDate}.
  OPTIONAL {?researchDescription a inov:ResearchDescription;
                                 gi2mo:hasIdeaContest <` + ideaContestUrl + `>;
                                 dcterms:title ?rdTitle;
                                 dcterms:description ?rdDescription}
}
`;

//TODO use with caution.
const findAllIdeasQuery = () => `
  PREFIX gi2mo: <http://purl.org/gi2mo/ns#>  
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX inov:<http://purl.org/innovonto/types/#>
  
  DESCRIBE ?idea WHERE {
    ?idea a gi2mo:Idea.
  }
`;

const fallbackSearchQuery = searchText =>
  `
  PREFIX idea: <https://innovonto-core.imp.fu-berlin.de/entities/ideas/>  
  PREFIX gi2mo: <http://purl.org/gi2mo/ns#>  
  
  DESCRIBE ?idea
  WHERE { 
      ?idea a gi2mo:Idea;
         gi2mo:content ?content
      FILTER regex(?content, "` +
  searchText +
  `", "i")
  }`;

//TODO this does not work at the moment, presumably due to misconfiguration of the triplestore.
const fulltextSearchQuery = (searchText, limit = 10) =>
  `
  PREFIX idea: <https://innovonto-core.imp.fu-berlin.de/entities/ideas/>
  PREFIX text: <http://jena.apache.org/text#>
  PREFIX id: <http://identifiers.org/>
  PREFIX gi2mo: <http://purl.org/gi2mo/ns#>
  DESCRIBE ?idea
  WHERE {
  {
      ?idea text:query (gi2mo:content '` +
  searchText +
  `').
      ?idea a gi2mo:Idea.
    } UNION {
      ?i text:query (gi2mo:content '` +
  searchText +
  `').
      ?idea ?p ?i.
      ?idea a gi2mo:Idea.
    }
  }
LIMIT ` +
  limit;
