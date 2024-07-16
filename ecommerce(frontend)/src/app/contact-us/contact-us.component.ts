import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

  constructor(private snackBar: MatSnackBar) {}

  sendMessage() {
    this.snackBar.open('Message sent successfully!', 'Close', {
      duration: 3000 
    });
  }

}
