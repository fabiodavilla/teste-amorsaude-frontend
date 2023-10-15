import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { formatCnpj } from 'src/app/functions/formatar-cnpj';
import { Location } from '@angular/common';
import { Store } from '@ngxs/store';
import { AuthState, ClearAuthState } from 'src/app/states/auth.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'razaoSocial',
    'nomeFantasia',
    'cnpj',
    'Ativa',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();
  dadosResolvidos: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();
  @ViewChild('filterInput') filterInput: any;

  private filterSubject = new Subject<string>();
  filter: string = '';

  actions = [
    { label: 'Visualizar', action: this.viewItem.bind(this) },
    { label: 'Editar', action: this.editItem.bind(this) },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private store: Store
  ) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.updateDataSource();

    this.filterSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((filtro) => {
        this.location.go(`/`, `?q=${filtro}`);
        this.updateDataSource(filtro);
      });

    const searchParam = this.route.snapshot.queryParamMap.get('q');

    if (searchParam) {
      this.filter = searchParam;
      this.updateDataSource(this.filter);
    } else {
      this.updateDataSource();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: Event) {
    const filteredValue = (filterValue.target as HTMLInputElement).value;

    this.filter = filteredValue;

    this.filterSubject.next(filteredValue);
  }

  updateDataSource(filtro: string = '') {
    this.dadosResolvidos = this.route.snapshot.data[0];

    if (filtro) {
      this.dadosResolvidos = this.dadosResolvidos.filter((item) => {
        return (
          item.razaoSocial.includes(filtro) ||
          item.nomeFantasia.includes(filtro) ||
          item.cnpj.includes(filtro)
        );
      });
    }

    this.dataSource.data = this.dadosResolvidos;
  }

  clearFilter(inputElement: HTMLInputElement) {
    inputElement.value = '';
    this.dataSource.filter = '';
    this.dataSource.sort = this.sort;
    this.filter = '';
    this.filterSubject.next('');
  }

  viewItem(item: any) {
    this.router.navigate([`/visualizacao/${item.id}`]);
  }

  editItem(item: any) {
    this.router.navigate(['/manutencao/editar', item.id]);
  }

  newItem() {
    this.router.navigate(['/manutencao/nova']);
  }

  format(text: string) {
    return formatCnpj(text);
  }

  logoff() {
    this.store.dispatch(new ClearAuthState());
    this.router.navigate(['/auth/login']);
  }
}
