import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { RouterLink, RouterModule } from '@angular/router';

type TaskPriority = 'Haute' | 'Normale' | 'Basse';

@Component({
  selector: 'app-task-list',
  imports: [NgFor, FormsModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})


export class TaskListComponent {
  newTaskPriority: TaskPriority = "Normale";
  myTaskService = new TaskService();

  tasks = this.myTaskService.getTasks();

  newTaskName: string = '';
  newTaskDueDate: Date | null = null;
  newTaskAssignedUser: string | null = null;
  newTaskType: string = 'Général';

  addTask(): void {
    if (this.newTaskName.trim() !== '') {
      this.myTaskService.addTask(
        this.newTaskName,
        this.newTaskDueDate,
        this.newTaskAssignedUser,
        this.newTaskType,
        this.newTaskPriority
      );

      this.newTaskName = '';
      this.newTaskDueDate = null;
      this.newTaskAssignedUser = null;
      this.newTaskType = 'Général';
      this.newTaskPriority = 'Normale';

      this.tasks = this.myTaskService.getTasks();
    }
  }

  removeTask(index: number): void {
    this.myTaskService.removeTask(index);
    this.tasks = this.myTaskService.getTasks();
  }

  changeTaskState(index: number): void {
    this.myTaskService.changeTaskState(index);
    this.tasks = this.myTaskService.getTasks();
  }

  updateTask(index: number, updatedTask: any): void {
    this.myTaskService.updateTask(updatedTask, index);
    this.tasks = this.myTaskService.getTasks();
  }
}
