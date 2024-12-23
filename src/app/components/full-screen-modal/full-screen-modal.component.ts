import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription, fromEvent } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-full-screen-modal',
  templateUrl: './full-screen-modal.component.html',
  styleUrls: ['./full-screen-modal.component.scss'],
})
export class FullScreenModalComponent  implements OnInit {

  @Input()
  url!: string;

  @Input()
  type!: string;
  private backbuttonSubscription!: Subscription;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  @Input()
  palyVideo: boolean = false;


constructor(private modalCtrl: ModalController) {}

ngOnInit() {
    const event = fromEvent(document, 'backbutton');
    this.backbuttonSubscription = event.subscribe(async () => {
        const modal = await this.modalCtrl.getTop();
        if (modal) {
            modal.dismiss();
        }
    });


}

ngOnChanges(changes: SimpleChanges) {
  if (changes['palyVideo'] && this.videoPlayer) {
    if (this.palyVideo) {
      this.videoPlayer.nativeElement.play();
    } else {
      this.videoPlayer.nativeElement.pause();
      this.videoPlayer.nativeElement.currentTime = 0; // Reset playback to the start
    }
  }
}


ngOnDestroy() {
    this.backbuttonSubscription.unsubscribe();
}

getImgUrl(url: string): string {
  return environment.baseUrl + '/' + url;
 }



}


