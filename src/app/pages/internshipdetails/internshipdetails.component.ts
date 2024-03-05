import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-internshipdetails',
  templateUrl: './internshipdetails.component.html',
  styleUrls: ['./internshipdetails.component.css'],
})
export class InternshipdetailsComponent implements OnInit {
  link: any = [
    { link: 'About Us' },
    { link: 'Contact Us' },
    { link: 'Our Services' },
    { link: 'Privacy Policy' },
    { link: 'Terms & Condition' },
  ];

  detailedInternData: any;

  constructor(
    private route: ActivatedRoute,
    private httpclient: HttpClient,
    private datepipe: DatePipe
  ) {}
  ngOnInit(): void {
    const internId = this.route.snapshot.params['id'];
    this.GetDetailOffer(internId);
  }
  date: Date = new Date();

  GetDetailOffer(IntenrId: number) {
    this.httpclient
      .get(`http://localhost:8000/api/interns/${IntenrId}`)
      .subscribe((response: any) => {
        this.detailedInternData = Object.entries(response);
        console.log(this.detailedInternData);
      });
  }
}
