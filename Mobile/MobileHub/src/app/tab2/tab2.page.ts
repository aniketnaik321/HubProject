import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  tasks = [
    {
      title: 'In the morning',
      date: '10 May 2019',
      color: '#4CAF50',
      subtasks: ['Take medicine on time', 'Wash yesterday\'s clothes'],
    },
    {
      title: 'After work',
      date: '10 May 2019',
      color: '#FF9800',
      subtasks: ['Go to the bank', 'Register in the wave release service', 'See a movie'],
    },
    {
      title: 'Going to bed',
      date: '10 May 2019',
      color: '#3F51B5',
      subtasks: ['Call mom', 'Read a design journal'],
    },
    // Add more tasks as needed
  ];

  constructor() {}

  ngOnInit() {
    this.addMoreTasks();
  }

  addMoreTasks() {
    // Simulate adding more tasks
    for (let i = 0; i < 10; i++) {
      this.tasks.push({
        title: `Task ${this.tasks.length + 1}`,
        date: '10 May 2019',
        color: this.getRandomColor(),
        subtasks: ['Subtask 1', 'Subtask 2', 'Subtask 3'],
      });
    }
  }

  getRandomColor() {
    const colors = ['#4CAF50', '#FF9800', '#3F51B5'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

}
