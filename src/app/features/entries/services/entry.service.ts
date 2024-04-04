import { ICreateEntryRequest, IEntry } from '../interfaces/entry.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class EntryService {
  url = `${environment.server}/entries`;
  //url = 'http://localhost:7789/entries';
  constructor(private readonly httpClient: HttpClient) {}

  getAllEntries(): Observable<IEntry[]> {
    // return this.httpClient.get<IEntry[]>(
    //   'https://jsonblob.com/api/jsonBlob/1066378677755068416'
    // );
    return this.httpClient.get<IEntry[]>(this.url);
  }

  getEntryById(id: string): Observable<IEntry> {
    // return this.httpClient.get<IEntry>(
    //   'https://jsonblob.com/api/jsonBlob/1066378677755068416'
    // );
    return this.httpClient.get<IEntry>(`${this.url}/${id}`);
  }

  saveEntry(entry: ICreateEntryRequest): Observable<IEntry> {
    return this.httpClient.post<IEntry>(this.url, entry);
  }

  updateEntry(entry: IEntry): Observable<IEntry> {
    return this.httpClient.patch<IEntry>(this.url, entry);
  }

  getEntriesByFilter(filterTerm: string): Observable<IEntry[]> {
    const params = new HttpParams().set('searchTerm', filterTerm);
    return this.httpClient.get<IEntry[]>(`${this.url}`, { params: params });
  }

  getTrashedEntries(): Observable<IEntry[]> {
    return this.httpClient.get<IEntry[]>(`${this.url}/trash`);
  }

  trashEntry(entry: IEntry): Observable<IEntry> {
    return this.httpClient.put<IEntry>(`${this.url}/trash`, entry);
  }

  deleteEntry(id: string): Observable<IEntry> {
    return this.httpClient.delete<IEntry>(`${this.url}/${id}/delete`);
  }

  restoreEntry(entry: IEntry): Observable<IEntry> {
    return this.httpClient.put<IEntry>(`${this.url}/restore`, entry);
  }
}
