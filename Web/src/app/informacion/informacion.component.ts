import { Component, OnInit, ViewChild } from '@angular/core';
import {ImagenComponent} from '../imagen/imagen.component';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {


  //private fotoActual:string = ImagenComponent.arguments["imgsrc"];

  constructor() { }

  ngOnInit() {

  }

  
}
