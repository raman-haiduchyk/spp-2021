import { AfterViewInit, Component } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss']
})
export class FilterBlockComponent implements AfterViewInit {

  public dateArrowChar: string = null;
  public scoreArrowChar: string = null;
  public viewsArrowChar: string = null;

  public filterWordInputSub: Subscription;

  constructor(private filterService: FilterService) { }

  public ngAfterViewInit(): void {

    this.filterWordInputSub = fromEvent(document.getElementById('filter-word-input'), 'input')
    .pipe(
      map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
      debounceTime(500),
      distinctUntilChanged())
    .subscribe(inputValue => {
      this.filterService.changeWordFilter(inputValue);
    });
  }

  public changeDateFilterState(): void {
    this.filterService.changeDateFilter();
    this.scoreArrowChar = null;
    this.viewsArrowChar = null;

    this.filterService.dateFilter
    ? this.dateArrowChar = '🠅'
    : this.dateArrowChar = '🠇';
  }

  public changeScoreFilterState(): void {
    this.filterService.changeScoreFilter();
    this.dateArrowChar = null;
    this.viewsArrowChar = null;

    this.filterService.scoreFilter
    ? this.scoreArrowChar = '🠅'
    : this.scoreArrowChar = '🠇';
  }

  public changeViewsFilterState(): void {
    this.filterService.changeViewsFilter();
    this.dateArrowChar = null;
    this.scoreArrowChar = null;

    this.filterService.viewsFilter
    ? this.viewsArrowChar = '🠅'
    : this.viewsArrowChar = '🠇';
  }

  public changeTagsFilterState(tags: string[]): void {
    this.filterService.changeTagsFilter([...tags]);
  }

}
