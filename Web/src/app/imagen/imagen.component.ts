import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit {

  private imgsrc:string="../../assets/imagenes/movil1.PNG";

  @ViewChild('imagenGrande') imgGrande: ImageData;
  constructor() { }

  ngOnInit() {
  }

  cambio(foto){
    //this.imgGrande.
    console.log(foto);
    this.imgsrc= foto.src;
  }
}
