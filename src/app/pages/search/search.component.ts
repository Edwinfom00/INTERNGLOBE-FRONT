import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  data: any;
  ngOnInit(): void {}

  constructor(private dataservice: DataService) {}

  getInternsSearch(name: any) {
    const keyword = name.target.value;

    const search = this.dataservice
      .getInternShipName(keyword)
      .then((response) => {
        this.data = response;
        console.log(this.data);
      });
  }
}
