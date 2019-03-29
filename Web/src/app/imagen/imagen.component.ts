import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit {

  private imgsrc:string="../../assets/imagenes/movil1.PNG";

  constructor() { }

  ngOnInit() {
  }

  cambio(foto){
    this.imgsrc= foto.src;
  }
}
