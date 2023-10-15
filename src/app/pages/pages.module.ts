import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ManutencaoComponent } from './manutencao/manutencao.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CoreModule } from '../core.module';
import { VisualizacaoComponent } from './visualizacao/visualizacao.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
import { MoreInformationDialogComponent } from '../components/more-information-dialog/more-information-dialog.component';
import { CnpjMaskDirective } from '../directives/cnpj-mask.directive';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    ManutencaoComponent,
    VisualizacaoComponent,
    ConfirmDialogComponent,
    ErrorDialogComponent,
    MoreInformationDialogComponent,
    CnpjMaskDirective,
  ],
  imports: [
    CoreModule,
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
  ],
  providers: [],
})
export class PagesModule {}
