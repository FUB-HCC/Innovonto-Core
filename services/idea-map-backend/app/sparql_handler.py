from SPARQLWrapper import SPARQLWrapper, JSON

dummy_query = """
PREFIX gi2mo:<http://purl.org/gi2mo/ns#>

SELECT ?idea ?content
WHERE {
  ?idea a gi2mo:Idea.
  ?idea gi2mo:content ?content.
}
ORDER BY ?idea
"""

sparql_backend_server = "https://innovonto-core.imp.fu-berlin.de/management"
sparql_backend_endpoint = "/core/query"

sparql = SPARQLWrapper(sparql_backend_server + sparql_backend_endpoint)
sparql.setReturnFormat(JSON)


class Sparql_handler():

  def return_response(self, query):
    sparql.setQuery(query)
    results = sparql.query().convert()
    return results