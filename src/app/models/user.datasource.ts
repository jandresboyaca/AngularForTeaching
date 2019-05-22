import {of} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {QueryParamsModel} from './data-sources/query-params.model';
import {BaseDataSource} from './data-sources/_base.datasource';
import {QueryResultsModel} from './data-sources/query-results.model';
import {UserManagementService} from '../services/user-management.service';

export class UserDataSource extends BaseDataSource {
  constructor(private userService: UserManagementService) {
    super();
  }

  loadDataSource(queryParams: QueryParamsModel) {
    this.loadingSubject.next(true);
    this.userService.findUsers(queryParams).pipe(
      tap(res => {
        this.entitySubject.next(res.data);
        this.paginatorTotalSubject.next(res.meta.total);
      }),
      catchError(err => of(new QueryResultsModel([], err))),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe();
  }
}
