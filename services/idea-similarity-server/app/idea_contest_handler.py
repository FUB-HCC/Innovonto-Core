import logging

from sparql_handler import Sparql_handler

logger = logging.getLogger("fastapi")

query_template = """
PREFIX gi2mo:<http://purl.org/gi2mo/ns#>

SELECT ?idea ?content WHERE {
  ?idea a gi2mo:Idea;
        gi2mo:content ?content;
        gi2mo:hasIdeaContest <%%IDEA_CONTEST%%>.
}
ORDER BY ?idea
"""


class Idea_Contest_Handler():
    sh = Sparql_handler()

    def get_ideas_for_idea_contest(self, idea_contest: str):
        query = query_template.replace("%%IDEA_CONTEST%%", idea_contest)
        logger.info('Return response of query:\n{}'.format(query))
        query_response = self.sh.return_response(query)
        return query_response
