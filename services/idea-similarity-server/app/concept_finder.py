from fastapi.encoders import jsonable_encoder

from sparql_handler import Sparql_handler

class Concept_finder():
    sh = Sparql_handler()
    test_query = """
    PREFIX gi2mo:<http://purl.org/gi2mo/ns#>
    PREFIX inov:<http://purl.org/innovonto/types/#>
    PREFIX oid:<http://purl.org/innovonto/legacy/types/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

        SELECT ?linkedResource (COUNT(?linkedResource) as ?resourceCount) 
        WHERE {
        ?idea a gi2mo:Idea.
        ?idea inov:hasAnnotation ?annotation.
        ?idea gi2mo:content ?content.
        ?annotation inov:annotationState "approved".
        ?annotation inov:hasResourceCandidate ?resourceCandidate.
        ?resourceCandidate inov:selected ?selected.
        ?resourceCandidate inov:hasLinkedResource ?linkedResource.
        FILTER (?selected = "true"^^xsd:boolean)
        VALUES(?idea) {
            (<https://innovonto-core.imp.fu-berlin.de/entities/ideas/207ed8be-e222-441c-bb86-3c75fc918208>)
        }
        }
        GROUP BY ?linkedResource
        ORDER BY DESC(?resourceCount)"""
    concept_count_query_start = """PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX gi2mo: <http://purl.org/gi2mo/ns#>
        PREFIX inov:<http://purl.org/innovonto/types/#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>

        SELECT ?linkedResource (COUNT(?linkedResource) as ?resourceCount) 
        WHERE {
        ?idea a gi2mo:Idea.
        ?idea inov:hasAnnotation ?annotation.
        ?idea gi2mo:content ?content.
        ?annotation inov:annotationState "approved".
        ?annotation inov:hasResourceCandidate ?resourceCandidate.
        ?resourceCandidate inov:selected ?selected.
        ?resourceCandidate inov:hasLinkedResource ?linkedResource.
        FILTER (?selected = "true"^^xsd:boolean)
        VALUES(?idea) {
        """

    concept_count_query_end = """}
        }
        GROUP BY ?linkedResource
        ORDER BY DESC(?resourceCount)
        LIMIT 20
        """

    test_uri = """(<https://innovonto-core.imp.fu-berlin.de/entities/ideas/dbb4089a-66c0-45a2-a269-50a3db55ed1e>)"""

    def get_cluster_list(self, ideas_list, labels):
        cluster_list = []
        unique_labels = set(labels)

        for label in unique_labels:
            ideas_in_cluster = self.get_all_ideas_in_one_cluster(ideas_list, labels, label)
            topwords_in_cluster = self.get_topwords_for_one_cluster(ideas_in_cluster)
            cluster = {"cluster_label": str(label), "top_concepts": topwords_in_cluster}
            cluster_list.append(cluster)

        return cluster_list

    def get_topwords_for_one_cluster(self, ideas_in_cluster):
        query = self.concept_count_query_start
        for idea_uri in ideas_in_cluster:
            query += """(<""" + idea_uri + """>)"""

        # query += self.test_uri
        query += self.concept_count_query_end

        # query = self.test_query
        query_response = jsonable_encoder(self.sh.return_response(query))

        topwords_for_one_cluster = self.parse_concepts_from_response(query_response)
        return topwords_for_one_cluster

    def get_all_ideas_in_one_cluster(self, idea_list, labels, cluster_label):
        ideas_in_cluster_list = []
        # find all ideas in the list that belong to the same cluster as cluster_label
        index_list = [i for i in range(len(labels)) if labels[i] == cluster_label]
        ideas_in_cluster_list = [idea_list[i] for i in index_list]

        return ideas_in_cluster_list

    def parse_concepts_from_response(self, query_response):
        top_concept_list = []
        for response_concept in query_response['results']['bindings']:
            concept = {"concept_uri": response_concept['linkedResource']['value'],
                       "count": str(response_concept['resourceCount']['value'])}

            top_concept_list.append(concept)
        return top_concept_list
