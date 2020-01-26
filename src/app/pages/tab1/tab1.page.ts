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

	public obtenerNoticias(evento?: any) {

		this.noticiasService
			.getTopHeadLines()
			.subscribe
			(
				(d) => {

					if (evento) {

						evento.target.complete();
					}	

					if (d.articles.length === 0 && evento) {

						evento.target.disabled = true;

						return;
					}						

					this.noticias.push(...d.articles);									
				}				
			);
	}

	public loadData(evento: any): void {

		this.obtenerNoticias(evento);
	}
}
