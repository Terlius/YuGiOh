import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card!: Card;

  constructor(private router: Router) { }
  ngOnInit(): void {

  }

  goDetail(){

      this.router.navigate(['/detail', this.card.id]);
      //this.router.navigate([`/detail/${this.card.id}`]);
  }

}
