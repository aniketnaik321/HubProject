import { Component } from '@angular/core';

@Component({
  selector: 'app-cattle-details',
  templateUrl: './cattle-details.component.html',
  styleUrl: './cattle-details.component.scss'
})
export class CattleDetailsComponent {
  cattleDetails!: any[];
  cattleHealthRecords!: any[];
  breedingDetails!: any[];
  milkProductionRecords!: any[];
  selectedCattle!:any;

  constructor() { }

  ngOnInit(): void {



this.selectedCattle= { 
  id: 2, 
  name: 'Daisy', 
  breed: 'Jersey', 
  age: 5, 
  healthStatus: 'Sick',
  healthRecord: { condition: 'Fever', treatment: 'Antibiotics', vet: 'Dr. Jones', date: '12/12/2012' },
  breedingRecord: { dateBred: '12/12/2012', expectedCalving: '12/12/2012', sire: 'Bull Y' },
  milkProduction: { milkProduced: 20, productionDate: '12/12/2012' }
};

    // Sample data for Cattle Details
    this.cattleDetails = [
      { id: 1, name: 'Bessie', breed: 'Holstein', age: 4, healthStatus: 'Healthy' },
      { id: 2, name: 'Daisy', breed: 'Jersey', age: 5, healthStatus: 'Sick' },
      { id: 3, name: 'Bella', breed: 'Guernsey', age: 3, healthStatus: 'Healthy' }
    ];

    // Sample data for Cattle Health Records
    this.cattleHealthRecords = [
      { id: 1, date: '2024-09-10', condition: 'Fever', treatment: 'Antibiotics', vet: 'Dr. Smith' },
      { id: 2, date: '2024-09-12', condition: 'Mastitis', treatment: 'Medication', vet: 'Dr. Jones' }
    ];

    // Sample data for Breeding Details
    this.breedingDetails = [
      { id: 1, dateBred: '2024-05-01', expectedCalving: '2024-12-01', sire: 'Bull X' },
      { id: 2, dateBred: '2024-06-15', expectedCalving: '2025-02-15', sire: 'Bull Y' }
    ];

    // Sample data for Milk Production Records
    this.milkProductionRecords = [
      { id: 1, date: '2024-10-01', milkProduced: 22 },
      { id: 2, date: '2024-10-02', milkProduced: 20 },
      { id: 3, date: '2024-10-03', milkProduced: 21 }
    ];
  }
}
