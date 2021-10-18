import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BlobContainerRequest } from '../types/azure-storage';

@Injectable({
  providedIn: 'root'
})
export class SasGeneratorService {
  constructor(private http: HttpClient) {}

  getSasToken(): Observable<BlobContainerRequest> {
    return this.http.get<BlobContainerRequest>(`${environment.sasGeneratorUrl}/api/GetImageBlockBlobsSAS`);
  }
}

