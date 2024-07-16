import { Component } from '@angular/core';

export interface Store {
  address: string;
  name: string;
  type: string;
  location: string;
  image: string;
}

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent {
  stores: Store[] = [
    {
      name: 'Timetwirl',
      type: 'Watches',
      location: 'Chennai Central',
      address: '123 Time Boulevard, Suite 101',
      image:
        'https://cdn4.ethoswatches.com/the-watch-guide/wp-content/uploads/2017/12/New-Ethos-Watch-Boutique-Pune-brands-retail-2-1.jpg',
    },
    {
      name: 'Timetwirl',
      type: 'Watches',
      location: 'Tambaram',
      address: '456 Watch Way, Floor 2',
      image: 'https://ad.kapoorwatch.com/content/images/store/SouthEx2S.jpeg',
    },
    {
      name: 'Timetwirl',
      type: 'Watches',
      location: 'Velachery',
      address: '789 Time Square, Unit 3A',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpiTytHCM8m4FoVDQHRM3wuajqzenVY6oODPH3Od-OUA&s',
    },

    // Add more watch store mock data as needed
  ];
}
