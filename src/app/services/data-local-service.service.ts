import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
	providedIn: 'root'
})
export class DataLocalServiceService {

	public noticias: Article[] = [];

	constructor(
		private storage: Storage
	) { 

		this.cargarNoticias();
	}

	public guardarNoticia(noticia: Article) {

		const existe = this.noticias.find(x => x.title === noticia.title);

		if (existe) {

			return;
		}

		this.noticias.unshift(noticia);

		this.storage.set('favoritos', this.noticias);
	}

	public async cargarNoticias() {
		
		const favoritos = await this.storage.get('favoritos');

		if (favoritos) {

			this.noticias = favoritos;
		}		
	}

	public eliminarNoticia(noticia: Article) {

		const indice = this.noticias.map(x => x.title).indexOf(noticia.title);

		if (indice !== -1) {

			this.noticias.splice(indice, 1);

			this.storage.set('favoritos', this.noticias);
		}
	}
}
