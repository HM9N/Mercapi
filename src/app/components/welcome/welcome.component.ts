import { Component, OnInit } from '@angular/core';
import { MercaserService } from '../../shared/mercaser.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private mercaserService: MercaserService) { }

  pageActual: number = 1;

  items: Array<any> = [];
  sellers: Array<any> = [];
  value = '';


  ngOnInit(): void {
  }

  getAll(): void {
    this.value = this.value.replace(" ", "%20");
    this.mercaserService.getAll(this.value).subscribe(data => {
      this.items = data["results"];
      this.items.forEach(item => {
        this.mercaserService.getSeller(item["seller"]["id"]).subscribe(sel => {
          this.sellers?.push(sel["nickname"]);
          console.log(item["seller"]);
        });
      });
    });
  }

}
