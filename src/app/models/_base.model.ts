export class BaseModel {
  // Edit
  _isEditMode: boolean = false;
  _isNew: boolean = false;
  _isUpdated: boolean = false;
  _isDeleted: boolean = false;
  _prevState: any = null;
  // Filter
  _defaultFieldName: string = '';
  // Log
  _userId: number = 0; // Admin
  _createdDate: string;
  _updatedDate: string;
}
