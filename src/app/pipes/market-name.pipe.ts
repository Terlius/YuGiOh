import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marketName'
})
export class MarketNamePipe implements PipeTransform {

  marketNames = [
    { id: 'amazon_price', name: 'Amazon' },
    { id: 'cardmarket_price', name: 'Cardmarket' },
    { id: 'coolstuffinc_price', name: 'Coolstuffinc' },
    { id: 'ebay_price', name: 'Ebay' },
    { id: 'tcgplayer_price', name: 'Tcgplayer' }
  ]


  transform(value: string): string {
    return this.marketNames.find(market => market.id === value)?.name ?? '';
  }
}