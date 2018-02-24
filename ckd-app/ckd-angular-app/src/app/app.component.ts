import { NgModule, Component, OnInit, OnDestroy} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// Import rxjs map operator
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import 'rxjs/add/operator/takeWhile';
import { error } from 'selenium-webdriver';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'CKD';
  api_end_point = '/api/001/predict';
  result = null;
  age: number;
  bp: number;
  sg: number;
  al: number;
  su: number;
  bgr: number;

  rc: number;
  wc: number;

  bu: number; 
  sc: number; 
  sod: number;
  pot: number;
  hemo: number;
  pcv: number;

  htn: number = 1; 
  cad: number = 1; 
  appet: number = 1;
  pe: number = 1;
  ane: number = 1;
  dm: number = 1;
  rbc: number = 1; 
  pc: number = 1; 
  pcc: number = 1;
  ba: number = 1;   
  
  result_from_server: any[] = [{'result':-1}];

  private alive: boolean;

  constructor(private http: Http) {
    this.alive = true;
  }

  ngOnInit() {
    //this.testDemoHandler();
  }

  ngOnDestroy(){
    this.alive = false;
  }

  public reset(){
    this.result = null;
  }

  public withCKD(){
    let fail_data_obj = {
      "age": 39, "bp": 60, "sg": 1.02, "al": 0, "su": 0, "rbc": 0, "pc": 0, "pcc": 0, "ba": 0, "bgr": 86,
      "bu": 37, "sc": 0.6, "sod": 150, "pot": 5, "hemo": 13.60, "pcv": 51, "wc": 5800, "rc": 4.5,
      "htn": 0, "dm": 0, "cad": 0, "appet": 1, "pe": 0, "ane": 0
    }

    this.age = fail_data_obj['age'];
    this.bp = fail_data_obj['bp'];
    this.sg = fail_data_obj['sg'];
    this.al = fail_data_obj['al'];
    this.su = fail_data_obj['su'];
    this.bgr = fail_data_obj['bgr'];
    this.bu = fail_data_obj['bu'];
    this.sc = fail_data_obj['sc'];
    this.sod = fail_data_obj['sod'];
    this.pot = fail_data_obj['pot'];
    this.hemo = fail_data_obj['hemo'];
    this.pcv = fail_data_obj['pcv'];
    this.wc = fail_data_obj['wc'];
    this.rc = fail_data_obj['rc'];
    this.htn = fail_data_obj['htn'];
    this.cad = fail_data_obj['cad'];
    this.appet = fail_data_obj['appet'];
    this.pe = fail_data_obj['pe'];
    this.ane = fail_data_obj['ane'];
    this.dm = fail_data_obj['dm'];
    this.rbc = fail_data_obj['rbc'];
    this.pc = fail_data_obj['pc'];
    this.pcc = fail_data_obj['pcc'];
    this.ba = fail_data_obj['ba'];

    this.predict_ckd(fail_data_obj);  
  }
  public noCKD(){
    let success_data_obj = {
      "age": 65, "bp": 70, "sg": 1.015, "al": 1, "su": 0, "rbc": 0, "pc": 0, "pcc": 0, "ba": 0, "bgr": 203,
      "bu": 46, "sc": 1.4, "sod": 137.528754, "pot": 4.627244, "hemo": 11.4, "pcv": 36, "wc": 5000, "rc": 4.1,
      "htn": 1, "dm": 1, "cad": 0, "appet": 0, "pe": 1, "ane": 0
    }
    
    this.age = success_data_obj['age'];
    this.bp = success_data_obj['bp'];
    this.sg = success_data_obj['sg'];
    this.al = success_data_obj['al'];
    this.su = success_data_obj['su'];
    this.bgr = success_data_obj['bgr'];
    this.bu = success_data_obj['bu'];
    this.sc = success_data_obj['sc'];
    this.sod = success_data_obj['sod'];
    this.pot = success_data_obj['pot'];
    this.hemo = success_data_obj['hemo'];
    this.pcv = success_data_obj['pcv'];
    this.wc = success_data_obj['wc'];
    this.rc = success_data_obj['rc'];
    this.htn = success_data_obj['htn'];
    this.cad = success_data_obj['cad'];
    this.appet = success_data_obj['appet'];
    this.pe = success_data_obj['pe'];
    this.ane = success_data_obj['ane'];
    this.dm = success_data_obj['dm'];
    this.rbc = success_data_obj['rbc'];
    this.pc = success_data_obj['pc'];
    this.pcc = success_data_obj['pcc'];
    this.ba = success_data_obj['ba'];

    this.predict_ckd(success_data_obj);  
  }
  public predict(){
    this.result = null;

    this.htn = this.htn != null ? this.htn : 1;
    this.cad = this.cad != null ? this.cad : 1;
    this.appet = this.appet != null ? this.appet : 1;
    this.pe = this.pe != null ? this.pe : 1;
    this.ane = this.ane != null ? this.ane : 1;
    this.dm = this.dm != null ? this.dm : 1;
    this.rbc = this.rbc != null ? this.rbc : 1;
    this.pc = this.pc != null ? this.pc : 1;
    this.pcc = this.pcc != null ? this.pcc : 1;
    this.ba = this.ba != null ? this.ba : 1;

    
    let data_obj = {
      "age": this.age != null ? this.age : 0,
      "bp": this.bp != null ? this.bp : 0,
      "sg": this.sg != null ? this.sg : 0,
      "al": this.al != null ? this.al : 0,
      "su": this.su != null ? this.su : 0,

      "rbc": this.rbc != null ? this.rbc : 1,
      "pc": this.pc != null ? this.pc : 1,
      "pcc": this.pcc != null ? this.pcc : 1,
      "ba": this.ba != null ? this.ba : 1,
      "bgr": this.bgr != null ? this.bgr : 0,

      "bu": this.bu != null ? this.bu : 0,
      "sc": this.sc != null ? this.sc : 0,
      "sod": this.sod != null ? this.sod : 0,
      "pot": this.pot != null ? this.pot : 0,
      "hemo": this.hemo != null ? this.hemo : 0,
      "pcv": this.pcv != null ? this.pcv : 0,

      "wc": this.wc != null ? this.wc : 0,
      "rc": this.rc != null ? this.rc : 0,

      "htn": this.htn != null ? this.htn : 1,
      "dm": this.dm != null ? this.dm : 1,
      "cad": this.cad != null ? this.cad : 1,
      "appet": this.appet != null ? this.appet : 1,
      "pe": this.pe != null ? this.pe : 1,
      "ane": this.ane != null ? this.ane : 1      
      
  };
    this.predict_ckd(data_obj);      
  }

  public predict_ckd(data){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(data);
    return this.http.post(`${this.api_end_point}`, body)
    .map(res => res.json())
      .subscribe(data => {
        console.log(data)
        this.result_from_server = [data];
        if(data.result == 1){
          this.result = "Not likely to suffer from Chronic kidney disease"
        }
        else{
          this.result = "Likely to suffer from Chrnoic Kidney Disease"
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  public testDemoHandler(){
    this.http.get(`${this.api_end_point}`)
    .map(res => res.json())
      .subscribe(Data => {
        console.log(Data)
      });
  }

}
