from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are a helpful assistant. "
        "If context is provided, use it to answer the question accurately. "
        "If no useful context exists or context is empty, answer normally. "
        "For every part of your answer, connect it to one of the citations. "
        "If context exists but does not contain the answer, reply: 'Not found in context'."
    ),
    MessagesPlaceholder(variable_name="history"),
    ("human", "Question: {question}\n\nContext:\n{context}")
])
