import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Card } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id!: string;
  //card!: Card;
  card$!: Observable<Card>;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private card_service: CardService
  ) { }
  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.card$ = this.card_service.getCardById(this.id);

    
    /** 
    this.card_service.getCardById(this.id).subscribe(
      (card: Card) => {
        this.card = card;
        console.log(this.card);
      }
    );
  */
  }

  back(){
    console.log('back');
    this.router.navigate(['']);
  }



}
