import { Component } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import { Model } from "../../model/repository.model";
import { User } from "../../model/entities/user.model";
import { AuthService } from "../../auth/auth.service";

@Component({
    moduleId: module.id.toString(),
    selector: 'sign-up',
    templateUrl: 'sign-up.component.html',
    styleUrls: ['sign-up.component.scss']
})
export class SignUpComponent {

    form: FormGroup;

    user: User = new User();
    

    constructor(
        private formBuilder: FormBuilder,
        private model: Model,
        private auth: AuthService
    ) {}

    ngOnInit()  {
        this.form = this.formBuilder.group({
            "username": ["", Validators.required],
            "firstname": ["", Validators.required],
            "lastname": ["", Validators.required],
            "streetaddress": ["", ],
            "password": ["", Validators.required]
        });
    }

    submitForm() {
        if (this.form.valid) {
            this.model.signUpUser(this.user).subscribe(() => {
                this.auth.login(this.user.Email, this.user.Password);
            })
        }
    }

}
