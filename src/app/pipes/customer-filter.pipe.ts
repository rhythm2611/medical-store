import { Pipe, PipeTransform } from '@angular/core';
import { CustomerPayload } from '../interfaces/user-payload.interface';

@Pipe({
  name: 'customerFilter'
})
export class CustomerFilterPipe implements PipeTransform {

  transform(customers : CustomerPayload[], searchTerm : string): CustomerPayload[] {
    if(!customers || !searchTerm){
        return customers
    }
    return customers.filter(customer => customer.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
  }

}
