from fastapi.testclient import TestClient
from fastapi import FastAPI
from todoapi import setting
from sqlmodel import create_engine,Session,SQLModel
from todoapi.main import app,get_session
import pytest


connection_string:str = str(setting.TEST_DATABASE_URL).replace('postgresql','postgresql+psycopg')
engine=create_engine(connection_string,connect_args={'sslmode':'require'},pool_recycle=300,pool_size=10,echo=True)
@pytest.fixture(scope='module',autouse=True)
def get_db_session():   
     SQLModel.metadata.create_all(engine)
     yield Session(engine)
@pytest.fixture()
def test_app(get_db_session):
    def test_session():
        yield get_db_session
    app.dependency_overrides[get_session] = test_session
    with TestClient(app=app) as client:
        yield client         

test_todo={
    "title": "Python Learning During Holiday's",
    "description": "Learned Python during the holidays.",
     
    "labels": [
      "python",
      "sir qasim",
      "piaic"
    ],
    "status": "COMPLETED",
    "date": "2024-03-07T00:00:00",
    "priority": "LOW"
  }
 
def test_get_todos(test_app):
    responce = test_app.post('/todo/',json=test_todo)
    data=responce.json()
    responce = test_app.get('/todos')
    new_todo = responce.json()[-1]
    assert responce.status_code ==200
    assert new_todo['title']==test_todo['title']
    assert new_todo['description']==test_todo['description']
    assert new_todo['labels']==test_todo['labels']
    assert new_todo['status']==test_todo['status']
    assert new_todo['date']==test_todo['date']
    assert new_todo['priority']==test_todo['priority']
    
def test_add_todo(test_app):
    response = test_app.post('/todo', json=test_todo)
    data = response.json()
    assert response.status_code == 200
    assert data['message']=='Todo created successfully'

def test_delete_todo(test_app):
    response = test_app.post('/todo/', json=test_todo)
    data=response.json()
    response = test_app.delete(f"/todo/{data['todo_id']}") 
    data=response.json()
    assert response.status_code == 200
    assert data['message'] == 'Todo deleted successfully'
 
def test_update_todo(test_app):
    response = test_app.post('/todo', json=test_todo) 
    todo_id = response.json()['todo_id']   
    edited_todo = {
        "title": "Python Learning During Holiday's",
        "description": "Learned Python during the holidays.",
        "labels": [
            "python",
            "sir qasim",
            "piaic"
        ],
        "status": "COMPLETED",
        "date": "2024-03-07T00:00:00",
        "priority": "HIGH"
    }
    response = test_app.put(f'/todo/{todo_id}', json=edited_todo)  
    data = response.json()
    assert response.status_code == 200
    assert data['message'] == 'Todo updated successfully'
    