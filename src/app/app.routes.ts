import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { HomeComponent } from './home/home.component';
import { StatisticsComponentComponent } from './statistics-component/statistics-component.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'task-detail/:id', component: TaskDetailComponent },
  { path: 'statistics', component: StatisticsComponentComponent },
];
