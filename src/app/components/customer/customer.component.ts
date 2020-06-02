import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { CustomerPayload } from 'src/app/interfaces/user-payload.interface';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers : CustomerPayload[] = []
  //page : number = 1
  //pageSize : number = 10
  startIndex : number = 0
  endIndex : number = 10
  searchTerm : string
  constructor(private commonService : CommonService) { }

  ngOnInit() {
    this.commonService.getCustomers().subscribe(
      response => {
        this.customers = response
      }
    )
  }

  getPageSize(size : number){
    return new Array(size/10)
  }

  updateIndex(pageIndex){
    this.startIndex = pageIndex * 10
    this.endIndex = this.startIndex + 10
  }

  prev(pageIndex){
    this.startIndex = pageIndex * 10
    this.endIndex = this.startIndex + 10
  }

  next(pageIndex){

  }

}
