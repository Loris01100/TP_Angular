import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  imports: [NgxChartsModule],
  selector: 'app-statistics',
  templateUrl: './statistics-component.component.html',
  styleUrls: ['./statistics-component.component.css'],
})
export class StatisticsComponentComponent implements OnInit {
  completedStats: { name: string; value: number }[] = [];
  priorityStats: { name: string; value: number }[] = [];
  typeStats: { name: string; value: number }[] = [];
  dueDateStats: { name: string; value: number }[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    const tasks = this.taskService.getTasks();
    const completed = tasks.filter((t) => t.completed).length;
    const notCompleted = tasks.length - completed;
    this.completedStats = [
      { name: 'Terminées', value: completed },
      { name: 'Non terminées', value: notCompleted },
    ];

    //priorité
 const priorityCounts = tasks.reduce((acc, task) => {
   acc[task.priority] = (acc[task.priority] || 0) + 1;
   return acc;
 }, {} as Record<string, number>);

 const allPriorities = ['Haute', 'Normale', 'Basse'];
 allPriorities.forEach((priority) => {
   if (!(priority in priorityCounts)) {
     priorityCounts[priority] = 0;
   }
 });

 this.priorityStats = Object.entries(priorityCounts).map(([key, value]) => ({
   name: key,
   value,
 }));


    //type
    const types = tasks.reduce((acc, task) => {
      acc[task.type] = (acc[task.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    this.typeStats = Object.entries(types).map(([key, value]) => ({
      name: key,
      value,
    }));

    //échéance
    const overdue = tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < new Date()
    ).length;
    const upcoming = tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) >= new Date()
    ).length;
    this.dueDateStats = [
      { name: 'En retard', value: overdue },
      { name: 'À venir', value: upcoming },
    ];
  }
}
