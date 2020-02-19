"""
The Idea_clusterer has different algorithms that can be used for generating unsupervised clusters from embeddings.


author: Michael Tebbe (michael.tebbe@fu-berlin.de)
"""

from sklearn.cluster import KMeans, OPTICS, cluster_optics_dbscan, SpectralClustering, AgglomerativeClustering
import numpy as np


class Idea_clusterer():
    def cluster_kmeans(self, similarity_matrix):
        print('Clustering with k-Means.')

        # pca = PCA(n_components=10)
        # similarity_matrix = pca.fit_transform(similarity_matrix)
        kmeans = KMeans(n_clusters=15).fit(similarity_matrix)
        labels = kmeans.labels_
        print(kmeans.inertia_)

        distances = kmeans.transform(similarity_matrix) ** 2
        distances = distances.sum(axis=1)
        print("distances   __________", distances.min())
        return labels, distances

    def cluster_optics(self, similarity_matrix):
        print('Clustering with optics.')
        # TODO: Fix
        clust = OPTICS(min_samples=2, xi=0.005)  # , min_cluster_size=.05)
        clust.fit(similarity_matrix)
        labels_050 = cluster_optics_dbscan(reachability=clust.reachability_,
                                           core_distances=clust.core_distances_,
                                           ordering=clust.ordering_, eps=100)

        labels = clust.labels_[clust.ordering_]
        # labels = labels_050
        labels = np.add(labels, 1)
        # labels = labels_050
        return labels

    def cluster_spectral(self, similarity_matrix):
        print('Clustering with spectral clustering')
        clust = SpectralClustering(n_clusters=60,
                                   assign_labels="discretize",
                                   random_state=0)
        clust.fit(similarity_matrix)
        labels = clust.labels_
        return labels

    def cluster_list(self, similarity_matrix, label_list):
        print('Clustering based on a list.')
        # TODO: The idea is to return labels (which result in colors) based on a list, e.g. a list of authors of ideas
        # insert the list to the set 
        list_set = set(label_list)
        # convert the set to the list 
        unique_list = (list(list_set))
        for x in unique_list:
            pass

        labels = np.empty(len(label_list))

    def cluster_agglomerative(self, similarity_matrix):
        print('Clustering with agglomerative clustering.')
        clust = AgglomerativeClustering(n_clusters=60)
        clust.fit(similarity_matrix)
        labels = clust.labels_
        return labels
