import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {
  private expenseService = inject(ExpenseService);
  private userService = inject(UserService);

  users: User[] = [];

  expense: Expense = {
    description: '',
    amount: 0,
    category: '',
    date: '',
    userId: 0
  };

  constructor() {
    this.userService.getAll().subscribe(users => this.users = users);
  }

  submit() {
    this.expenseService.create(this.expense).subscribe(() => {
      this.expense = { description: '', amount: 0, category: '', date: '', userId: 0 };
    });
  }
}
