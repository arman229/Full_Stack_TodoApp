from fastapi import FastAPI,Depends,HTTPException
from todoapi import setting,todomodel
from typing import Annotated,List,Dict
from contextlib import asynccontextmanager
from sqlmodel import create_engine,Session,select 
from fastapi.middleware.cors import CORSMiddleware
import ast
 
 
connection_string = str(setting.DATABASE_URL).replace("postgresql", "postgresql+psycopg")
 
engine = create_engine( connection_string, connect_args={"sslmode": "require"}, pool_recycle=300)
 
def create_tables():
    
    todomodel.Todo.metadata.create_all(engine)
     
    
 
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("This statement will executes before the Creating tables....")
    create_tables()
    yield  
app = FastAPI( lifespan=lifespan, title="todo apis")  

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
) 
def get_session():
    with Session(engine) as session:
        yield session
 
    
    
@app.get("/todos/", response_model=list[todomodel.Todo])
def read_todos(session: Annotated[Session, Depends(get_session)]):
    todos = session.exec(select(todomodel.Todo)).all()
    return todos

 

@app.post("/todo", response_model=Dict[str,str])
def add_todo(todo: todomodel.Todo, session: Annotated[Session, Depends(get_session)]):
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return {"message": "Todo created successfully"}

@app.delete("/todo/{todo_id}",response_model=Dict[str,str] )
def delete_todo(todo_id: int, session: Annotated[Session, Depends(get_session)]):
    todo = session.get(todomodel.Todo, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found") 
    session.delete(todo)
    session.commit()
    
    return {"message": "Todo deleted successfully"}

@app.put("/todo/{todo_id}",response_model=Dict[str,str] )
def update_todo(todo_id: int, updated_todo: todomodel.Todo, session: Annotated[Session, Depends(get_session)]):
    todo = session.get(todomodel.Todo, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found") 
    todo.title = updated_todo.title
    todo.description = updated_todo.description
    todo.date = updated_todo.date
    todo.status = updated_todo.status
    todo.priority = updated_todo.priority
    todo.labels  = updated_todo.labels

    session.commit()
    
    return {"message": "Todo updated successfully"}