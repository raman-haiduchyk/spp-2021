import { Pipe, PipeTransform } from '@angular/core';
import { Funfic } from 'src/app/core/models/funfic.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  public transform(
    items: Funfic[],
    dateFilter: boolean,
    scoreFilter: boolean,
    viewsFilter: boolean,
    wordFilter: string
    ): Funfic[] {

    if (items != null) {
      if (dateFilter != null) {
        items.sort((a, b) => {
          let dateA: number = (new Date(a.createdAt)).getTime();
          let dateB: number = (new Date(b.createdAt)).getTime();
          return dateFilter ? dateB - dateA : dateA - dateB;
        });

      } else if (viewsFilter != null) {
        items.sort((a, b) => {
          let viewCountA: number = a.scoreCount;
          let viewCountB: number = b.scoreCount;
          return viewsFilter ? viewCountA - viewCountB : viewCountB - viewCountA;
        });

      } else if (scoreFilter != null) {
        items.sort((a, b) => {
          let rateA: number = a.rating;
          let rateB: number = b.rating;
          return scoreFilter ? rateA - rateB : rateB - rateA;
        });
      }

      if (wordFilter) {
        items = items.filter(
          item => {
            const genre: boolean = item.genre ? item.genre.toLowerCase().includes(wordFilter.toLowerCase()) : false;
            const descr: boolean = item.shortDescription ? item.shortDescription.toLowerCase().includes(wordFilter.toLowerCase()) : false;
            return item.name.toLowerCase().includes(wordFilter.toLowerCase()) || genre || descr;
          });
      }
    }
    return items;
  }
}
