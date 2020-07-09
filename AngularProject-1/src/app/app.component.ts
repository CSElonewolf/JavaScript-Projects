import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any = "";
  arrayvalue: any = [];
  datetime:any="";
  date:any="";
  time:any="";
  constructor(public http: HttpClient) {
    this.http.get("https://api.covid19api.com/summary").subscribe((value: any) => {
      this.data = value.Global;
      this.arrayvalue = value.Countries;
      this.datetime = value.Countries[0].Date;
      this.date = this.datetime.substring(0,this.datetime.indexOf('T'));
      this.time = this.datetime.substring(this.datetime.indexOf('T')+1,this.datetime.indexOf('Z'));
      this.time+="UTC";
    })
  }
}



