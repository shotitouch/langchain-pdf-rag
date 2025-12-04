from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are a helpful assistant. "
        "Use ONLY the context. If the answer is missing, respond: 'Not found in context'."
    ),
    MessagesPlaceholder(variable_name="history"),
    ("human", "Question: {question}\n\nContext:\n{context}")
])
