import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { requiredFileTypes } from '../../shared/mime-type.validator';
import { fileSizeValidator } from '../../shared/fileSize.validator';
import { AccountData, IUser } from '../user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-account-edit',
    templateUrl: './account-edit.component.html',
    styleUrls: ['./account-edit.component.css'],
})
export class AccountEditComponent implements OnInit, OnDestroy {
    form: FormGroup;
    imagePreview: string;
    editMode: boolean = false;
    private authListener: Subscription;
    accountData: AccountData;
    errMsg: string | null;

    constructor(
        private accountService: AccountService,
        private router: Router
    ) {}

    ngOnInit() {
        // Create subscription to authentication
        this.authListener = this.accountService.authStatus.subscribe(
            (state: boolean) => {
                this.editMode = state;
                this.accountData = this.accountService.getAccountData();
            }
        );

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
        });

        // Patch values if editing
        if (this.editMode) {
            this.imagePreview = this.accountData.profileImagePath;

            this.form.patchValue({ ownerName: this.accountData.ownerName });
            this.form.patchValue({
                businessName: this.accountData.businessName,
            });
            this.form.patchValue({ email: this.accountData.email });
            this.form.removeControl('password');
        }
    }

    ngOnDestroy(): void {
        this.authListener.unsubscribe();
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

        // Create form data
        const user = this.form.value;
        const formData = new FormData();

        // Add optional image upload
        if (user.profileImage) {
            formData.append(
                'profileImage',
                user.profileImage,
                user.profileImage.name
            );
        }

        // Add business info
        formData.append('ownerName', user.ownerName);
        formData.append('businessName', user.businessName);
        formData.append('email', user.email);
        formData.append('password', user.password);

        // We are either signing up or updating our account
        if (!this.editMode) {
            this.accountService
                .createUser(formData, user.email, user.password)
                .subscribe({
                    next: () => {},
                    error: (err: Error) => {
                        this.errMsg = err.message;
                    },
                });
        } else if (this.editMode) {
            this.accountService
                .updateUser(formData, this.accountData.userId)
                .subscribe({
                    next: () => {
                        this.router.navigate(['/account']);
                    },
                    error: (err: Error) => {
                        this.errMsg = err.message;
                    },
                });
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
}
