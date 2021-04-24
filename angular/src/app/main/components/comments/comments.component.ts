import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserComment } from 'src/app/core/models/comment.model';
import { RequestService } from 'src/app/core/services/request.service';
import { noWhitespaceValidator } from 'src/app/core/validators/whitespase.validator';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() public funficId: number;

  public comments: UserComment[];

  public commentCtrl: FormControl = new FormControl('', [Validators.required, noWhitespaceValidator]);

  @Input() public isAuthorized: boolean;

  constructor(private requestService: RequestService, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.requestService.getCommentsResponse('comments', this.funficId).subscribe(
      res => {
        this.comments = res;
        console.log(res);
      }
    );
  }

  public sendComment(): void {
    this.requestService.createCommentResponse('edit/comments', this.funficId, this.commentCtrl.value).subscribe(
      res => {
        this.commentCtrl.setValue('');
        this.comments.push(res);
      },
      err => this.dialog.open(ErrorDialogComponent)
    );
  }

}
