import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: any;
  @Output() addProductClick = new EventEmitter<any>();

 getImgUrl(url: string): string {
     return environment.baseUrl + '/' + url;
    }

  onAddProduct(): void {
    this.addProductClick.emit(this.product);
  }
}
