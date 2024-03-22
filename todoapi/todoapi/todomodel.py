# 2. Define Model (Todo)
from sqlmodel import SQLModel,Field
class Todo(SQLModel, table=True):
      id: int = Field(default=None, primary_key=True)
      title: str
      description: str
      date: str
      status: str
      priority: str
      labels: str
      
      
class Data(SQLModel,table=True):
      id: int = Field(default=None, primary_key=True)
      name:str      
 
# Q but in typescript we define the types of the status and priority enum and labels we define array or list