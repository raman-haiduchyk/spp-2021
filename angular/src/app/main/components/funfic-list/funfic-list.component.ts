import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Funfic } from 'src/app/core/models/funfic.model';
import { RequestService } from 'src/app/core/services/request.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-funfic-list',
  templateUrl: './funfic-list.component.html',
  styleUrls: ['./funfic-list.component.scss']
})
export class FunficListComponent implements OnInit {

  public funfics: Funfic[];

  public dateFilterState: boolean = null;
  public scoreFilterState: boolean = null;
  public wordFilterState: string = null;
  public viewsFilterState: boolean = null;

  public pageIndex: number = 0;
  public pageSize: number = 5;
  public mode: string;
  public opened: boolean;

  constructor(private filterService: FilterService, private requestService: RequestService, private dialog: MatDialog) {
    filterService.onFilterChange.subscribe((filters) => {
      this.dateFilterState = filters[0];
      this.scoreFilterState = filters[1];
      this.wordFilterState = filters[2];
      this.viewsFilterState = filters[3];
      this.pageIndex = 0;
    });
   }

  private checkInnerWidth(): void {
    if (window.innerWidth > 599) {
      this.mode = 'side';
      this.opened = true;
    } else {
      this.mode = 'over';
      this.opened = false;
    }
  }

  public ngOnInit(): void {
    this.checkInnerWidth();

    window.onresize = () => {
      this.checkInnerWidth();
    };

    this.requestService.getFunficResponse('funfic').subscribe(
      res => this.funfics = res,
      err => this.dialog.open(ErrorDialogComponent)
    );
  }

  public onPage($event: PageEvent): void {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
  }
}
