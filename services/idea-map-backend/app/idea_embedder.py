"""
The Idea_embedder has different algoritms that can be used for generating a similarity matrix from a list of ideas.

1. Assign a vector in nD-space to each Idea with a specified algorithm.
2. Calculate similarty between each pair of vectors. (Atm we use np.inner(). Should be updated) The result of this is a matrix of similarities between ideas.

author: Michael Tebbe (michael.tebbe@fu-berlin.de)
"""

import tensorflow_hub as hub
import numpy as np


class Idea_embedder():
    def USE(self, ideas, distance_metric='none'):
        """
        Source: https://colab.research.google.com/github/tensorflow/hub/blob/master/examples/colab/semantic_similarity_with_tf_hub_universal_encoder.ipynb#scrollTo=h1FFCTKm7ba4
        """
        print('Embedding with USE')
        idea_list = ideas

        embed = hub.load("https://tfhub.dev/google/universal-sentence-encoder-large/5")

        message_embeddings = embed(idea_list)

        similarity_matrix = self._calculate_similarity_matrix(message_embeddings, 'multi_inner')
        return similarity_matrix

    def _calculate_similarity_matrix(self, vectors, distance_metric='none'):
        similarity_matrix = vectors
        if distance_metric is 'none':
            similarity_matrix = vectors
        elif distance_metric is 'inner':
            similarity_matrix = np.inner(vectors, vectors)
        elif distance_metric is 'cosine':
            inner = np.inner(vectors, vectors)
            inner = inner / np.linalg.norm(inner)
            similarity_matrix = inner
        elif distance_metric is 'multi_inner':
            inner = np.inner(vectors, vectors)
            # inner = inner / np.linalg.norm(inner)
            inner = np.inner(vectors, vectors)
            # inner = inner / np.linalg.norm(inner)
            inner = np.inner(vectors, vectors)
            # inner = inner / np.linalg.norm(inner)
            inner = np.inner(vectors, vectors)
            inner = inner / np.linalg.norm(inner)

            similarity_matrix = inner

        return similarity_matrix
