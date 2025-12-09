# reranker.py
from sentence_transformers import CrossEncoder

class MiniLMReranker:
    def __init__(self):
        self.model = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2", device='cpu')

    def rerank(self, query, docs):
        """
        docs: list of langchain Document objects
        returns: reranked list of Document
        """
        if not docs:
            return []
        
        pairs = [(query, doc.page_content) for doc in docs]

        # Scores: higher = better
        scores = self.model.predict(pairs)

        # Attach scores & sort
        scored = list(zip(docs, scores))
        scored_sorted = sorted(scored, key=lambda x: x[1], reverse=True)

        reranked_docs = [doc for doc, score in scored_sorted]
        return reranked_docs