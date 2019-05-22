import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {UserModel} from '../models/users.model';
import {MainFormComponent} from '../main-form/main-form.component';
import {UserDataSource} from '../models/user.datasource';
import {QueryParamsModel} from '../models/data-sources/query-params.model';
import {UserManagementService} from '../services/user-management.service';
import {SelectionModel} from '@angular/cdk/collections';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})
export class MainTableComponent implements OnInit {
  @Input() specsListState: any;
  dataSource: UserDataSource;
  userResult: UserModel[] = [];
  selection = new SelectionModel<UserModel>(true, []);
  displayedColumns = ['id', 'userName', 'userPhone', 'userEmail', 'userStartDate', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // Filter fields
  @ViewChild('searchInput') searchInput: ElementRef;
  filterColumn = '';
  @ViewChild('searchDateStart') searchDateStart: ElementRef;
  @ViewChild('searchDateEnd') searchDateEnd: ElementRef;
   API_USERS_URL = environment.API.API_URL + environment.API.API_USERS_URL;
  constructor(public dialog: MatDialog,
              private userService: UserManagementService) {
  }

  ngOnInit() {
    const queryParams = new QueryParamsModel(this.filterConfiguration(false));
    this.dataSource = new UserDataSource(this.userService);
    // First load
    this.dataSource.loadDataSource(queryParams);
    this.dataSource.entitySubject.subscribe(res => (this.userResult = res));
  }


  add() {
    const newObj = new UserModel();
    const dialogRef = this.dialog.open(MainFormComponent, {
      data: {
        user: newObj,
        isNew: true,
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.isUpdated) {
        this.loadList();
        alert('Accion de creacion realizada exitosamente, SE PUEDE USAR UN MEJOR COMPONENTE EN ESTA ALERTA');
      }
    });
  }

  loadList() {
    this.selection.clear();
    const queryParams = new QueryParamsModel(
      this.filterConfiguration(true),
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    this.dataSource.loadDataSource(queryParams);
    this.selection.clear();
  }


  export() {

  }

  filterConfiguration(isGeneralSearch: boolean = true): any {
    const filter: any = {};
    const searchText: string = this.searchInput.nativeElement.value;
    filter.filterColumn = '*';
    filter.filterValue = searchText;
    if (!isGeneralSearch) {
      return filter;
    }
    if (this.filterColumn && this.filterColumn.length > 0) {
      filter.filterColumn = this.filterColumn;
    }
    return filter;
  }

  delete(_item: UserModel) {
    const r = confirm('Eliminar? Componente mejorable');
    if (r == true) {
      this.userService.deleteUser(_item.id).subscribe(() => {
        alert('Accion de actualizacion realizada exitosamente, SE PUEDE USAR UN MEJOR COMPONENTE EN ESTA ALERTA');
        this.loadList();
      });
    }
  }

  edit(obj: UserModel) {
    const dialogRef = this.dialog.open(MainFormComponent, {
      data: {
        user: obj,
        isNew: false
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.isUpdated) {
        this.loadList();
        alert('Accion de actualizacion realizada exitosamente, SE PUEDE USAR UN MEJOR COMPONENTE EN ESTA ALERTA');
      }
    });
  }
}
