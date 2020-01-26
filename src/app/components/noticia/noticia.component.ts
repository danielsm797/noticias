import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { ActionSheetController, Platform } from '@ionic/angular';
import { DataLocalServiceService } from 'src/app/services/data-local-service.service';
import { Plugins, ShareOptions } from '@capacitor/core';

import { ToastController } from '@ionic/angular';
const { Share } = Plugins;

@Component({
	selector: 'app-noticia',
	templateUrl: './noticia.component.html',
	styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

	@Input() favorito: boolean = false;

	@Input() noticia: Article;

	@Input() posicion: number = 0;

	shareObject: ShareOptions = {};

	constructor(
		private iab: InAppBrowser,
		private actionsheetctrl: ActionSheetController,
		private socialSharing: SocialSharing,
		private dataLocal: DataLocalServiceService,
		private toastCtrl: ToastController,
		private platform: Platform
	) { }

	ngOnInit() { }

	async share(shareOptions: ShareOptions) {

		await Share.share({
			title: shareOptions.title,
			text: shareOptions.text,
			url: shareOptions.url, dialogTitle:
				shareOptions.dialogTitle
		});
	}

	public abrirNoticia(): void {

		const browser = this.iab
			.create(this.noticia.url, '_system');
	}

	public async lanzarMenu() {

		const actionSheet = await this.actionsheetctrl.create({
			header: 'Acciones',
			mode: 'ios',
			buttons: [
				{
					text: 'Share',
					icon: 'share',
					handler: () => {

						this.compartirNoticia();
					}
				},
				{
					text: this.favorito ? 'Delete from favorite' : 'Add to favorite',
					icon: this.favorito ? 'trash' : 'star',
					handler: () => {

						if (!this.favorito) {

							this.dataLocal.guardarNoticia(this.noticia);

							this.mostrarMensaje('Añadir a favoritos', 'Señor usuario, se ha añadido la noticia a favoritos exitosamente.');
						}
						else {

							this.dataLocal.eliminarNoticia(this.noticia);

							this.mostrarMensaje('Eliminar de favoritos', 'Señor usuario, se ha eliminado la noticia de favoritos exitosamente.');
						}
					}
				},
				{
					text: 'Cancel',
					icon: 'close',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});

		await actionSheet.present();
	}

	public async mostrarMensaje(titulo: string, mensaje: string) {

		const toast = await this.toastCtrl.create({
			header: titulo,
			mode: 'ios',
			color: this.favorito ? 'danger' : 'success',
			message: mensaje,
			duration: 3000
		});

		toast.present();
	}

	public compartirNoticia(): void {
		
		if (!this.platform.is('cordova')) {

			this.shareObject.title = this.noticia.title;

			this.shareObject.text = this.noticia.source.name;

			this.shareObject.url = this.noticia.url;

			this.share(this.shareObject);
		}
		else {

			this.socialSharing
				.share
				(
					this.noticia.title,
					this.noticia.source.name,
					'',
					this.noticia.url
				);
		}
	}
}
