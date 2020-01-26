import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, IonContent } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { RespuestaTopHeadlines, Article } from 'src/app/interfaces/interfaces';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

	@ViewChild(IonContent,	{ static: false }) content: IonContent;
	@ViewChild('segment', { static: false }) segment: IonSegment;

	public categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

	public noticias: Article[] = [];

	constructor(
		private noticiasService: NoticiasService
	) { }

	ngAfterViewInit() {

		this.segment.value = this.categorias[0];

		this.obtenerNoticias(this.categorias[0]);
	}

	ngOnInit() {

	}

	public obtenerNoticias(categoria: string, evento?: any): void {

		this.noticiasService
			.getTopHeadLinesCategorias(categoria)
			.subscribe
			(
				(d) => {

					if (d.articles.length === 0 && evento) {

						evento.target.disabled = true;

						return;
					}

					this.noticias.push(...d.articles);

					if (evento) {

						evento.target.complete();
					}
					else {

						this.content.scrollToTop(2000);
					}					
				}
			)
	}

	public segmentChange(evento: any): void {

		this.noticias = [];

		this.obtenerNoticias(evento.detail.value);
	}

	public loadData(evento: any): void {

		this.obtenerNoticias(this.segment.value, evento);
	}
}
