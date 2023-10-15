import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PagesService } from '../pages/pages.service';
import { forkJoin, map } from 'rxjs';

@Injectable()
export class ManutencaoResolver implements Resolve<any> {
  constructor(private pagesService: PagesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const regionais = this.pagesService.getRegionalList();
    const especialidades = this.pagesService.getEspecialidadeList();

    return forkJoin([regionais, especialidades]).pipe(
      map(([regionais, especialidades]) => ({ regionais, especialidades }))
    );
  }
}
