from langchain_community.embeddings import HuggingFaceEmbeddings
import json
from bson import ObjectId
from pymongo import MongoClient
from langchain_huggingface import HuggingFaceEmbeddings


# Conexión a MongoDB 
client = MongoClient("mongodb+srv://haoranye:o6CsduIQKTddrSZt@cluster0.tgdaa.mongodb.net")
db = client["practica1"]
collection = db["restaurants_embeddings"]

# Inicializar el generador de embeddings usando el modelo open source
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Leer archivo NDJSON y ajustar formato MongoDB extended JSON
data = []
with open("../../datasets/restaurants.json", "r", encoding="utf-8") as f:
    for line in f:
        if line.strip():
            try:
                obj = json.loads(line)

                # Convertir explícitamente _id desde {"$oid": "..."} a ObjectId(...)
                if '_id' in obj and '$oid' in obj['_id']:
                    obj['_id'] = ObjectId(obj['_id']['$oid'])

                data.append(obj)
            except json.JSONDecodeError as e:
                print("Error al decodificar la línea:", line)
                print(e)

# Procesar cada documento: generar embedding y almacenarlo en MongoDB
for doc in data:
    # Combina campos relevantes para formar el texto del embedding
    text = f"{doc.get('name', '')}. {doc.get('type_of_food', '')}. {doc.get('address', '')}"
    
    # Genera el embedding
    embedding_vector = embeddings.embed_query(text)
    
    # Añadir embedding al documento
    doc["embedding"] = embedding_vector
    
    # Insertar documento en MongoDB
    collection.insert_one(doc)

print("Documentos indexados con embeddings correctamente.")
