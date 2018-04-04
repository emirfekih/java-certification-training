import { AbstractControl, ValidationErrors } from "@angular/forms";
import { SignUpComponent } from "./sign-up.component";

export class UsernameValidators{
    
    static cannotContainSpaces(control: AbstractControl): ValidationErrors | null {
        if((control.value as String ).indexOf(' ') >= 0)
            return {cannotContainSpaces: true }
        return null;
    }


}