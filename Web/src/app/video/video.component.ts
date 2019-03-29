import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  private urlEntrada: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.urlEntrada = this.formBuilder.group({
      url: ''
    })
  }

  getVideo(){
     let url = this.urlEntrada.value["url"];
     console.log("RESULTADOOOOO" + url)
     console.log("RESULTADOOOOO" + url.search("yout"));
  }
}
