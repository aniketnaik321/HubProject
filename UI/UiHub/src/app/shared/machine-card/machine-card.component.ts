import { Component, Input } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { IMachineCard } from 'src/app/core/shared-models/IMachineCard';

@Component({
  selector: 'app-machine-card',
  templateUrl: './machine-card.component.html',
  styleUrls: ['./machine-card.component.scss']
})
export class MachineCardComponent {

  @Input()
  MachineList?: IMachineCard[]=[]

  items: MenuItem[] | undefined;
  constructor(private messageService: MessageService) {}
    
  ngOnInit() {
      this.items = [
          {
              label: 'Options',
              items: [
                  {
                      label: 'Edit',
                      icon: 'pi pi-pencil text-primary',
                      command: () => {
                          this.update();
                      }
                  },
                  {
                      label: 'Delete',
                      icon: 'pi pi-trash text-danger',
                      command: () => {
                          this.delete();
                      }
                  }
              ]
          },
          {
              label: 'Widget setting',
              items: [
                {
                  label: 'Attributes setup',
                  icon: 'pi pi-cog text-primary',
                  command: () => {
                      this.delete();
                  }
              }
              ]
          }
      ];
  }

  update() {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
      this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
  }


  GetStatusText(statusId:number):string{
    let result='IN-ACTIVE';
    switch(statusId){
    case 0:
    result='IN-ACTIVE';
    break;
    case 1:
        result="ACTIVE"
    break;
    default:
        result='IN-ACTIVE';
    break;

    }
    return result;
  }
  
}
