export class QueryParamsModel {
  // fields
  filterColumn: any;
  filterValue: any;
  sortOrder: string; // asc || desc
  sortField: string;
  pageNumber: number;
  page: number;
  pageSize: number;

  constructor(_filter: any,
              _sortOrder: string = 'asc',
              _sortField: string = '',
              _pageNumber: number = 0,
              _pageSize: number = 10) {

    this.filterColumn = _filter.filterColumn;
    this.filterValue = _filter.filterValue;
    this.sortOrder = _sortOrder;
    this.sortField = _sortField;
    this.page = _pageNumber;
    this.pageSize = _pageSize;
  }
}
