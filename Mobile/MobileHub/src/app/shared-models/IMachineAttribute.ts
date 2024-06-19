export interface IMachineAttribute {
    attributeId: number;
    specName: string;
    description?: string;
    typeId?: number;
    dataType?: string;
    isEventAttribute?: boolean;
    isCommon?: boolean;
    unitType?:string;
    createdOn?: Date;
    dataColId?:number; 
  }
  
