import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public dateFilter: boolean = null;
  public salaryFilter: boolean = null;
  public wordFilter: string = null;

  public onFilterChange: EventEmitter<[boolean, boolean, string]> = new EventEmitter();

  constructor() { }

  public resetFilters(): void {
    this.dateFilter = null;
    this.salaryFilter = null;
    this.wordFilter = null;
  }

  public changeDateFilter(): void {
    this.salaryFilter = null;

    this.dateFilter != null
      ? this.dateFilter = !this.dateFilter
      : this.dateFilter = true;
    this.onFilterChange.emit([this.dateFilter, this.salaryFilter, this.wordFilter]);
  }

  public changeSalaryFilter(): void {
    this.dateFilter = null;

    this.salaryFilter != null
      ? this.salaryFilter = !this.salaryFilter
      : this.salaryFilter = true;
    this.onFilterChange.emit([this.dateFilter, this.salaryFilter, this.wordFilter]);
  }

  public changeWordFilter(word: string): void {
    this.wordFilter = word;
    this.onFilterChange.emit([this.dateFilter, this.salaryFilter, this.wordFilter]);
  }
}
