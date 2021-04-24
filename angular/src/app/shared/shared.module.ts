import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule}  from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRippleModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { WorksTableComponent } from './components/works-table/works-table.component';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';
@NgModule({
  declarations: [
    DeleteDialogComponent,
    ErrorDialogComponent,
    CreateDialogComponent,
    WorksTableComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatRippleModule,
    MatSortModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatListModule,
    MatRippleModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    MatChipsModule, DragDropModule,
    MatTooltipModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DeleteDialogComponent,
    ErrorDialogComponent,
    CreateDialogComponent,
    WorksTableComponent
  ]
})
export class SharedModule { }
