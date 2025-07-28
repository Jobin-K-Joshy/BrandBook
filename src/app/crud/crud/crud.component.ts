import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../crud.service';

declare var bootstrap: any;

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
})
export class CrudComponent {
  @ViewChild('statusModal') statusModalRef!: ElementRef;

  userForm!: FormGroup;
  users: any[] = [];
  editMode = false;
  selectedUserId: number | null = null;

  modalMessage: string = '';

  constructor(private fb: FormBuilder, private crud: CrudService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.loadUsers();
  }

  showSuccess(message: string) {
    this.modalMessage = message;
    const modal = new bootstrap.Modal(this.statusModalRef.nativeElement);
    modal.show();
  }

  loadUsers() {
    this.crud.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onSubmit() {
    if (this.editMode && this.selectedUserId !== null) {
      this.crud.updateUser(this.selectedUserId, this.userForm.value).subscribe(() => {
        this.loadUsers();
        this.showSuccess('User updated successfully!');
        this.resetForm();
      });
    } else {
      this.crud.addUser(this.userForm.value).subscribe(() => {
        this.loadUsers();
        this.showSuccess('User added successfully!');
        this.resetForm();
      });
    }
  }

  onEdit(user: any) {
    this.userForm.patchValue(user);
    this.editMode = true;
    this.selectedUserId = user.id;
  }

  onDelete(id: number) {
    this.crud.deleteUser(id).subscribe(() => {
      this.loadUsers();
      this.showSuccess('User deleted successfully!');
      this.resetForm();
    });
  }

  resetForm() {
    this.userForm.reset();
    this.editMode = false;
    this.selectedUserId = null;
  }

  trackByUser(index: number, user: any): number {
    return user.id;
  }

}
