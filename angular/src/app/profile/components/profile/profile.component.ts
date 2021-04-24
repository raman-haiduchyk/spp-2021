import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Funfic } from 'src/app/core/models/funfic.model';
import { RequestService } from 'src/app/core/services/request.service';
import { CreateDialogComponent } from '../../../shared/components/create-dialog/create-dialog.component';
import { Profile } from '../../models/profile.model';
import { ProfileService } from '../../../core/services/profile.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile: Profile;
  public funfics: Funfic[] = null;

  public isChangeDisabled: boolean = false;

  constructor(
    private requestService: RequestService,
    private profileService: ProfileService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.profileService.getProfile('profile').subscribe(
      profileRes => {
        this.profile = profileRes;
        this.requestService.getFunficResponse('profile/my').subscribe( funficRes =>
          this.funfics = funficRes
        );
      },
      err => {
        this.dialog.open(ErrorDialogComponent);
      }
    );
  }

  public openEditor(): void {
    // tslint:disable-next-line: typedef
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.isChangeDisabled = true;
          this.requestService.createFunficResponse('edit', result).subscribe(
            res => {
              this.isChangeDisabled = false;
              this.router.navigate(['profile', 'editor', res.id]);
            },
            err => {
              this.isChangeDisabled = false;
              this.dialog.open(ErrorDialogComponent);
            }
          );
        }
      }
    );
  }

  public onDelete($event: number): void {
    this.requestService.deleteFunfic('edit', $event).subscribe(
      res => {
        const index: number = this.funfics.findIndex(funfic => funfic.id === $event);
        if (index !== -1) {
          this.funfics.splice(index, 1);
          this.funfics = [...this.funfics];
        }
      },
      err => this.dialog.open(ErrorDialogComponent)
    );
  }

  public onProfileChanges(): void {
    this.isChangeDisabled = true;
    this.profileService.setProfile('profile', this.profile).subscribe(
      res => {
        this.isChangeDisabled = false;
      },
      err => {
        console.log(err);
        this.dialog.open(ErrorDialogComponent);
        this.isChangeDisabled = false;
      }
    );
  }

}
