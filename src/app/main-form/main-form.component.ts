import {UserModel} from '../models/users.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, Inject, OnInit, Optional} from '@angular/core';
import {UserManagementService} from '../services/user-management.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit {
  Form: FormGroup;
  user: UserModel;
  bEdit: boolean = false;

  constructor(public dialogRef: MatDialogRef<MainFormComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserManagementService,
              private fb: FormBuilder) {
    this.user = this.data.user;
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.Form = this.fb.group({
      userName: [this.user.userName, [Validators.required]],
      userPhone: [this.user.userPhone, [
        Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      userEmail: [this.user.userEmail, [Validators.required, Validators.email]],
      userStartDate: [this.user.userStartDate, [Validators.required]],
      userEndDate: [this.user.userEndDate, [Validators.required]]
    });
    if (this.user.id > 0) {
      this.bEdit = true;
    }
  }


  onSubmit() {
    const controls = this.Form.controls;
    /** check form */
    if (this.Form.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    const editedUser = this.prepareUser();
    if (editedUser.id > 0) {
      this.updateUser(editedUser);
    } else {
      this.createUser(editedUser);
    }
  }

  prepareUser(): UserModel {
    const controls = this.Form.controls;
    // tslint:disable-next-line:variable-name
    const _user = new UserModel();
    Object.keys(controls).forEach(controlName =>
      _user[controlName] = controls[controlName].value
    );
    _user.id = this.user.id;
    return _user;
  }

  updateUser(user: UserModel) {
    this.userService.updateUser(user).subscribe(res => {
      this.closeDialog(user);
    });
  }

  createUser(user: UserModel) {
    this.userService.createUser(user).subscribe(res => {
      this.closeDialog(res);
    });
  }


  closeDialog(item: UserModel) {
    this.dialogRef.close({
      isUpdated: true,
      User: item,
    });
  }
}
