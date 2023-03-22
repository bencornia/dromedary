import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { requiredFileTypes } from '../../shared/mime-type.validator';
import { fileSizeValidator } from '../../shared/fileSize.validator';
import { IUser, AuthResponse } from '../user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-account-edit',
    templateUrl: './account-edit.component.html',
    styleUrls: ['./account-edit.component.css'],
})
export class AccountEditComponent implements OnInit {
    form: FormGroup;
    imagePreview: string;
    mode: string = 'signup';

    constructor(
        private accountService: AccountService,
        private router: Router
    ) {}

    ngOnInit() {
        // Create reactive form template
        this.form = new FormGroup({
            profileImage: new FormControl(null, {
                validators: [
                    requiredFileTypes(['jpg', 'jpeg', 'png']),
                    fileSizeValidator,
                ],
            }),
            ownerName: new FormControl(null, {
                validators: [Validators.required],
            }),
            businessName: new FormControl(null, {
                validators: [Validators.required],
            }),
            email: new FormControl(null, {
                validators: [Validators.required, Validators.email],
            }),
            password: new FormControl(null, {
                validators: [
                    Validators.required,
                    Validators.pattern(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/m
                    ),
                ],
            }),
            apiKey: new FormControl(null),
        });
    }

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({ profileImage: file });
        this.form.get('profileImage').updateValueAndValidity();

        const reader = new FileReader();

        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    onSaveAccount() {
        // Don't allow invalid form to be submitted
        if (!this.form.valid) {
            return;
        }

        const userData: IUser = this.form.value;

        // We are either signing up or updating our account
        if (this.mode === 'signup') {
            this.accountService.createUser(userData);
        } else if (this.mode === 'edit') {
            this.accountService.updateUser(userData);
        }

        this.form.reset();
    }

    get imageErrorMessage() {
        let errors = this.profileImage.errors;
        let msg_string = '';

        if (!errors) {
            return msg_string;
        }

        for (let err in errors) {
            msg_string += errors[err] + ' ';
        }

        return msg_string;
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
}
