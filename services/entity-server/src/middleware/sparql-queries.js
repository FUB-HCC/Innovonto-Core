export const sparqlProjectListParams = () => coreServerRequest(sparqlProjectList())

const coreServerRequest = sparqlQuery => {
  return ({
    params: {
      query: sparqlQuery,
      format: "json"
    }
  })
};

const sparqlProjectList = () => (`
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
}
`);