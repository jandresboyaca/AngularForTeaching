import {Injectable} from '@angular/core';
import {HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UtilsService {
  constructor() {
  }

  /**
   * Build url parameters key and value pairs from array or object
   * @param obj
   */
  urlParam(obj: any): string {
    return Object.keys(obj)
      .map(k => k + '=' + encodeURIComponent(obj[k]))
      .join('&');
  }

  /**
   * Simple object check.
   * @param item
   * @returns {boolean}
   */
  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  /**
   * Deep merge two objects.
   * @param target
   * @param ...sources
   * @see https://stackoverflow.com/a/34749873/1316921
   */
  mergeDeep(target, ...sources) {
    if (!sources.length) {
      return target;
    }
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, {[key]: {}});
          }
          this.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, {[key]: source[key]});
        }
      }
    }

    return this.mergeDeep(target, ...sources);
  }

  getPath(obj, val, path?) {
    path = path || '';
    let fullpath = '';
    for (const b in obj) {
      if (obj[b] === val) {
        return path + '/' + b;
      } else if (typeof obj[b] === 'object') {
        fullpath =
          this.getPath(obj[b], val, path + '/' + b) || fullpath;
      }
    }
    return fullpath;
  }

  getFindHTTPParams(queryParams): HttpParams {
    const params = new HttpParams()
      .set('lastNamefilter', queryParams.filter)
      .set('sortOrder', queryParams.sortOrder)
      .set('sortField', queryParams.sortField)
      .set('pageNumber', queryParams.pageNumber.toString())
      .set('pageSize', queryParams.pageSize.toString());

    return params;
  }

  getHTTPHeader() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  padNumber(value: number) {
    if (this.isNumber(value)) {
      return `0${value}`.slice(-2);
    } else {
      return '';
    }
  }

  isNumber(value: any): boolean {
    return !isNaN(this.toInteger(value));
  }

  toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }

  dateFormat(date: Date): string {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    if (date) {
      return `${month}/${day}/${year}`;
    }

    return '';
  }

  dateCustomFormat(date: any): string {
    let stringDate: string = '';
    if (date) {
      stringDate += this.isNumber(date.month) ? this.padNumber(date.month) + '/' : '';
      stringDate += this.isNumber(date.day) ? this.padNumber(date.day) + '/' : '';

      stringDate += date.year;
    }
    return stringDate;
  }

  getDateFormatterFromString(dateInStr: string): any {
    if (dateInStr && dateInStr.length > 0) {
      const dateParts = dateInStr.trim().split('/');
      return [
        {
          year: this.toInteger(dateParts[2]),
          month: this.toInteger(dateParts[0]),
          day: this.toInteger(dateParts[1])
        }
      ];
    }

    const _date = new Date();
    return [
      {
        year: _date.getFullYear(),
        month: _date.getMonth() + 1,
        day: _date.getDay()
      }
    ];
  }

  getDateFromString(dateInStr: string = ''): Date {
    if (dateInStr && dateInStr.length > 0) {
      const dateParts = dateInStr.trim().split('/');
      const year = this.toInteger(dateParts[2]);
      const month = this.toInteger(dateParts[0]);
      const day = this.toInteger(dateParts[1]);
      // tslint:disable-next-line:prefer-const
      let result = new Date();
      result.setDate(day);
      result.setMonth(month - 1);
      result.setFullYear(year);
      return result;
    }

    return new Date();
  }


  getDateStringFromDate(_date: Date = new Date()): string {
    const month = _date.getMonth() + 1;
    const year = _date.getFullYear();
    const date = _date.getDate();
    return `${month}/${date}/${year}`;
  }
}


export function isInteger(value: any): value is number {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}


export function isString(value: any): value is string {
  return typeof value === 'string';
}
