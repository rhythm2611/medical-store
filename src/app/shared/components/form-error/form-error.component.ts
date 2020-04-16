import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'server-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css']
})
export class FormErrorComponent implements OnInit {

  @Input('errors') errors : any
  @Input('fieldName') fieldName : string
  
  constructor() { }

  ngOnInit() {
  }

}
