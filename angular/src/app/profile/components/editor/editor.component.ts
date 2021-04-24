import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funfic } from 'src/app/core/models/funfic.model';
import { RequestService } from 'src/app/core/services/request.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public funfic: Funfic;
  public mode: string;
  public opened: boolean;
  public currentChapterNumber: number = null;
  public isLoading: boolean = false;

  constructor(
    private requestService: RequestService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  private checkInnerWidth(): void {
    if (window.innerWidth > 599) {
      this.mode = 'side';
      this.opened = true;
    } else {
      this.mode = 'over';
      this.opened = false;
    }
  }

  private changeChaptersNumbers(): void {
    if (this.funfic && this.funfic.chapters) {
      this.funfic.chapters.map((chap, index) => {
        chap.number = index;
      });
    }
  }

  public ngOnInit(): void {

    this.checkInnerWidth();

    window.onresize = () => {
      this.checkInnerWidth();
    };

    this.route.params.subscribe(
      params => {
        this.requestService.getFunficByIdResponse('funfic', params.id).subscribe(
          funficRes => {
            this.funfic = funficRes;
            if (this.funfic.chapters.length) {
              this.funfic.chapters.sort((a, b) => {
                return a.number - b.number;
              });
              this.currentChapterNumber = 0;
            }

            if (!this.authService.isBelongToUser(funficRes.author)) {
              // tslint:disable-next-line: typedef
              const dialogRef = this.dialog.open(ErrorDialogComponent);
              dialogRef.afterClosed().subscribe(_ => this.router.navigate(['profile']));
            }
          },
          err => this.dialog.open(ErrorDialogComponent)
        );
      }
    );
  }

  public checkFormControlsInvalid(): boolean {
    if (this.funfic && this.funfic.chapters) {
      return this.funfic.name.trim() === '' ||
              this.funfic.chapters.some(chapter => chapter.name.trim() === '');
    }
    return true;
  }

  public drop($event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.funfic.chapters, $event.previousIndex, $event.currentIndex);
    if (this.currentChapterNumber === $event.previousIndex) {
      this.currentChapterNumber = $event.currentIndex;
    } else if (this.currentChapterNumber > $event.previousIndex && this.currentChapterNumber <= $event.currentIndex) {
      this.currentChapterNumber--;
    } else if (this.currentChapterNumber < $event.previousIndex && this.currentChapterNumber >= $event.currentIndex) {
      this.currentChapterNumber++;
    }
  }

  public addChapter(): void {
    if (this.funfic && this.funfic.chapters) {
      this.funfic.chapters.push({
        id: null,
        funficId: this.funfic.id,
        text: '',
        number: this.funfic.chapters.length,
        name: '',
      });
    }
  }

  public changeChapter(index: number): void {
    this.currentChapterNumber = index;
  }

  public deleteCahpter(index: number): void {
    this.funfic.chapters.splice(index, 1);
  }

  public saveChanges(): void {
    this.isLoading = true;
    this.changeChaptersNumbers();
    this.requestService.changeFunfic('edit', this.funfic).subscribe(
      res => {
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
        this.dialog.open(ErrorDialogComponent);
      }
    );
  }

}
