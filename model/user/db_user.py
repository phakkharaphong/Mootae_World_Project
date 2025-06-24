import psycopg2
import json
from fastapi import APIRouter
from pydantic import BaseModel



with open('./model/user/confic_user.json','r') as file:
    config = json.load(file)

#Database Configuration
db_my_confic = config['postgres']

def get_db_connection():
    connection = psycopg2.connect(
        host = db_my_confic['host'],
        port = db_my_confic['port'],
        database = db_my_confic['database'],
        user = db_my_confic['user'],
        password = db_my_confic['password']
    )
    return connection

def read_from_db(query, params=None):
    con = get_db_connection()
    cursor = con.cursor()
    cursor.execute(query,params)
    result = cursor.fetchall()
    cursor.close()
    con.close()
    return result
