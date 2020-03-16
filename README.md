# Innovonto-Core
The core Innovonto-Knowledge Graph Server: Contains a Fuseki-Based Triplestore and a react-based frontend

## This project uses git submodules!
At the moment, the project uses a submodule to include the Innovonto-Ontology, located at https://github.com/FUB-HCC/Innovonto-Ontology

[Read more about submodules here](https://git-scm.com/book/en/v2/Git-Tools-Submodules)



If you want to get build a deployment artifact, check out the project using:

	git clone --recurse-submodules https://github.com/FUB-HCC/Innovonto-Core.git
	

## Development

	TODO add dev commands here

## Deployment

	Step 1: Build the different artifacts (TODO move into docker-build)
	    1) Entity Server: yarn build
	    2) Ontology: make
	    3) idea-map-backend

    Step 2: run docker-compose build
    Step 3: push


## Services within this project

### Entity Server

### Fuseki
Fuseki is a triple-store combined with a SPARQL-server it provides the backend for the basic entity-server displays and a public SPARQL-endpoint to access the idea knowledge graph.
[Read more about fuseki here](https://jena.apache.org/documentation/fuseki2/).

### idea-map backend
In order to build an idea-map, we use a python-based pipeline to build vector-embeddings from the ideas, cluster these and then reduce the embeddings to a 2-Dimensional representation. These steps are done by the python app located at /services/idea-map-backend

### Innovonto-Ontology (via submodule)
see https://github.com/FUB-HCC/Innovonto-Ontology for docs.
