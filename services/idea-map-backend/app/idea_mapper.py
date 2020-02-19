"""
The Idea_mapper handles the logic of the application.
The workflow is:
1. create JSON Object from query response
2. generate vector embedding (optionally similarity matrix) with specified algorithm (happens in Idea_embedder)
3. perform dimensionality reduction on vectors to get coordinates (happens in Dimension_reducer)
4. create a JSON-object, where each idea has coordinates


author: Michael Tebbe (michael.tebbe@fu-berlin.de)
"""

import hashlib
from pathlib import Path
import pandas as pd
import numpy as np

from dimension_reducer import Dimension_reducer
from idea_embedder import Idea_embedder
from idea_clusterer import Idea_clusterer
from concept_finder import Concept_finder


class Idea_mapper():
    dimension_reducer = Dimension_reducer()
    idea_clusterer = Idea_clusterer()
    idea_embedder = Idea_embedder()
    concept_finder = Concept_finder()
    cache_base_path = "./cache/embeddings/"

    def map_ideas(self, query_response, similarity_algorithm='USE', dim_reduction_algorithm='PCA',
                  cluster_method='kmeans'):
        # create JSON Object from query response
        ideas = query_response  # pd.read_json(query_response)
        # print(ideas['results']['bindings'][0])

        # generate embedding matrix with specified algorithm
        Path(self.cache_base_path).mkdir(parents=True, exist_ok=True)
        hash_id = str(self.hash_for(query_response))
        print(hash_id)
        if self._embeddings_existing_for(hash_id):
            print('Reading embeddings from file.')
            similarity_matrix, similarity_matrix_np = self._read_embeddings_from_file(hash_id)
        else:
            similarity_matrix, similarity_matrix_np = self._create_embeddings(ideas, similarity_algorithm)
            self._write_embeddings_to_file(similarity_matrix, similarity_matrix_np, hash_id)

        # perform clustering on the embeddings
        labels, distances = self.create_cluster_labels(similarity_matrix_np, cluster_method)

        # perform dimensionality reduction on similarity matrix to get coordinates
        coordinates = self._reduce_dimensions(similarity_matrix, dim_reduction_algorithm)

        cluster_list = self._attach_topwords(ideas, labels)

        # create a JSON-object, where each idea has coordinates and labels and there's a list of topwords for each cluster
        ideas_with_coordinates = self._attach_coordinates_to_ideas(ideas, coordinates, labels, distances, cluster_list)

        # print(json.dumps(ideas_with_coordinates, indent=4, sort_keys=True))

        return ideas_with_coordinates

    def hash_for(self, data):
        # Prepare the project id hash
        hashId = hashlib.md5()

        hashId.update(repr(data).encode('utf-8'))

        return hashId.hexdigest()

    def _create_embeddings(self, ideas, similarity_algorithm):
        # matrix dimensions are alway equal to the number of ideas
        matrix_dimension = len(ideas['results']['bindings'])

        idea_list = []
        for idea in ideas['results']['bindings']:
            idea_list.append(idea['content']['value'])

        matrix_dimension = len(ideas['results']['bindings'])

        similarity_matrix_np = np.random.rand(matrix_dimension, matrix_dimension)

        similarity_matrix = pd.DataFrame()
        if similarity_algorithm == 'random':
            # pass randomly initialized similarity matrix
            pass
        elif similarity_algorithm == 'USE':
            # create similarity matrix from USE embeddings
            similarity_matrix_np = self.idea_embedder.USE(idea_list)
        columns_names = ['dim_' + str(i) for i in range(similarity_matrix_np.shape[1])]
        similarity_matrix = pd.DataFrame(similarity_matrix_np, columns=columns_names)

        return similarity_matrix, similarity_matrix_np

    def create_cluster_labels(self, similarity_matrix_np, cluster_method):
        labels = np.zeros(similarity_matrix_np.shape[0])
        if cluster_method == 'kmeans':
            # self.dimension_reducer.pca(similarity_matrix)
            labels, distances = self.idea_clusterer.cluster_kmeans(similarity_matrix_np)
        elif cluster_method == 'optics':
            labels = self.idea_clusterer.cluster_optics(similarity_matrix_np)
        elif cluster_method == 'spectral':
            labels = self.idea_clusterer.cluster_spectral(similarity_matrix_np)
        elif cluster_method == 'agglomerative':
            labels = self.idea_clusterer.cluster_agglomerative(similarity_matrix_np)

        return labels, distances

    def _reduce_dimensions(self, similarity_matrix, dim_reduction_algorithm):
        coordinates = similarity_matrix

        if dim_reduction_algorithm == 'PCA':
            coordinates = self.dimension_reducer.tsne(similarity_matrix)

        elif dim_reduction_algorithm == 'TSNE':
            coordinates = self.dimension_reducer.tsne(similarity_matrix)
        elif dim_reduction_algorithm == 'MDS':
            coordinates = self.dimension_reducer.mds(similarity_matrix)

        elif dim_reduction_algorithm == 'cut':
            coordinates = self.dimension_reducer.cut(similarity_matrix)
            # coordinates = similarity_matrix['id']

        return coordinates[['x', 'y']]

    def _attach_coordinates_to_ideas(self, ideas, coordinates, labels, distances, cluster_list):

        # attach cluster topconcepts
        ideas['results']['clusters'] = cluster_list

        # attach ideas
        for i, idea in enumerate(ideas['results']['bindings']):
            idea['coordinates'] = {}
            idea['coordinates']['x'] = str(coordinates.at[i, 'x'])
            idea['coordinates']['y'] = str(coordinates.at[i, 'y'])
            idea['cluster_label'] = str(labels[i])
            idea['distance_from_centroid'] = str(distances[i])

        return ideas

    def _embeddings_existing_for(self, hashvalue):
        testfile = Path(self.cache_base_path + hashvalue + "_matrix.json")
        return testfile.is_file()

    def _read_embeddings_from_file(self, hashvalue):
        similarity_matrix = pd.read_json(self.cache_base_path + hashvalue + "_matrix.json")
        similarity_matrix_np = pd.read_json(self.cache_base_path + hashvalue + "_matrix_np.json").to_numpy()
        return similarity_matrix, similarity_matrix_np

    def _write_embeddings_to_file(self, similarity_matrix, similarity_matrix_np, hashvalue):
        pd.DataFrame(similarity_matrix_np).to_json(self.cache_base_path + hashvalue + "_matrix_np.json")
        similarity_matrix.to_json(self.cache_base_path + hashvalue + "_matrix.json")

    def _attach_topwords(self, ideas, labels):
        cluster_list = []
        idea_list = []
        for idea in ideas['results']['bindings']:
            idea_list.append(idea['idea']['value'])

        cluster_list = self.concept_finder.get_cluster_list(idea_list, labels)

        return cluster_list
