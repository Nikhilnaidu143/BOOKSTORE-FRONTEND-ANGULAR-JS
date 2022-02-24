import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  /** Posting data into database. */
  postCall(user: User): Observable<User> {
    return this.httpClient.post<User>(`http://localhost:8081/user/add`, user, { responseType: "json" });
  }

  /** Loging */
  loginCall(email: string, password: string) {
    return this.httpClient.get(`http://localhost:8081/user/login/${email}/${password}`);
  }

  /** Forget password. */
  forgetPassword(token:string , newPassword:string) {
    return this.httpClient.get(`http://localhost:8081/user/resetPassword/${token}/${newPassword}`);
  }

  /** Decode token */
  decodeToken(token:string) {
    return this.httpClient.get(`http://localhost:8081/user/decode/${token}`);
  }

  /** Read by id */
  readById(id:number , token: string) {
    return this.httpClient.get(`http://localhost:8081/user/read/${id}/${token}`);
  }

}
