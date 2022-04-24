import { FormGroup } from "@angular/forms";

export class ValidatedForm {
    form!: FormGroup;

    public validateControl = (controlName: string) => {
        return this.form.controls[controlName].invalid && this.form.controls[controlName].touched
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.form.controls[controlName].hasError(errorName)
    }
}
