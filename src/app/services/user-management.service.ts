import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpUtilsService} from '../utils/http-utils.service';
import {UserModel} from '../models/users.model';
import {QueryParamsModel} from '../models/data-sources/query-params.model';
import {QueryResultsModel} from '../models/data-sources/query-results.model';
import {UtilsService} from '../utils/utils.service';

const API_USERS_URL = environment.API.API_URL + environment.API.API_USERS_URL;

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient,
              private httpUtils: HttpUtilsService,
              private utilsService: UtilsService) {
  }

  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(API_USERS_URL, user, this.httpUtils.getHTTPHeader());
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(API_USERS_URL);
  }

  getUserById(userId: number): Observable<UserModel> {
    return this.http.get<UserModel>(API_USERS_URL + `/${userId}`);
  }

  loadUsers(queryParams: QueryParamsModel): any {
    this.findUsers(queryParams).pipe(
      map(data => {
        return data.data;
      }),
      catchError(err => of(new QueryResultsModel([], err))),
    ).subscribe();
  }

  // READ
  findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    return this.http.get<QueryResultsModel>(API_USERS_URL + '?' + this.utilsService.urlParam(queryParams));
  }

  updateUser(user: UserModel): Observable<any> {
    return this.http.put(API_USERS_URL + '/' + user.id, user, this.httpUtils.getHTTPHeader());
  }

  deleteUser(userId: number): Observable<UserModel> {
    return this.http.delete<UserModel>(API_USERS_URL + `/${userId}`);
  }

}
