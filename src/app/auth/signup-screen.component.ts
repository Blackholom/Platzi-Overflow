import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from './user.model';

@Component({
    selector: 'app-signup-screen',
    templateUrl: './signup-screen.component.html'
})

export class SignupScreenComponent implements OnInit {
    signupForm: FormGroup;

    ngOnInit() {
        this.signupForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            lastname: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            ]),
            password: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        if (this.signupForm.valid) {
            const { name, lastname, email, password } = this.signupForm.value;
            const user = new User(name, lastname, email, password);
            console.log(user);
        }
    }
}
