import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private storageKey = 'tasks';
  tasks: cTask[] = [];

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    const storedTasks = localStorage.getItem(this.storageKey);
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks).map(
        (task: iTask) => new cTask(task.name, task.completed)
      );
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  addTask(
    name: string,
    dueDate: Date | null,
    assignedUser: string | null,
    type: string,
    priority: 'Haute' | 'Normale' | 'Basse' 
  ): void {
    if (name.trim() !== '') {
      const maTache = new cTask(
        name,
        false,
        new Date(),
        dueDate,
        assignedUser,
        type,
        priority
      );
      this.tasks.push(maTache);
      this.saveToLocalStorage();
    }
  }

  removeTask(index: number): void {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  selectTask(index: number): cTask {
    return this.tasks[index];
  }

  updateTask(obj: cTask, index: number): void {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index] = obj;
      this.saveToLocalStorage();
    }
  }

  getTasks(): cTask[] {
    return this.tasks;
  }

  changeTaskState(index: number): void {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index].completed = !this.tasks[index].completed;
      this.saveToLocalStorage();
    }
  }
}

export class cTask {
  constructor(
    public name: string,
    public completed: boolean = false,
    public creationDate: Date = new Date(),
    public dueDate: Date | null = null,
    public assignedUser: string | null = null,
    public type: string = 'Général',
    public priority: 'Haute' | 'Normale' | 'Basse' = 'Normale'
  ) {}
}

export interface iTask {
  name: string;
  completed: boolean;
}
