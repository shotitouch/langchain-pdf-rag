from config import MAX_HISTORY
from langchain_core.messages import HumanMessage, AIMessage

session_history = {}

def get_history(session_id: int):
    return session_history.get(session_id, [])

def add_to_history(session_id: int, question: str, answer: str):
    history = session_history.get(session_id, [])
    history.append(HumanMessage(content=question))
    history.append(AIMessage(content=answer))
    session_history[session_id] = history[-MAX_HISTORY:]
