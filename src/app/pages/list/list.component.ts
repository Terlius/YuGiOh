import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Card } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';
import { debounceTime, isEmpty, map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  search: FormControl = new FormControl('');
  cards: Card[] = [];
  offset: number = 0;

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.getCards();

    this.search.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe(name => {
     
      this.offset = 0;
      this.cards = [];
      this.getCards();

    });

  }

  onScroll() {
    console.log("scrolled!!");
    this.offset += 100;
    this.getCards();
  }

  getCards() {
    const name = this.search.value; // Obtén el valor de búsqueda desde el input
    const offset = this.offset; // Obtén el valor de offset, asegúrate de tenerlo definido
  
    this.cardService.getCards(name, offset).pipe(
      isEmpty()
    ).subscribe({
      next: (isEmpty) => {
        if (isEmpty) {
          console.log('El observable está vacío (EMPTY)');
        } else {
          console.log('El observable NO está vacío');
          this.cardService.getCards(name, offset).subscribe({
            next: (resp: Card[]) => {
              console.log(name);
              console.log(resp);
              this.cards = [...this.cards, ...resp];
              // También puedes usar: this.cards.push(...resp);
            },
            error: (error) => {
              console.error('Error fetching cards:', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error fetching cards:', error);
      }
    });
  }

  searchCards(name: string) {


  }

}
