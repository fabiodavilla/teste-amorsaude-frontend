import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialidade } from '../entities/especialidade';
import { MatDialog } from '@angular/material/dialog';
import { MoreInformationDialogComponent } from 'src/app/components/more-information-dialog/more-information-dialog.component';
import { formatCnpj } from 'src/app/functions/formatar-cnpj';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizacaoComponent implements OnInit {
  razaoSocial: string = '';
  nomeFantasia: string = '';
  cnpj: string = '';
  dataInauguracao: string = '';
  ativo: string = '';
  regional: string = '';
  especialidades: string[] = [''];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const data = this.route.snapshot.data[0];
    const inaugurationDate = new Date(data.dataInauguracao);

    this.razaoSocial = data.razaoSocial;
    this.nomeFantasia = data.nomeFantasia;
    this.cnpj = formatCnpj(data.cnpj);
    this.dataInauguracao = `${inaugurationDate.getDate()}/${
      inaugurationDate.getMonth() + 1
    }/${inaugurationDate.getFullYear()}`;
    this.ativo = data.Ativa ? 'Sim' : 'Não';
    this.regional = data.regional.label;
    this.especialidades = data.especialidades.map(
      (especialidade: Especialidade) => especialidade.nome
    );
  }

  goBack() {
    this.router.navigate(['/']);
  }

  showMore() {
    const dialogRef = this.dialog.open(MoreInformationDialogComponent, {
      width: '300px',
      data: { message: this.especialidades },
    });
  }
}
