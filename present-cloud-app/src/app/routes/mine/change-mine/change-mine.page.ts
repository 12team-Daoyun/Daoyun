import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-mine',
  templateUrl: './change-mine.page.html',
  styleUrls: ['./change-mine.page.scss'],
})
export class ChangeMinePage implements OnInit {

  list=[{"key":"nan","value":'男',"chek":true},{"key":"nv","value":'女',"chek":false}];
  data={"key":"nan","value":'男',"chek":true};

  list2=[{"key":"student","value":'学生',"chek":true},{"key":"teacher","value":'老师',"chek":false}];
  data2={"key":"student","value":'学生',"chek":true};

  constructor(private router: Router) { }

  ngOnInit() {
  }

  finish() {
    this.router.navigateByUrl('tabs/mine');
  }
  
  goBack(){
    this.router.navigateByUrl('tabs/mine');
  }

  public choose_gender(i){
    let me_gender=this;
    this.list.forEach(function(data,inde,array) {
      if(i==inde){
        data.chek=true;
        me_gender.data=data;
      }else{
        data.chek=false
      }
    });
  }

  public choose_identity(i){
    let me_identity=this;
    this.list2.forEach(function(data2,inde2,array) {
      if(i==inde2){
        data2.chek=true;
        me_identity.data=data2;
      }else{
        data2.chek=false
      }
    });
  }


}
