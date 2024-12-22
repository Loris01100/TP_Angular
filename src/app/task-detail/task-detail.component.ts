import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { cTask } from '../task.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit {
  task!: cTask;
  taskIndex!: number;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id) && id >= 0) {
      this.task = this.taskService.selectTask(id);
      this.taskIndex = id;
    } else {
      console.error('ID invalide ou tâche introuvable.');
    }
  }

  updateTask(): void {
    if (this.task) {
      this.taskService.updateTask(this.task, this.taskIndex);
    }
  }
}
