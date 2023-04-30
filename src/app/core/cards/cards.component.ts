import {Component, Input} from '@angular/core';
import {ViewEntity} from "../interface/entity/viewEntity";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input() cardsData!: Observable<ViewEntity[]>

}
