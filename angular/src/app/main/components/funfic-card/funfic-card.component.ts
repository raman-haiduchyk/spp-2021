import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Funfic } from 'src/app/core/models/funfic.model';

@Component({
  selector: 'app-funfic-card',
  templateUrl: './funfic-card.component.html',
  styleUrls: ['./funfic-card.component.scss']
})
export class FunficCardComponent implements OnInit {

  @Input()public funficInfo: Funfic;
  @Input()public itemId: number;
  public date: Date;

  constructor(private router: Router) { }

  public ngOnInit(): void {
  }

  public showDetailedInfo(): void {
    this.router.navigate(['main', this.itemId]);
  }

}
