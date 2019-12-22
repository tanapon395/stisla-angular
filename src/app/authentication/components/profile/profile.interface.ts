import { FormGroup } from '@angular/forms';

export interface IProfileComponent {
    positionItems: any[];
    form: FormGroup;
    onSubmit(): void;
    onConvertImage(inputFile: HTMLInputElement): void;

}

export interface IProfile {
    firstname: string,
    lastname: string,
    position: string,
    image: string
}