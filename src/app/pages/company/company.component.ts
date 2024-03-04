import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  ngOnInit(): void {
    this.NewFetchIntern();
  }

  constructor(private httpclient: HttpClient) {}

  InternData: any;
  NewFetchIntern() {
    this.httpclient
      .get('http://localhost:8000/api/home')
      .subscribe((res: any) => {
        console.log(res);
        this.InternData = res;
      });
  }
}
