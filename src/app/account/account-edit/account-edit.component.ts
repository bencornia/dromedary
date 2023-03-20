import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { mimeType } from '../../shared/mime-type.validator';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css'],
})
export class AccountEditComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    // Create reactive form template
    this.form = new FormGroup({
      profileImage: new FormControl(null, { asyncValidators: [mimeType] }),
      ownerName: new FormControl(null, { validators: [Validators.required] }),
      businessName: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.pattern('')],
      }),
      apiKey: new FormControl(null),
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ profileImage: file });
    this.profileImage.updateValueAndValidity();

    const reader = new FileReader();

    const fileValue = new Promise((resolve, reject) => {
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  }

  // Getters for form input validators
  get profileImage() {
    return this.form.get('profileImage');
  }
  get ownerName() {
    return this.form.get('ownerName');
  }
  get businessName() {
    return this.form.get('businessName');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get apiKey() {
    return this.form.get('apiKey');
  }

  onSaveAccount() {}
}
