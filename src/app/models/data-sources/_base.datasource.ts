import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, from} from 'rxjs';
import {BaseModel} from '../_base.model';

export class BaseDataSource implements DataSource<BaseModel> {
  entitySubject = new BehaviorSubject<any[]>([]);
  hasItems = false; // Need to show message: 'No records found

  // Loading | Progress bar
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean>;

  // Paginator | Paginators count
  paginatorTotalSubject = new BehaviorSubject<number>(0);
  paginatorTotal$: Observable<number>;

  constructor() {
    this.loading$ = this.loadingSubject.asObservable();
    this.paginatorTotal$ = this.paginatorTotalSubject.asObservable();
    this.paginatorTotal$.subscribe(res => this.hasItems = res > 0);
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.entitySubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.entitySubject.complete();
    this.loadingSubject.complete();
    this.paginatorTotalSubject.complete();
  }

}
