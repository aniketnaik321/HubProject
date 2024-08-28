import { Component, OnInit } from '@angular/core';
import { IIssues } from '../shared-models/ProjectModels';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  tasks = [
    // Your API data here
    {
      "id": 86,
      "issueKey": "TO",
      "summary": "Form to add new Task",
      "description": "Implement Task planner mobile application...",
      "statusName": "To Do",
      "statusTagColorCode": "#6C757D",
      "dueDate": new Date("2024-08-25T06:16:23.308"),
      "assigneeUserName": "AniketN"
    },
    {
      "id": 85,
      "issueKey": "GP",
      "summary": "UI Design",
      "description": "Google Map Crawler",
      "statusName": "In Progress",
      "statusTagColorCode": "#5E8A61",
      "dueDate": new Date("2024-08-22T21:22:34.165"),
      "assigneeUserName": "AniketN"
    },
    // More data...
  ];
  
  filteredTasks :IIssues[] = [];
  selectedStatus = 'all';

  constructor(private actionSheetController: ActionSheetController) {}

  ngOnInit() {
    this.filteredTasks = this.tasks; // Initially show all tasks
  }

  async openFilterMenu() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Filter Tasks',
      buttons: [
        {
          text: 'All',
          handler: () => {
            this.selectedStatus = 'all';
            this.filterTasks();
          }
        },
        {
          text: 'To Do',
          handler: () => {
            this.selectedStatus = 'To Do';
            this.filterTasks();
          }
        },
        {
          text: 'In Progress',
          handler: () => {
            this.selectedStatus = 'In Progress';
            this.filterTasks();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  filterTasks() {
    if (this.selectedStatus === 'all') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(task => task.statusName === this.selectedStatus);
    }
  }

}
