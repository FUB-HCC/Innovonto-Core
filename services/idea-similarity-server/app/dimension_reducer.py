"""
The Dimension_reducer takes nD-Vectors and reduces their dimensions to 2 with the specified algorithm.

author: Michael Tebbe (michael.tebbe@fu-berlin.de)
"""

from sklearn.decomposition import PCA
from sklearn.manifold import TSNE, MDS


class Dimension_reducer():
    random_seed = 1877

    def pca(self, similarity_matrix):
        """
        Reduce dimensions with PCA
        """

        print('Reducing dimensions with PCA')

        pca = PCA(n_components=3)
        pca_result = pca.fit_transform(similarity_matrix)
        similarity_matrix['x'] = pca_result[:, 0]
        similarity_matrix['y'] = pca_result[:, 1]

        return similarity_matrix[['x', 'y']]

    def cut(self, similarity_matrix):
        """
        Take the first two dimensions (for testing)
        """
        print('Reducing dimensions by dropping all but the first 2 Dimensions')
        similarity_matrix['x'] = similarity_matrix['dim_0']
        similarity_matrix['y'] = similarity_matrix['dim_1']

        return similarity_matrix[['x', 'y']]

    def tsne(self, similarity_matrix):
        """
        Reduce dimensions with t-SNE
        """

        print('Reducing dimensions with T-SNE')

        # https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html

        perplexity = 70
        n_iter = 2_000
        size = similarity_matrix.shape[0]
        if size < 100:
            perplexity = (size - 1) / 3.0
            n_iter = 10_000

        tsne = TSNE(n_components=2, verbose=1, perplexity=perplexity, n_iter=n_iter, angle=0.1,
                    random_state=self.random_seed)
        tsne_result = tsne.fit_transform(similarity_matrix)

        # TODO: Throw this out, this is only done, because frontend is not ready
        # tsne_result =np.divide(tsne_result,4)

        similarity_matrix['x'] = tsne_result[:, 0]
        similarity_matrix['y'] = tsne_result[:, 1]

        return similarity_matrix[['x', 'y']]

    def mds(self, similarity_matrix):
        """
        Reduce dimensions with MDS
        """

        print('Reducing dimensions with MDS')
        mds = MDS(n_components=2, metric=False)
        result = mds.fit_transform(similarity_matrix)
        result = result * 5
        similarity_matrix['x'] = result[:, 0]
        similarity_matrix['y'] = result[:, 1]

        return similarity_matrix[['x', 'y']]
