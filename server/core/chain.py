from core.prompt import prompt
from core.llm import llm
from langchain_core.output_parsers import StrOutputParser

parser = StrOutputParser()

def get_chain():
    return prompt | llm | parser
