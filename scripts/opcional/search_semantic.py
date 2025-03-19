import numpy as np
from pymongo import MongoClient
from langchain_huggingface import HuggingFaceEmbeddings

def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Conexión a MongoDB
client = MongoClient("mongodb+srv://haoranye:o6CsduIQKTddrSZt@cluster0.tgdaa.mongodb.net")
db = client["practica1"]
collection = db["restaurants_embeddings"]

# Inicializar embeddings
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Lista de consultas claras para probar diferentes escenarios:
queries = [
    "Chinese restaurant in Cardiff",
    "Italian restaurant in London",
    "Curry restaurant in Broughton",
    "Thai food in Essex"
]

for query in queries:
    print(f"\n🔍 Resultados para consulta: '{query}'")
    query_embedding = embeddings.embed_query(query)

    results = []
    for doc in collection.find():
        score = np.dot(query_embedding, doc["embedding"]) / (np.linalg.norm(query_embedding) * np.linalg.norm(doc["embedding"]))
        results.append((score, doc))

    results = sorted(results, key=lambda x: x[0], reverse=True)

    print(f"\nTop 5 resultados para la consulta: '{query}':\n")
    for score, doc in results[:5]:
        print(f"Similitud: {score:.4f}")
        print(f"Nombre: {doc.get('name', 'Sin nombre')}")
        print(f"Tipo de comida: {doc.get('type_of_food', 'Sin tipo')}")
        print(f"Dirección: {doc.get('address', 'Sin dirección')}")
        print("---------------")
