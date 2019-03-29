import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  private urlEntrada: FormGroup;
  private urlFrame:string="https://www.youtube.com/embed/lGJRo82xxA8";


  constructor(private formBuilder: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.urlEntrada = this.formBuilder.group({
      url: ''
    })
  }

  getUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.urlFrame);
  }
  getVideo(){
     let url = this.urlEntrada.value["url"];
     
     if(url.search("youtube")>= 0){
        let id = url.slice(32);
        console.log(id);
        this.urlFrame ="https://www.youtube.com/embed/"+ id;
     }
     else if(url.search("twitch")>= 0){
        let id = url.slice(22);
        console.log(id);
        this.urlFrame ="https://player.twitch.tv/?channel="+ id;
     }
     else if(url.search("vimeo")>= 0){
        let id = url.slice(18);
        console.log(id);
        this.urlFrame ="http://player.vimeo.com/video/"+ id;
    }
  }
}
