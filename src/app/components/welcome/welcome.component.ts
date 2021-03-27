import { Component, OnInit } from '@angular/core';
import { MercaserService } from '../../shared/mercaser.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private mercaserService: MercaserService) { }

  total: number = 0;
  pageActual: number = 1;
  amounts: Array<number> = [];
  items: Array<any> = [];
  sellers: Array<any> = [];
  value = '';
  numberFormat = new Intl.NumberFormat('es-ES');
  amountsFormatted: Array<any> = [];
  offset: number = 0;
  limit: number = 50;
  resto: number = 0;

  ngOnInit(): void {
  }

  getAll(offset: number, limit: number): void {
    console.log("la pagina: " + this.pageActual);
    this.amountsFormatted = [];
    this.amounts = [];
    this.value = this.value.replace(/\s+/g, "%20");
    this.mercaserService.getAll(this.value, offset, limit).subscribe(data => {
      this.total = data["paging"]["total"];
      this.items = data["results"];
      this.items.forEach(item => {
        this.amounts.push(item.price);
        this.mercaserService.getSeller(item["seller"]["id"]).subscribe(sel => {
          this.sellers.push(sel["nickname"]);
        });
      });
      this.amountsFormatted = this.amounts.map(this.numberFormat.format);
    });

  }

  updatePage(pageActual: any) {
    let pageAux = pageActual - 1;
    this.ngOnInit()
    this.pageActual = pageActual;
    this.offset = pageAux * 50;
    this.limit = 50;
    this.getAll(this.offset, this.limit);
  }

}
