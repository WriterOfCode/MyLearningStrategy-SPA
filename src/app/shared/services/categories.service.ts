import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.mslBaseApiUrl}/api/Categories`);
  }
  getCategory(Id: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.mslBaseApiUrl}/api/Categories/${Id}`);
  }
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${environment.mslBaseApiUrl}/api/Categories`, category );
  }
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${environment.mslBaseApiUrl}/api/Categories`, category);
  }
  deleteCategory(Id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.mslBaseApiUrl}/api/Categories/${Id}`);
  }
}
