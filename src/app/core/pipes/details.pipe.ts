import { Pipe, PipeTransform } from '@angular/core';
import {RequestService} from "../services/request.service";
import {Observable, tap} from "rxjs";

@Pipe({
  name: 'details'
})
export class DetailsPipe implements PipeTransform {

  constructor(private requestService: RequestService) {
  }
  transform(value: unknown, ...args: unknown[]): Observable<any> {
    return this.requestService.getCreditsMovie(Number(value))
  }

}
