import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PagesService } from '../pages/pages.service';

@Injectable()
export class ListaResolver implements Resolve<any> {
  constructor(private pagesService: PagesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.pagesService.getList();
  }
}
