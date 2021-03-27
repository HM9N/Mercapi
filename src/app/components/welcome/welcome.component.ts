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
  limit: number = 2012;
  resto: number = 0;

  ngOnInit(): void {
  }

  getAll(offset: number, limit: number): void {
    this.amountsFormatted = [];
    this.amounts = [];
    this.value = this.value.replace(/\s+/g, "%20");
    this.mercaserService.getAll(this.value, offset, limit).subscribe(data => {
      this.total = data["paging"]["total"];
      console.log(this.total);
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

  updatePage(test: any) {
    console.log("ejecuté el metodo update");
    console.log(this.offset);
    this.offset = this.pageActual - 50;
    this.limit = this.pageActual * 50;
    this.pageActual = test;
    this.getAll(this.offset, this.limit);
  }

}
