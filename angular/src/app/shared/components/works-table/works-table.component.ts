import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Funfic } from 'src/app/core/models/funfic.model';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-works-table',
  templateUrl: './works-table.component.html',
  styleUrls: ['./works-table.component.scss']
})
export class WorksTableComponent implements OnInit, AfterViewInit, OnChanges {

  private isInitialized: boolean = false;

  public funfics: MatTableDataSource<Funfic>;
  public displayedColumns: string[] = ['name', 'genre', 'chaptersCount', 'rating', 'createdAt', 'scoreCount', 'read', 'edit', 'delete'];

  @ViewChild(MatPaginator)public paginator: MatPaginator;
  @ViewChild(MatSort)public sort: MatSort;

  @Output() public delete: EventEmitter<number> = new EventEmitter<number>();

  @Input() public sourceFunfics: Funfic[] = [];

  constructor(private router: Router, private dialog: MatDialog) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.isInitialized) {
      this.funfics.data = this.sourceFunfics;
    }
  }

  public ngOnInit(): void {
      this.funfics = new MatTableDataSource(this.sourceFunfics);
      this.isInitialized = true;
  }

  public ngAfterViewInit(): void {
      this.funfics.paginator = this.paginator;
      this.funfics.sort = this.sort;
  }

  public applyFilter(event: Event): void {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.funfics.filter = filterValue.trim().toLowerCase();

    if (this.funfics.paginator) {
      this.funfics.paginator.firstPage();
    }
  }

  public editFunfic(id: number): void {
    this.router.navigate(['profile', 'editor', id]);
  }

  public readFunfic(id: number): void {
    this.router.navigate(['main', id]);
  }

  public deleteFunfic(id: number, name: string): void {
    // tslint:disable-next-line: typedef
    const dialogRef = this.dialog.open(DeleteDialogComponent, {data: name});

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.delete.emit(id);
        }
      }
    );
  }

}
