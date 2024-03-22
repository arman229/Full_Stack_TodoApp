from fastapi import FastAPI,Depends,HTTPException
from todoapi import setting,todomodel
from typing import Annotated
from contextlib import asynccontextmanager
from sqlmodel import create_engine,Session,select 
 
 
 
 
# 3. Set Up Database Connection
# PostgreSQL is a type of database, and 
# psycopg is a tool that helps Python understand how to talk to PostgreSQL.
connection_string = str(setting.DATABASE_URL).replace("postgresql", "postgresql+psycopg")

# connect_args={"sslmode": "require"} SSL is a security protocol that encrypts the 
# data transmitted between your Python code and the PostgreSQL database

# pool_recycle=300 This parameter sets a time limit (in seconds) 
# for how long a database connection can remain open before
# it's automatically recycled or refreshed.
engine = create_engine( connection_string, connect_args={"sslmode": "require"}, pool_recycle=300)


# 4. creating  Database Tables 
def create_tables():
    # We can create multiple tables only we define the schema for each table
    todomodel.Todo.metadata.create_all(engine)
    # todomodel.ourData.metadata.create_all(engine)
    
    
# 5. Define Dependency for Database Session 
# @asynccontextmanager is a special tag you put before a function to make it
# capable of creating helpers that manage tasks in asynchronous code.
# lifespan is a friendly function that does some important prep work for our FastAPI app,
# making sure everything is set up and ready to go before your app starts doing its thing.
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("This statement will executes before the Creating tables....")
    create_tables()
    yield 
    
    
# 6. Define FastAPI App
# This means that when the application starts, the lifespan context manager will be executed.
app = FastAPI( lifespan=lifespan, title="todo apis")  

 
# 7. It ensures that a new session is created and closed properly after use.
#  this code defines a generator function get_session() that generates database session objects one at a time.
def get_session():
    with Session(engine) as session:
        yield session
        
 

@app.get("/todos/", response_model=list[todomodel.Todo])
def read_todos(session: Annotated[Session, Depends(get_session)]):
    todos = session.exec(select(todomodel.Todo)).all()
    return todos


@app.post("/todos/", response_model=todomodel.Todo)
def create_todo(todo: todomodel.Todo, session: Annotated[Session, Depends(get_session)]):
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return {"message": "Todo created successfully"}

@app.delete("/todos/{todo_id}", )
def delete_todo(todo_id: int, session: Session = Depends(get_session)):
    todo = session.get(todomodel.Todo, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found") 
    session.delete(todo)
    session.commit()
    
    return {"message": "Todo deleted successfully"}
@app.put("/todos/{todo_id}", )
def update_todos(todo_id: int, updated_todo: todomodel.Todo, session: Session = Depends(get_session)):
    todo = session.get(todomodel.Todo, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found") 
    todo.title = updated_todo.title
    todo.description = updated_todo.description
    todo.date = updated_todo.date
    todo.status = updated_todo.status
    todo.priority = updated_todo.priority
    todo.labels = updated_todo.labels 
    session.commit()
    
    return {"message": "Todo updated successfully"}