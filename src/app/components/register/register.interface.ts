import { FormGroup } from '@angular/forms';

export interface IRegisterComponent {
    form: FormGroup;
    Url: any;
    onSubmit();
}

export interface IRegister {
    id: number;
    firstname: string;
    lastname: string;
    email: string ;
    password: string;
    confirmPassword: string;
}
