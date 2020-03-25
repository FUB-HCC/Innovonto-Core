"""
This is the REST-API.
We set the available methods here, make the other modules handle the requests and return responses.

SPARQL-queries go to the Sparql_handler.

The results of the queries go to the Idea_mapper, where the mapping happens.

author: Michael Tebbe (michael.tebbe@fu-berlin.de)
"""
from idea_contest_handler import Idea_Contest_Handler
from sparql_handler import Sparql_handler
from idea_mapper import Idea_mapper
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
import logging

# TODO logging does not work inside docker container
logger = logging.getLogger("fastapi")

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    # TODO add innovonto-core
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sh = Sparql_handler()
im = Idea_mapper()
ich = Idea_Contest_Handler()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get('/ideamap/api/v0.2/get_default_map')
def get_default_map(idea_contest: str):
    logger.info('Generating Default Idea Map for idea contest {}'.format(idea_contest))
    # Step 1: Get Ideas
    ideas_for_contest = jsonable_encoder(ich.get_ideas_for_idea_contest(idea_contest))

    # Step 2: Generate Similarities and Reduce
    mapping_result = im.map_ideas(query_response=ideas_for_contest, similarity_algorithm='USE',
                                  dim_reduction_algorithm='PCA', cluster_method='kmeans')
    return mapping_result


# Example: http://localhost:5000/solutionmap/api/v0.1/get_query_response?query=PREFIX%20gi2mo%3A%3Chttp%3A%2F%2Fpurl.org%2Fgi2mo%2Fns%23%3E%0A%0ASELECT%20%3Fidea%20%3Fcontent%0AWHERE%20%7B%0A%20%20%3Fidea%20a%20gi2mo%3AIdea.%0A%20%20%3Fidea%20gi2mo%3Acontent%20%3Fcontent.%0A%7D%0AORDER%20BY%20%3Fidea
@app.get('/ideamap/api/v0.1/get_query_response')
def get_query_response(query: str = ''):
    logger.info('Return response of query:\n{}'.format(query))
    query_response = sh.return_response(query)
    return jsonable_encoder(query_response)


# Example: http://localhost:5000/solutionmap/api/v0.1/get_map?query=PREFIX%20gi2mo%3A%3Chttp%3A%2F%2Fpurl.org%2Fgi2mo%2Fns%23%3E%0A%0ASELECT%20%3Fidea%20%3Fcontent%0AWHERE%20%7B%0A%20%20%3Fidea%20a%20gi2mo%3AIdea.%0A%20%20%3Fidea%20gi2mo%3Acontent%20%3Fcontent.%0A%7D%0AORDER%20BY%20%3Fidea&similarity_algorithm=USE&dim_reduction_algorithm=PCA
@app.get('/ideamap/api/v0.1/get_map')
def get_map(query: str, similarity_algorithm: str = 'USE', dim_reduction_algorithm: str = 'PCA',
            cluster_method: str = 'kmeans'):
    # logger.info('Create Map of query:\n{}'.format(query))

    query_response = jsonable_encoder(sh.return_response(query))
    # logger.info('Query Response is: ' + str(query_response))

    mapping_result = im.map_ideas(query_response=query_response, similarity_algorithm=similarity_algorithm,
                                  dim_reduction_algorithm=dim_reduction_algorithm, cluster_method=cluster_method)
    logger.info(type(mapping_result))
    return jsonable_encoder(mapping_result)
