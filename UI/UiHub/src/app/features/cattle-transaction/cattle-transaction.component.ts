import { Component } from '@angular/core';

@Component({
  selector: 'app-cattle-transaction',
  templateUrl: './cattle-transaction.component.html',
  styleUrl: './cattle-transaction.component.scss'
})
export class CattleTransactionComponent {
  transactions: any[] = [];

  
  // Dialog properties
  displayDialog: boolean = false;
  selectedTransactionType: string = '';
  transactionDate: Date | null = null;
  transactionValue: number | null = null;
  constructor() { }

  ngOnInit(): void {
    // Sample transaction data
    this.transactions = [
      {
        title: 'Milk Production - Cow 101',
        date: new Date('2024-10-11'),
        description: 'Recorded 20 liters of milk production.',
        amount: 20,
        unit: 'liters'
      },
      {
        title: 'Dairy Product Sale',
        date: new Date('2024-10-10'),
        description: 'Sold 50 liters of milk.',
        amount: 50,
        unit: 'liters'
      },
      {
        title: 'Health Record - Cow 102',
        date: new Date('2024-10-09'),
        description: 'Administered antibiotics for fever.',
        amount: 1,
        unit: 'dose'
      }
    ];
  }

 // Handlers for Add buttons
 addMilkProduction() {
  this.selectedTransactionType = 'Milk Production';
  this.displayDialog = true;
}

addDairySale() {
  this.selectedTransactionType = 'Dairy Sale';
  this.displayDialog = true;
}

addHealthRecord() {
  this.selectedTransactionType = 'Health Record';
  this.displayDialog = true;
}


 // Save transaction
 saveTransaction() {
  const newTransaction = {
    title: `${this.selectedTransactionType} - ${this.transactionDate?.toLocaleDateString()}`,
    date: this.transactionDate,
    description: `Recorded ${this.transactionValue} ${this.selectedTransactionType.includes('Milk') ? 'liters' : 'doses'}`,
    amount: this.transactionValue,
    unit: this.selectedTransactionType.includes('Milk') ? 'liters' : 'doses'
  };

  this.transactions.push(newTransaction);
  this.resetForm();
}

// Reset form
resetForm() {
  this.displayDialog = false;
  this.transactionDate = null;
  this.transactionValue = null;
}

}
