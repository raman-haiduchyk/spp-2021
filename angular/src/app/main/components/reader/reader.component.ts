import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClickEvent, RatingChangeEvent } from 'angular-star-rating';
import { Subscription } from 'rxjs';
import { Funfic } from 'src/app/core/models/funfic.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { RequestService } from 'src/app/core/services/request.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-detailed-info',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {
  public itemSub: Subscription;

  public funfic: Funfic;
  public currentChapter: number = 0;
  public rating: number = 0;

  public mode: string;
  public opened: boolean;

  public isOwner: boolean;
  public isAuthorized: boolean;
  public isRatingUpdating: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

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

    this.route.params.subscribe(
      params => {

        this.requestService.getFunficByIdGraphqlResponse(params.id).subscribe(
          res => {
            if (res.data.funfics && res.data.funfics.length > 0) {
              this.funfic = {...res.data.funfics[0]};
              this.funfic.chapters = [...this.funfic.chapters];
              console.log(this.funfic);
              if (this.funfic.chapters.length) {
                this.funfic.chapters.sort((a, b) => {
                  return a.number - b.number;
                });
              }
              this.isAuthorized = this.authService.isUserAuthenticated() || this.authService.isUserPotentialAuthenticated();
              this.isOwner = this.authService.isBelongToUser(this.funfic.author);
              if (this.isAuthorized) {
                this.requestService.getRatingResponse('profile/rating', this.funfic.id).subscribe(
                  rateRes => {
                    this.rating = rateRes.rating;
                  },
                  err => console.log(err)
                );
              }
            }
          },
          err => this.dialog.open(ErrorDialogComponent)
        );
      }
    );

    this.checkInnerWidth();

    window.onresize = () => {
      this.checkInnerWidth();
    };
  }

  public setChapter(index: number): void {
    this.currentChapter = index;
  }

  public onRatingChange($event: ClickEvent): void {
    if ($event.rating !== this.rating) {
      this.isRatingUpdating = true;

      this.requestService.setRatingResponse('edit/rating', this.funfic.id, $event.rating).subscribe(
        res => {
          this.isRatingUpdating = false;
          this.rating = $event.rating;
          this.funfic.rating = res.rating;
        },
        err => {
          this.isRatingUpdating = false;
          this.dialog.open(ErrorDialogComponent);
        }
      );
    }
  }

  public editFunfic(id: string): void {
    this.router.navigate(['profile', 'editor', id]);
  }

}
