from typing import List, Optional

from pydantic import BaseModel, Field, ConfigDict

class File(BaseModel):
    path: str = Field(description="The path to the file to be created or modified")
    purpose: str = Field(
        description="The purpose of the file to be created, e.g. 'main application logic','data processing module', etc.",
    )

class Plan(BaseModel):
    name: str = Field(description="The name of the app to built")
    description: str = Field(
        description="The online description of the app to be built, e.g. 'A web application for managing personal finances")
    techstack: str = Field(
        description="The tech stack to be used for the app. e.g. 'python','javascript','react','flask',etc."
    )
    features: List[File] = Field(
        description="A list of files to be created, each with a 'path' and 'purpose'"
    )

class ImplementationTask(BaseModel):
    file_path: str = Field(description="The path to the file to be created or modified")
    task_description: str = Field(description="The detailed description of the task to be performed on the file, e.g. 'add user")

class TaskPlan(BaseModel):
    implementation_steps: list[ImplementationTask] = Field(description="A list of steps to be taken implementations to run")
    model_config = ConfigDict(extra="allow")

class CoderState(BaseModel):
    task_plan: TaskPlan = Field(description="The plan for the task to be implemented")
    current_step_idx: int = Field(0, description="The index of the current step in the implementation steps")
    current_file_content: Optional[str] = Field(None, description="The content of the file currently being edited or created")