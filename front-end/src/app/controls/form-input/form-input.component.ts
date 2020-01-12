import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html'
})
export class FormInputComponent implements OnInit {

  @Input() readonly: boolean;
  @Input() formControl: any;
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() type: string = '';
  @Input() maxlength: number = 32767;
  @Input() placeholder: string;
  data: string;
  @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() get ngModel() {
    return this.data;
  }
  set ngModel(value) {
    this.data = value;
    this.ngModelChange.emit(this.data);
  }

  // validations
  @Input() emailValidation: boolean = false;
  @Input() requiredValidation: boolean = false;
  @Input() customValidation: boolean = false;
  @Input() customValidationMessage: string = '';
  constructor() { }

  ngOnInit() {}

}
