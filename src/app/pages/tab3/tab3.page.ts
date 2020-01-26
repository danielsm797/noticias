import { Component, ViewChild, OnInit } from '@angular/core';
import { DataLocalServiceService } from 'src/app/services/data-local-service.service';
import { Article } from 'src/app/interfaces/interfaces';
import { IonContent } from '@ionic/angular';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

	@ViewChild(IonContent, { static: false }) content: IonContent;

	public slideOpts = {
		allowSlidePrev: false,
		allowSlideNext: false
	}

	constructor(
		public dataLocal: DataLocalServiceService
	) {
	}

	ionViewDidEnter() {
		
		this.content.scrollToTop(1000);
	}
}
