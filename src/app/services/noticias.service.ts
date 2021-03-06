import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;

const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
	'X-Api-Key': apiKey
});


@Injectable({
	providedIn: 'root'
})
export class NoticiasService {

	private topHeadlinesPage: number = 0;

	private categoriaAnterior: string = String();

	private categoriaPage: number = 0;

	constructor(
		private http: HttpClient
	) { }

	private ejecutarQuery<T>(query: string) {

		return this.http
			.get<T>(`${apiUrl}${query}`, { headers });
	}

	public getTopHeadLines() {

		this.topHeadlinesPage++;

		return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.topHeadlinesPage}`);
	}

	public getTopHeadLinesCategorias(categoria: string) {
		
		// reiniciamos el paginador.
		if (this.categoriaAnterior !== categoria) {

			this.categoriaAnterior = categoria;

			this.categoriaPage = 0;
		}

		this.categoriaPage++;

		return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
	}
}
