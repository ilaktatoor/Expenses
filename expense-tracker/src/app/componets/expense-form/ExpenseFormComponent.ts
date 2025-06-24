import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Expense } from "../../models/expense.model";
import { User } from "../../models/user.model";
import { ExpenseService } from "../../services/expense.service";
import { UserService } from "../../services/user.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {

  users: User[] = [];
  selectedUserId: number = 0;
  expense: Expense = {
    description: '',
    amount: 0,
    category: '',
    date: '',
    userId: 0
  };

  constructor(private expenseService: ExpenseService, private userService: UserService) {
    this.userService.getAll().subscribe(users => this.users = users);
  }

  submit() {
    this.expense.userId = this.selectedUserId;
    this.expenseService.create(this.expense).subscribe({
      next: () => {
        this.expense = { description: '', amount: 0, category: '', date: '', userId: 0 };
        Swal.fire({
          icon: 'success',
          title: 'Expense added!',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while adding the expense.'
        });
      }
    });
  }
}

