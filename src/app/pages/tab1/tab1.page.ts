import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public noticias: Article[] = [];

  constructor(
    private noticiasService: NoticiasService
  ) { }

  ngOnInit() {

    this.obtenerNoticias();
  }

  public obtenerNoticias() {

    this.noticiasService
      .getTopHeadLines()
      .subscribe
      (
        (d) => {

          this.noticias.push(...d.articles);

          console.log("noticias", d);
        }
      );
  }
}
