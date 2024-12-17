import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  tasks = [
    { tache: 'Finir le TP', estvalide: true },
    { tache: 'Finir le Projet Transverse', estvalide: false },
    { tache: 'faire des abdominaux', estvalide: true },
  ];

  newTask: string | undefined;

  addTask(): void {
    if (this.newTask && this.newTask.trim() !== '') {
      this.tasks.push({ tache: this.newTask.trim(), estvalide: false });
      this.newTask = '';
    }
  }

  changerEtat(index: number): void {
    this.tasks[index].estvalide = !this.tasks[index].estvalide;
  }

  removeTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  updateTask(): void {
    
  }
}
