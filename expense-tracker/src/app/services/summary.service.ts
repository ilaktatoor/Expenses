import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeeklySummary } from '../models/weekly-summary.model';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  private apiUrl = `${environment.apiUrl}/expenses/week/summary`;
  constructor(private http: HttpClient) { }

  getWeeklySummary(): Observable<WeeklySummary>{
    return this.http.get<WeeklySummary>(this.apiUrl);
  }
}
