import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  name: string = '';

  constructor(private userService: UserService) {}

 addUser() {
  if (this.name.trim()) {
    this.userService.create({ name: this.name }).subscribe(() => {
      this.name = '';
      Swal.fire({
        icon: 'success',
        title: 'User added!',
        showConfirmButton: false,
        timer: 1500
      });
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was an error adding the user.'
      });
    });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Name required',
      text: 'Please enter a name before adding a user.'
    });
  }
}
}
