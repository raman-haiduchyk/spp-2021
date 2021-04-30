import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { io, Socket } from 'socket.io-client';
import { UserComment } from 'src/app/core/models/comment.model';
import { RequestService } from 'src/app/core/services/request.service';
import { noWhitespaceValidator } from 'src/app/core/validators/whitespase.validator';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line: typedef
  private listener;

  private socket: Socket;

  @Input() public funficId: number;

  public comments: UserComment[];

  public commentCtrl: FormControl = new FormControl('', [Validators.required, noWhitespaceValidator]);

  @Input() public isAuthorized: boolean;

  constructor(private requestService: RequestService, private dialog: MatDialog) {
  }

  public ngOnDestroy(): void {
     this.socket.off('add', this.listener);
     this.socket.close();
  }

  public ngOnInit(): void {

    this.socket = io(environment.urlAddress , {
      path: '/getcomments'
    });

    this.socket.emit('listen', this.funficId);

    this.socket.once('get', (res) => {
      this.comments = res;
      console.log(res);
    });

    this.listener = (res) => {
      this.comments.push(res);
      console.log(res);
    };

    this.socket.on('add', this.listener);

  }

  public sendComment(): void {
    this.requestService.createCommentResponse('edit/comments', this.funficId, this.commentCtrl.value).subscribe(
      res => {
        this.commentCtrl.setValue('');
        this.socket.emit('new', res);
      },
      err => this.dialog.open(ErrorDialogComponent)
    );
  }

}
