/* eslint-disable no-irregular-whitespace */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.get(`${environment.baseURL}/api/Auth/Login?login=${username}&senha=${password}`);
  }

  getContacts() {
    return this.http.get(`${environment.baseURL}/api/Contatos/GetContatos`);
  }

  getContactsById(id: string) {
    return this.http.get(`${environment.baseURL}/api/Contatos/GetContatoById?idContato=${id}`);
  }

  deleteContact (id: string) {
    return this.http.delete(`${environment.baseURL}/api/Contatos/DeleteContato?idContato=${id}`);
  }

  updateContact (dataContact: any) {
    return this.http.put(`${environment.baseURL}/api/Contatos/UpdateContato`, dataContact);
  }

  createContact(contato: any) {
    return this.http.post(`${environment.baseURL}/api/Contatos/CreateContato`, contato);
  }
}