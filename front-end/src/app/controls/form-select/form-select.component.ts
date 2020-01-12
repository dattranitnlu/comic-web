import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ListItem } from 'src/app/models/list-item';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html'
})
export class FormSelectComponent implements OnInit {

  @Input() formControl: any;
  @Input() label: string = '';
  @Input() id: string = '';
  data: string;
  @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() get ngModel() {
    return this.data;
  }
  set ngModel(value) {
    this.data = value;
    this.ngModelChange.emit(this.data);
  }
  @Input() items: ListItem[] = [];
  // validations
  @Input() requiredValidation: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
