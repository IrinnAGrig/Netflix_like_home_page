import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionPipe } from "../../../shared/pipes/description.pipe";

@Component({
    selector: 'app-banner',
    standalone: true,
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
    imports: [CommonModule, DescriptionPipe]
})
export class BannerComponent implements OnChanges {

  @Input({required: true}) bannerTitle = '';
  @Input() bannerOverview = '';
  @Input() key = '';
  private sanitizer = inject(DomSanitizer)
  videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`)

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['key']){
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
    }
  }
  reloadVideo() {
    const iframe = document.getElementById('yourIframeId') as HTMLIFrameElement;
    if(iframe){
      iframe.src = this.videoUrl.toString(); // Reload the iframe with the video URL
    }
    
  }
}