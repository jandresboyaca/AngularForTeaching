export class QueryResultsModel {
  totalCount: number;
  items: any[];
  data: any[];
  links: {
    self: string;
    first: string;
    last: string;
    prev: string;
    next: string;
  };
  meta: {
    self: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };

  constructor(_items: any[] = [], _errorMessage: string = '') {
    this.data = _items;
    this.totalCount = _items.length;
  }
}
