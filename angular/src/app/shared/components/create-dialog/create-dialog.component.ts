import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { RequestService } from 'src/app/core/services/request.service';
import { noWhitespaceValidator } from 'src/app/core/validators/whitespase.validator';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  public nameCtrl: FormControl = new FormControl('', [Validators.required, noWhitespaceValidator]);

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private requestService: RequestService
    ) { }

  public ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onOkClick(): void {
    this.dialogRef.close(this.nameCtrl.value);
  }
}
