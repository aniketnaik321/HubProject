export interface IMachineCard{
    machineId: number;
    name: string;
    description: string;
    category: string;
    createdOn: Date;
    workingStatus:number;
    readingsCount?:number;
  }