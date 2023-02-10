import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Api {
  protected originalPath: string = '';
  private _header: HttpHeaders = new HttpHeaders({ responseType: 'JSON' });

  constructor(protected readonly httpClient: HttpClient) {}

  /**
   *
   * @param path
   * @param params
   * @param headers
   * @returns
   */
  get<T>(
    path: string,
    params: HttpParams = new HttpParams(),
    headers: HttpHeaders = new HttpHeaders()
  ): Observable<T> {
    return this.httpClient.get<T>(path, {
      params,
      headers,
      withCredentials: true,
    });
  }

  /**
   * Gets http request service
   * @param url
   * @param [header]
   * @returns get
   */
  public getI(url: string, header?: object): Observable<Object> {
    header = header ?? this._header;
    return this.httpClient.get(url, header);
  }
}
