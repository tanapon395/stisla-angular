import { FormGroup } from '@angular/forms';

export interface ILoginComponent {
    form: FormGroup;
    Url: any;
    onSubmit();
}

export interface ILogin {
    email: string;
    password: string;
    remember: boolean;
}
