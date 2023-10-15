import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Regional } from '../entities/regional';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagesService } from '../pages.service';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { Especialidade } from '../entities/especialidade';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { cnpjLengthAsyncValidator } from 'src/app/validators/cnpj-validator';
import { validateMinSelectionAsync } from 'src/app/validators/selection-validator';
import { formatCnpj } from 'src/app/functions/formatar-cnpj';

@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.component.html',
  styleUrls: ['./manutencao.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManutencaoComponent implements OnInit {
  regionais: Regional[] = [];
  especialidades: Especialidade[] = [];
  entidadeForm: FormGroup = new FormGroup({});
  isEdicao: boolean = false;
  isLoading = false;
  entidadeid: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private pagesService: PagesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.regionais = this.route.snapshot.data[0]['regionais'];
    this.especialidades = this.route.snapshot.data[0]['especialidades'];

    this.entidadeForm = this.formBuilder.group({
      razaoSocial: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      cnpj: ['', Validators.required, cnpjLengthAsyncValidator()],
      dataInauguracao: ['', Validators.required],
      Ativa: [true],
      regional: [null, Validators.required],
      especialidades: [[], Validators.required, validateMinSelectionAsync(5)],
    });

    this.route.paramMap.subscribe((params) => {
      const entidadeId = params.get('id');
      this.entidadeid = entidadeId || '';

      if (entidadeId) {
        this.pagesService.getEntidade(entidadeId).subscribe((entidade) => {
          this.entidadeForm.patchValue({
            razaoSocial: entidade.razaoSocial,
            nomeFantasia: entidade.nomeFantasia,
            cnpj: formatCnpj(entidade.cnpj),
            dataInauguracao: entidade.dataInauguracao,
            Ativa: entidade.Ativa,
            regional: entidade.regional.value,
            especialidades: entidade.especialidades.map(
              (especialidade: Especialidade) => {
                return especialidade.id;
              }
            ),
          });
        });

        this.isEdicao = true;
      }
    });
  }

  save() {
    if (this.entidadeForm.invalid) {
      return;
    }

    this.isLoading = true;

    const cnpjValue = this.entidadeForm.get('cnpj')?.value.replace(/\D/g, '');
    this.entidadeForm.get('cnpj')?.setValue(cnpjValue);

    this.isEdicao ? this.handleUpdate() : this.handleCreate();
  }

  // Function to handle the update operation
  handleUpdate() {
    this.openSnackBar();
    this.pagesService
      .update(this.entidadeid, this.entidadeForm.value)
      .pipe(
        tap(() => {
          this.openSnackBar();
          this.router.navigate(['/visualizacao/', this.entidadeid]);
        }),
        catchError((error) => throwError(error)),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  // Function to handle the create operation
  handleCreate() {
    this.pagesService
      .create(this.entidadeForm.value)
      .pipe(
        tap((data) => {
          this.openSnackBar();
          this.router.navigate(['/visualizacao/', data.id]);
        }),
        catchError((error) => {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '300px',
            data: {
              message: error.error.message.join(', '),
              status: error.status,
            },
          });
          return throwError(error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  deleteItem() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Deseja excluir este item?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pagesService.delete(this.entidadeid).subscribe(() => {
          this.snackBar.open('Entidade excluida com sucesso!', 'Fechar', {
            duration: 3000,
          });
          this.router.navigate(['/']);
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  openSnackBar() {
    const message = `${this.isEdicao ? 'Editado' : 'Cadastrado'} com sucesso!`;

    this.snackBar.open(message, 'Fechar', { duration: 3000 });
  }

  limitSizeCnpj(event: any) {
    const cnpjControl = this.entidadeForm.get('cnpj');

    if (cnpjControl) {
      let cnpj = cnpjControl.value.replace(/\D/g, '');
      cnpj = cnpj.slice(0, 14);

      if (cnpj.length >= 3) {
        cnpj = cnpj.substring(0, 2) + '.' + cnpj.substring(2);
      }
      if (cnpj.length >= 6) {
        cnpj = cnpj.substring(0, 6) + '.' + cnpj.substring(6);
      }
      if (cnpj.length >= 10) {
        cnpj = cnpj.substring(0, 10) + '/' + cnpj.substring(10);
      }
      if (cnpj.length >= 15) {
        cnpj = cnpj.substring(0, 15) + '-' + cnpj.substring(15);
      }
      cnpjControl.setValue(cnpj, { emitEvent: false });
    }
  }
}
