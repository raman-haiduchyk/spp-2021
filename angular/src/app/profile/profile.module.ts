import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { EditorComponent } from './components/editor/editor.component';
import { QuillModule } from 'ngx-quill';
import { modules } from './editor.options';

@NgModule({
  declarations: [
    ProfileComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    QuillModule.forRoot({
      format: 'html',
      modules: modules
    })
  ]
})
export class ProfileModule { }
