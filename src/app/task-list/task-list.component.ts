import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  myTaskService = new TaskService();

  tasks = this.myTaskService.getTasks();
  newTask = '';
}
