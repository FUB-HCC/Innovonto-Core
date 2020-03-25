import logging
from difflib import SequenceMatcher
from anytree import Node, PreOrderIter

from sparql_handler import Sparql_handler

logger = logging.getLogger("fastapi")

query_template = """
PREFIX gi2mo:<http://purl.org/gi2mo/ns#>
PREFIX inov:<http://purl.org/innovonto/types/#>
    
SELECT ?idea ?content ?numberInSession WHERE {
  ?idea a gi2mo:Idea;
        gi2mo:content ?content;
        inov:numberInSession ?numberInSession;
        inov:hasBrainstormingSession <%%SESSION%%>.
}
ORDER BY ASC(?numberInSession)
"""


def sequence_similarity(left, right):
    s = SequenceMatcher(None, left, right)
    return s.ratio()


def sort_by_number_in_session(node_list):
    return node_list


def to_node_list(sparql_response):
    node_list = []
    for resultObject in sparql_response['results']['bindings']:
        node_list.append(Node(resultObject['numberInSession']['value'],
                              content=resultObject['content']['value'],
                              numberInSession=int(resultObject['numberInSession']['value']),
                              ideaId=resultObject['idea']['value']))

    return node_list


def get_number_in_session(val):
    return val.numberInSession


def walk_tree(current_node, to_insert, result, similarity_func, threshold):
    similarity = similarity_func(current_node.content, to_insert.content)
    # print("Similarity is " + str(similarity) + " between: " + current_node.content + " and " + to_insert.content)
    if similarity > threshold:
        if result is None or result.similarityValue < similarity:
            # print("Updating most similar node to: " + str(current_node) + " with similarity " + str(similarity))
            current_node.similarityValue = similarity
            result = current_node
    for childNode in current_node.children:
        result = walk_tree(childNode, to_insert, result, similarity_func, threshold)
    return result


def find_most_similar_node(root, to_insert, similarity_func, threshold):
    result = walk_tree(root, to_insert, None, similarity_func, threshold)
    if result is None:
        print("No node found with similarity > threshold")
        return None
    else:
        print("Node with highest similarity to " + str(to_insert) + " is: " + str(result))
        return result


def clean_similarity_values(root):
    for node in PreOrderIter(root):
        node.similarityValue = 0.0


def add_one_node(root, to_insert, similarity_func, threshold):
    if root.is_leaf:
        to_insert.parent = root
        return root
    else:
        most_similar_node = find_most_similar_node(root, to_insert, similarity_func, threshold)
        clean_similarity_values(root)
        if most_similar_node is None:
            to_insert.parent = root
        else:
            to_insert.parent = most_similar_node
        return root


class SessionTreeCreator:
    sh = Sparql_handler()

    def get_ideas_for_session(self, session: str):
        query = query_template.replace("%%SESSION%%", session)
        logger.info('Return response of query:\n{}'.format(query))
        query_response = self.sh.return_response(query)
        return query_response

    def create_tree_for_session(self, session: str):
        # Step 1: Get Ideas
        sparql_response = self.get_ideas_for_session(session)
        node_list = sort_by_number_in_session(to_node_list(sparql_response))
        node_list.sort(key=get_number_in_session)
        root = Node("root")
        root.content = "ROOT"
        for node in node_list:
            add_one_node(root, node, sequence_similarity, 0.6)
        return root
