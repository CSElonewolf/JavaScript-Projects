import { Component,Input,OnChanges,OnInit, ɵɵNgOnChangesFeature} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() data:any;
  @Input() arrayvalue:any;
  @Input() date:any;
  @Input() time:any;
  ngOnInit(){
    console.log(this.date)
  }
  ngOnChanges(){
        this.arrayvalue.sort((a,b)=>{
          return b.TotalConfirmed - a.TotalConfirmed
        })

    }
  }


