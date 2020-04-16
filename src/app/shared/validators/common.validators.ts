import { AbstractControl, ValidationErrors, NG_VALIDATORS, Validator, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { Subscription } from 'rxjs';

export class CustomValidators {

    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null { // interface ValidatorFn 
        let REGEXP = /^\S*$/
        if(!REGEXP.test(control.value)){
            return { cantBeSpace : true } // ValidationErrors type
        }
        return null;
    }

    static validEmail(control: AbstractControl) : ValidationErrors | null { // interface ValidatorFn 
        let REGEXP = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        if(!REGEXP.test(control.value)){
            return { validEmail : true } // ValidationErrors type
        }
        return null;
    }

    static alphaNumeric(control: AbstractControl) : ValidationErrors | null { // interface ValidatorFn 
        let REGEXP = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
        if(!REGEXP.test(control.value)){
            return { alphaNumeric : true } // ValidationErrors type
        }
        return null;
    }

    static isEmailExists(control:AbstractControl) : Promise<ValidationErrors | null> { // interface AsyncValidatorFn 
        //Promise(executor: (resolve: (value?: ValidationErrors | PromiseLike<ValidationErrors>) => void, reject: (reason?: any) => void) => void): Promise<ValidationErrors>
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                if(control.value == 'abhijit14375@gmail.com'){
                    resolve({ isEmailExists : true })
                }else{
                    resolve(null)
                }
            },2000)
        })
    }

    static isMatched(controlNameToComapre : string){

        return (control :AbstractControl) : ValidationErrors | null => {
        
            let password = control.root.get(controlNameToComapre);
            let confPassword = control.value;
            if(password){
                const subscription : Subscription =  password.valueChanges.subscribe( () => {
                    control.updateValueAndValidity();
                    subscription.unsubscribe();
                })
                let passVal = password.value
                if(passVal !== confPassword){
                    return { isMatched : true }
                }
            }
            
            return null;
        }
    }
    
}

@Directive({
    selector: '[cannotContainSpace]',
    providers: [{provide: NG_VALIDATORS, useValue: CustomValidators.cannotContainSpace, multi: true}]
})

export class CannotSpaceDirective implements Validator{
    validate(control: AbstractControl): ValidationErrors | null { // interface Validator
        return CustomValidators.cannotContainSpace(control);
    }
} 

@Directive({
    selector: '[validEmail]',
    providers: [{provide: NG_VALIDATORS, useExisting: ValidEmailDirective, multi: true}]
})

export class ValidEmailDirective implements Validator{
    validate(control: AbstractControl): ValidationErrors | null { // interface Validator
        return CustomValidators.validEmail(control);
    }
} 

@Directive({
    selector: '[isEmailExists]',
    providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: CheckEmailDirective, multi: true}]
})

export class CheckEmailDirective implements Validator{

    validate(control: AbstractControl): ValidationErrors | null { // interface Validator
        return CustomValidators.isEmailExists(control);
    }
} 

@Directive({
    selector: '[isMatched]',
    providers: [{provide: NG_VALIDATORS, useExisting: CompareDirective, multi: true}]
})

export class CompareDirective implements Validator{
    @Input('isMatched') controlNameToComapre : string
    validate(control: AbstractControl): ValidationErrors | null { // interface Validator
        return CustomValidators.isMatched(this.controlNameToComapre)(control);
    }
} 

@Directive({
    selector: '[alphaNumeric]',
    providers: [{provide: NG_VALIDATORS, useExisting: AlphaNumericDirective, multi: true}]
})

export class AlphaNumericDirective implements Validator{
    validate(control: AbstractControl): ValidationErrors | null { // interface Validator
        return CustomValidators.alphaNumeric(control);
    }
} 