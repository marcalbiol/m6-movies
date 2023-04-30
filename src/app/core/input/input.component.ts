import {AfterViewInit, Component} from '@angular/core';
import {RequestService} from "../services/request.service";
import {ViewEntity} from "../interface/entity/viewEntity";
import {first, mergeMap, Subject, take} from "rxjs";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements AfterViewInit {
  vista = new Subject<ViewEntity[]>();
  constructor(private requestService: RequestService) {
  }

  ngAfterViewInit(): void {
    const search = document.getElementById('search') as HTMLInputElement
    const options = document.getElementById('options') as HTMLDataListElement
    const button = document.getElementById('button')

    if (search !== null && options !== null) {

      let palabra = '';
      search.addEventListener('input', (event: Event) => {
        options.style.display = 'block'
        palabra = (event.target as HTMLInputElement).value;
        this.requestService.getMovies(palabra).subscribe(value => {
          const movieList = value.map(x => `<div class="options movie-option"
            style="cursor: pointer; margin-bottom: 5px;"
            title="${x.title}"
            onmouseover="this.style.backgroundColor='#b5e2ff'; this.style.color='#333';"
            onmouseout="this.style.backgroundColor='white'; this.style.color='black';">
            ${x.title}</div>`);
          options.innerHTML = movieList.join('');
        })
      });


      const divs = document.querySelectorAll('#options');
      divs.forEach(div => {
        div.addEventListener('click', (ev) => {
          const value = ev.target as HTMLDivElement
          const title = value.getAttribute('title')
          this.requestService.getOneMovie(title).pipe(
            mergeMap(value => this.requestService.findMovieInIMDB(value[0].id).pipe(
              take(1), first(),
            ))
          ).subscribe(value => {
            const url = `https://www.imdb.com/title/${value}/`
            window.open(url, '_blank')
          })
        });
      });

      if (button != null) {
        button.addEventListener('click', () => {
          options.style.display = 'none';
          this.requestService.getMovies(palabra).subscribe(value => {
            this.vista.next(value)
          })
        })
      }

    }
  }
}
