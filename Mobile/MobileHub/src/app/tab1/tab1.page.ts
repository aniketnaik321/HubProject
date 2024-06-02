import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  salesItems = [
    {
      name: 'Full Color LaserJet Pro',
      id: '1-1235-02',
      price: '$789.00',
      image: 'assets/img/laserjet.jpg',
    },
    {
      name: 'Macbook Air',
      id: '1-1235-03',
      price: '$78.00',
      image: 'assets/img/macbook.jpg',
    },
    {
      name: 'White Solo 2 Wireless',
      id: '1-1235-04',
      price: '$878.00',
      image: 'assets/img/solo2.jpg',
    },
    {
      name: 'Tablet Red EliteBook',
      id: '1-1235-05',
      price: '$789.00',
      image: 'assets/img/tablet.jpg',
    },
    {
      name: 'Ultrabook',
      id: '1-1235-06',
      price: '$8459.00',
      image: 'assets/img/ultrabook.jpg',
    },
  ];

  constructor() {}

  ngOnInit() {}

  segmentChanged(event: any) {
    console.log('Segment changed', event.detail.value);
    // Handle segment change logic here
  }

}
