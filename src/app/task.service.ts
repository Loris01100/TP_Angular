import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}
  tasks = [
    new cTask('faire le tp', false),
    new cTask('Penser à la vie', false),
    new cTask('faire des abdominaux', true),
    new cTask('prendre de la matière grasse', false),
  ];

  addTask(name: string): void {
    if (name.trim() !== '') {
      const maTache = new cTask(name);
      this.tasks.push(maTache)
    }
  }

  removeTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  selectTask(index: number): cTask {
    return this.tasks[index];
  }

  updateTask(obj: cTask, index: number): cTask {
    this.tasks[index].name = obj.name;
    return obj;
  }

  getTasks(): cTask[] {
    return this.tasks;
  }

  changeTaskState(index: number): void {
    this.tasks[index].completed = !this.tasks[index].completed;
  }
}

export class cTask {
  constructor(public name: String, public completed: Boolean = false) {}
}

export interface iTask {
  name: string;
  completed: boolean;
}
