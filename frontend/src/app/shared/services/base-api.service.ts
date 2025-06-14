import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BaseApiService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:8080';

  public get<T>(url: string, params: Record<string, any>) {
    return this.httpClient.get<T>(`${this.baseUrl}${url}`, { params, responseType: 'json' });
  }
}
