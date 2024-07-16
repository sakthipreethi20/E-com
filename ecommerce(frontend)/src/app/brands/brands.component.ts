import { Component } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  brands = [
    { name: 'Fossil', imageUrl: 'https://dev1-cdn.helioswatchstore.com/Fossil.jpg' },
    { name: 'Titan', imageUrl: 'https://dev1-cdn.helioswatchstore.com/23TITAN_1.jpg' },
    { name: 'Casio', imageUrl: 'https://dev1-cdn.helioswatchstore.com/Casio.jpg' },
    { name: 'Timex', imageUrl: 'https://www.justwatches.com/cdn/shop/files/TIMEX_593f9d9e-3ed2-4385-b56a-4eb6945db4e6.jpg?v=1697523834&width=360' },
    
  ];
}
