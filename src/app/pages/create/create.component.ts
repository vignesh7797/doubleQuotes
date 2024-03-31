import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonService } from '../../services/common.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements AfterViewInit {

  txtStyle: any;
  txtAlign: any;
  formGroup: FormGroup;
  posterForm: FormGroup;

  colors: any[] = [
    "#000000",
    "#ffffff",
    "#E53636",
    "#66E106",
    "#36E5E5",
    "#3936E5",
    "#3C0B0B"
  ];
  tabs = ['font', 'image']
  activeTab = 'font'

  fontColor: any = this.colors[0]
  borderColor: any = this.colors[0]
  bgColor: any = this.colors[0]

  theme: any;
  sources: any = [];
  page = 0;
  search = 'wallpaper';
  selectedImage: any;
  preview: any;
  dragPosition = { x: 0, y: 0 };

  @HostListener('scroll', ['$event'])
  scrollHandler(event: any) {

  }

  constructor(private fb: FormBuilder, public common: CommonService) {

    this.formGroup = this.fb.group({
      text: new FormControl('Sample Quote'),
      penName: new FormControl('Shakshpere'),
      bold: new FormControl(false),
      italic: new FormControl(false),
      underline: new FormControl(false),
      fontAlign: ['left'],
      horizontal: ['center'],
      vertical: ['center'],
      colorType: new FormControl('fontColor'),
      fontColor: new FormControl('#000000'),
      borderColor: new FormControl('#000000'),
      bgColor: new FormControl('transparent'),
      fontSize: new FormControl(14),
      fontFamily: new FormControl('Inria Sans'),
      borderSize: new FormControl(0),
      imageUrl: new FormControl('')
    });

    this.posterForm = this.fb.group({
      caption: new FormControl(''),
      poster: new FormControl('')
    })

    this.callPagination();
  }

  ngAfterViewInit(): void {

  }

  selectColor(color: any) {
    if (color?.value) color = color.value;
    this.fontColor = color;
    this.formGroup.controls[this.formGroup.value?.colorType].setValue(color);
  }

  onScrollImage(e: any) {
    console.log(e)
    var load = document.getElementById('load');

    if (load) {
      const rect = load.getBoundingClientRect();

      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      const isInViewport = rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= viewportHeight &&
        rect.right <= viewportWidth;

      console.log(isInViewport);

      if (isInViewport) {
        this.callPagination(true)
      }
    }
  }


  callPagination(isPagination?: boolean) {
    isPagination ? this.page++ : this.page = 1;

    this.common.getImages(this.page, (this.search || 'illustrator')).then((res: any) => {
      setTimeout(() => {
        if (isPagination) {
          Array.prototype.push.apply(this.sources, res?.photos);
        } else {
          this.sources = res ? res.photos : []
        }

        if (this.page == 1) {
          this.selectedImage = this.sources[0]?.src
          this.formGroup.controls['imageUrl'].setValue(JSON.stringify(this.sources[0]))
        }
      }, 1000);
    })
  }

  onSelectImage(src: any) {
     this.selectedImage = src
  }

  generateImage() {
    var node: any = document.getElementById('image-section');
    htmlToImage
      .toPng(node, { quality: 1  })
      .then((dataUrl) => {
        this.preview = dataUrl;
        this.posterForm.controls['poster']?.setValue(dataUrl)
      })
      .catch((error) => {
        // console.error('oops, something went wrong!', error);
      });
  }

  onResetPosition(type: any, side: any) {
    var img: any = document.getElementsByClassName('img-container')[0];
    var imgRects = img.getClientRects();
    var text: any = document.getElementById('floatingText');

    let oldPOsition = this.dragPosition;
    this.dragPosition = {x: 0, y: 0};

    if (type == 'horizontal') {
      switch (side) {
        case 'left':
          this.dragPosition.x = 0
          break;
        case 'center':
          this.dragPosition.x = 45
          break;
        case 'right':
          this.dragPosition.x = text.getClientRects()?.item(0).width - 100
          break;
      }
      this.dragPosition.y = oldPOsition.y
    } else {
      switch (side) {
        case 'top':
          this.dragPosition.y = 0
          break;
        case 'middle':
          this.dragPosition.y = (imgRects?.item(0).height / 8)  - text.getClientRects()?.item(0).height
          break;
        case 'bottom':
          this.dragPosition.y = text.getClientRects()?.item(0).height - 100
          break;
      }
      this.dragPosition.x = oldPOsition.x
    }
  }

  onDragEnded(e:any){
    let element = e.source.getRootElement();
    let newPos = element.getBoundingClientRect();
    console.log(newPos)
  }
}
