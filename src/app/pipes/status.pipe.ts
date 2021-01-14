import { Pipe, PipeTransform } from '@angular/core';
import { Issue } from '../services/interfaces';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(issues: Issue[], status=''): any {
    return issues.filter(issue => {
      return issue.status == status;
    });
  }

}
