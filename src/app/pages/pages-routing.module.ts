import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListaResolver } from '../resolvers/lista.resolver';
import { ManutencaoComponent } from './manutencao/manutencao.component';
import { ManutencaoResolver } from '../resolvers/manutencao.resolver';
import { VisualizacaoComponent } from './visualizacao/visualizacao.component';
import { VisualizacaoResolver } from '../resolvers/Visualizacao.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: [ListaResolver],
  },
  {
    path: 'manutencao/nova',
    resolve: [ManutencaoResolver],
    component: ManutencaoComponent,
  },
  {
    path: 'manutencao/editar/:id',
    resolve: [ManutencaoResolver],
    component: ManutencaoComponent,
  },
  {
    path: 'visualizacao/:id',
    resolve: [VisualizacaoResolver],
    component: VisualizacaoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ListaResolver, ManutencaoResolver, VisualizacaoResolver],
})
export class PagesRoutingModule {}
