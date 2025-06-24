import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Expense } from '../models/expense.model';
import { environment } from '../../enviroments/enviroment';
import { WeeklySummary } from '../models/weekly-summary.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = `${environment.apiUrl}/expenses`;

  private refreshNeeded = new Subject<void>();
  refreshNeeded$ = this.refreshNeeded.asObservable();

  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  expenses$ = this.expensesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadExpenses(); // initial load
  }

  getExpenses(): Observable<Expense[]> {
    return this.expenses$;
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense).pipe(
      tap(() => {
        this.loadExpenses();
        this.refreshNeeded.next();
      })
    );
  }

  loadExpenses() {
    this.http.get<Expense[]>(this.apiUrl).subscribe(expenses => {
      this.expensesSubject.next(expenses);
    });
  }
  getAll(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  getThisWeek(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/week`)
  }


  create(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense).pipe(
      tap(() => {
        this.loadExpenses();
        this.refreshNeeded.next();
      })
    );
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadExpenses())
    );
  }
  markWeekAsEven(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/week/mark-even`, {});
  }

  getSummary(): Observable<WeeklySummary> {
    return this.http.get<WeeklySummary>(`${this.apiUrl}/week/summary`);
  }

  getWeeklyTotals(): Observable<{ weekLabel: string; total: number }[]> {
  return this.http.get<{ weekLabel: string; total: number }[]>(`${this.apiUrl}/summary/weeks`);
}

getUserExpenses(period: string): Observable<{ userName: string; total: number }[]> {
  return this.http.get<{ userName: string; total: number }[]>(`${this.apiUrl}/summary/users?period=${period}`);
}

getCategoryExpenses(period: string): Observable<{ category: string; total: number }[]> {
  return this.http.get<{ category: string; total: number }[]>(`${this.apiUrl}/summary/categories?period=${period}`);
}

}
