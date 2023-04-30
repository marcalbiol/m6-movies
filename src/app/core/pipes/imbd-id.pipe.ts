import { Pipe, PipeTransform } from '@angular/core';
import {Observable, tap} from "rxjs";
import {RequestService} from "../services/request.service";

@Pipe({
  name: 'imbdID'
})
export class ImbdIDPipe implements PipeTransform {

  constructor(private requestService: RequestService) {
  }

  transform(value: unknown, ...args: unknown[]): Observable<number> {
    return this.requestService.findMovieInIMDB(Number(value))
  }

}
