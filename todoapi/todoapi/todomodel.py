from sqlmodel import SQLModel, Field, JSON
from datetime import datetime
from typing import List
from enum import Enum


class Status(str, Enum):
    PENDING = 'PENDING'
    COMPLETED = 'COMPLETED'

class Priority(str, Enum):
    LOW = 'LOW'
    MEDIUM = 'MEDIUM'
    HIGH = 'HIGH'
    
class Todo(SQLModel, table=True):
    id: int|None = Field(default=None, primary_key=True)
    title: str
    description: str
    date: datetime
    status: Status
    priority: Priority
    labels: List[str] = Field(sa_type=JSON)
     
class RespoTodo(SQLModel):
    id: int 
    title: str
    description: str
    date: datetime
    status: Status
    priority: Priority
    labels: List[str] = Field(sa_type=JSON) 