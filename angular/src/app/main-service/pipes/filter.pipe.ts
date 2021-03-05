import { Pipe, PipeTransform } from '@angular/core';
import { Job } from 'src/app/core/models/job.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  public transform(items: Job[], dateFilter: boolean, salaryFilter: boolean, wordFilter: string): Job[] {
    if (items != null) {

      if (dateFilter != null) {
        items.sort((a, b) => {
          let dateA: number = (new Date(a.createdAt)).getTime();
          let dateB: number = (new Date(b.createdAt)).getTime();
          return dateFilter ? dateB - dateA : dateA - dateB;
        });

      } else if (salaryFilter != null) {
        items.sort((a, b) => {
          let viewCountA: number = Number(a.salary);
          let viewCountB: number = Number(b.salary);
          return salaryFilter ? viewCountA - viewCountB : viewCountB - viewCountA;
        });
      }

      if (wordFilter != null) {
        return items.filter((item) => item.name.toLowerCase().includes(wordFilter.toLowerCase())
        || item.company.name.toLowerCase().includes(wordFilter.toLowerCase()));
      }
    }
    return items;
  }
}
