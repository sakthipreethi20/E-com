import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  gridItems = [
    {
      imageUrl: 'https://shop.timexindia.com/cdn/shop/files/fria-new-collection-resized_686x.jpg?v=1694597763',
      altText: 'Image 1',
      // overlayText: 'Overlay Text 1',
    },
    {
      imageUrl: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw901c16c3/images/homepage/All_Banners/NewArrivals_D.jpg',
      altText: 'Image 2',
      // overlayText: 'Overlay Text 2',
    },
    
    
  ];
}
 