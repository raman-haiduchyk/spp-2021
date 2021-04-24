import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';

import { FunficListComponent } from './components/funfic-list/funfic-list.component';
import { FunficCardComponent } from './components/funfic-card/funfic-card.component';
import { FilterBlockComponent } from './components/filter-block/filter-block.component';

import { FilterPipe } from './pipes/filter.pipe';

import { FilterService } from './services/filter.service';
import { ReaderComponent } from './components/reader/reader.component';
import { ChapterComponent } from './components/chapter/chapter.component';
import { StarRatingModule } from 'angular-star-rating';
import { CommentsComponent } from './components/comments/comments.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    FunficListComponent,
    FunficCardComponent,
    FilterBlockComponent,
    FilterPipe,
    ReaderComponent,
    ChapterComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    QuillModule.forRoot({
      format: 'html'
    }),
    StarRatingModule.forRoot(),
  ],
  providers: [
    FilterService,
  ]
})
export class MainModule { }
